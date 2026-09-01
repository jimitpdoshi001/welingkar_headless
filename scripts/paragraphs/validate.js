"use strict";

const { COMPONENT_PATTERN, FIELD_PATTERN, ID_PATTERN, SUPPORTED_FIELD_TYPES } = require("./constants");

function fail(errors, message) {
  errors.push(message);
}

function normalizeParagraph(raw, fileName) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${fileName}: definition must be a YAML mapping`);
  }

  return {
    id: raw.id,
    label: raw.label || raw.id,
    component: raw.component ?? null,
    mapping: raw.mapping || "default",
    renderChildren: raw.renderChildren !== false,
    drupalConfig: raw.drupalConfig !== false,
    passImage: Boolean(raw.passImage),
    parents: Array.isArray(raw.parents) ? raw.parents : [],
    fields: raw.fields && typeof raw.fields === "object" ? raw.fields : {},
    fileName,
  };
}

function validateProject(project, fileName, errors) {
  if (!project || typeof project !== "object") {
    fail(errors, `${fileName}: project file must be a YAML mapping`);
    return;
  }

  if (!project.nodeBundles || typeof project.nodeBundles !== "object") {
    fail(errors, `${fileName}: nodeBundles is required`);
    return;
  }

  for (const [bundle, config] of Object.entries(project.nodeBundles)) {
    if (!config || typeof config !== "object") {
      fail(errors, `${fileName}: nodeBundles.${bundle} must be an object`);
      continue;
    }
    if (!Array.isArray(config.paragraphFields)) {
      fail(errors, `${fileName}: nodeBundles.${bundle}.paragraphFields must be an array`);
    }
  }
}

function validateParagraph(def, errors, ids) {
  const where = def.fileName;

  if (!def.id || !ID_PATTERN.test(def.id)) {
    fail(errors, `${where}: id must match ${ID_PATTERN} (got ${JSON.stringify(def.id)})`);
  } else if (ids.has(def.id)) {
    fail(errors, `${where}: duplicate paragraph id "${def.id}"`);
  } else {
    ids.add(def.id);
  }

  if (def.component && !COMPONENT_PATTERN.test(def.component)) {
    fail(errors, `${where}: component must be PascalCase (got ${JSON.stringify(def.component)})`);
  }

  if (!["default", "responsive_media", "none"].includes(def.mapping)) {
    fail(errors, `${where}: mapping must be default, responsive_media, or none`);
  }

  for (const parent of def.parents) {
    if (!parent || typeof parent !== "object") {
      fail(errors, `${where}: each parent must be an object with through + field`);
      continue;
    }
    if (!parent.through || !FIELD_PATTERN.test(parent.through)) {
      fail(errors, `${where}: parent.through must be a field_* name`);
    }
    if (!parent.field || !FIELD_PATTERN.test(parent.field)) {
      fail(errors, `${where}: parent.field must be a field_* name`);
    }
  }

  for (const [fieldName, field] of Object.entries(def.fields)) {
    if (!FIELD_PATTERN.test(fieldName)) {
      fail(errors, `${where}: invalid field name "${fieldName}" (must match ${FIELD_PATTERN})`);
      continue;
    }
    if (!field || typeof field !== "object") {
      fail(errors, `${where}: fields.${fieldName} must be an object`);
      continue;
    }
    if (!SUPPORTED_FIELD_TYPES[field.type]) {
      fail(errors, `${where}: fields.${fieldName} has unsupported type "${field.type}". Supported: ${Object.keys(SUPPORTED_FIELD_TYPES).join(", ")}`);
      continue;
    }
    if ((field.type === "paragraph" || field.type === "media") && !field.target) {
      fail(errors, `${where}: fields.${fieldName} (${field.type}) requires target`);
    }
    if (field.cardinality && field.cardinality !== "unlimited" && field.cardinality !== 1 && typeof field.cardinality !== "number") {
      fail(errors, `${where}: fields.${fieldName}.cardinality must be 1 or unlimited`);
    }
    if (field.media && !["single", "multi", "nested_responsive", "self"].includes(field.media)) {
      fail(errors, `${where}: fields.${fieldName}.media must be single, multi, nested_responsive, or self`);
    }
  }
}

function validateGraph(paragraphs, errors) {
  const byId = new Map(paragraphs.map((def) => [def.id, def]));

  for (const def of paragraphs) {
    for (const [fieldName, field] of Object.entries(def.fields)) {
      if (field.type === "paragraph" && field.target && field.target !== "*" && !byId.has(field.target)) {
        fail(errors, `${def.fileName}: fields.${fieldName} targets unknown paragraph "${field.target}"`);
      }
    }
  }
}

function validateAll(project, projectFile, paragraphs) {
  const errors = [];
  validateProject(project, projectFile, errors);
  const ids = new Set();
  for (const def of paragraphs) {
    validateParagraph(def, errors, ids);
  }
  if (!errors.length) {
    validateGraph(paragraphs, errors);
  }
  return errors;
}

module.exports = {
  normalizeParagraph,
  validateAll,
};
