"use strict";

const crypto = require("crypto");

const NAMESPACE = Buffer.from("6ba7b8109dad11d180b400c04fd430c8", "hex");

function uuidv5(name) {
  const hash = crypto.createHash("sha1").update(NAMESPACE).update(String(name)).digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.subarray(0, 16).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function toPascalCase(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function targetsOf(field) {
  const raw = field?.target;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.map(String).filter(Boolean);
}

function isUnlimited(field) {
  return field.cardinality === "unlimited" || (typeof field.cardinality === "number" && field.cardinality > 1);
}

function relationshipTs(field) {
  const item = `{ type: string; id: string }`;
  if (isUnlimited(field)) {
    return `Array<${item}> | null`;
  }
  return `${item} | null`;
}

function indentBlock(text, spaces) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line, index) => (index === 0 ? line : pad + line))
    .join("\n");
}

module.exports = {
  uuidv5,
  toPascalCase,
  targetsOf,
  isUnlimited,
  relationshipTs,
  indentBlock,
};
