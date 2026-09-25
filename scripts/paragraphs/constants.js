"use strict";

/** JSON:API include chain for paragraph--responsive_media → media → file. */
const RESPONSIVE_MEDIA_INCLUDE = [
  "field_desktop",
  "field_mobile",
  "field_desktop.field_media_image",
  "field_mobile.field_media_image",
  "field_desktop.field_media_video_file",
  "field_mobile.field_media_video_file",
  "field_desktop.thumbnail",
  "field_mobile.thumbnail",
];

/** JSON:API include chain for media--image → file. */
const IMAGE_MEDIA_INCLUDE = ["field_media_image"];

const SUPPORTED_FIELD_TYPES = {
  string: { kind: "attribute", ts: "string | null", drupal: "string" },
  text_long: {
    kind: "attribute",
    ts: "{\n    value: string;\n    format: string;\n    processed: string;\n  } | null",
    drupal: "text_long",
  },
  boolean: { kind: "attribute", ts: "boolean | null", drupal: "boolean" },
  integer: { kind: "attribute", ts: "number | null", drupal: "integer" },
  list_string: { kind: "attribute", ts: "string | null", drupal: "list_string" },
  list_integer: { kind: "attribute", ts: "number | null", drupal: "list_integer" },
  link: {
    kind: "attribute",
    ts: "{\n    uri: string;\n    title: string;\n  } | null",
    tsUnlimited:
      "{\n    uri: string;\n    title: string;\n  } | Array<{\n    uri: string;\n    title: string;\n  }> | null",
    drupal: "link",
  },
  media: { kind: "relationship", ts: null, drupal: "entity_reference" },
  paragraph: { kind: "relationship", ts: null, drupal: "entity_reference_revisions" },
};

const ID_PATTERN = /^[a-z][a-z0-9_]*$/;
const FIELD_PATTERN = /^field_[a-z0-9_]+$/;
const COMPONENT_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

function withMediaChain(field, chain) {
  return [field, ...chain.map((path) => `${field}.${path}`)];
}

module.exports = {
  RESPONSIVE_MEDIA_INCLUDE,
  IMAGE_MEDIA_INCLUDE,
  SUPPORTED_FIELD_TYPES,
  ID_PATTERN,
  FIELD_PATTERN,
  COMPONENT_PATTERN,
  withMediaChain,
};
