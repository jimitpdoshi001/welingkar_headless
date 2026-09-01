"use strict";

function coerce(value) {
  if (value === undefined || value === "") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null" || value === "~") return null;
  if (value === "[]") return [];
  if (value === "{}") return {};
  if (/^-?\d+$/.test(value)) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function parseYaml(text, fileName) {
  const lines = String(text)
    .split(/\r?\n/)
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith("#");
    });

  function indentOf(line) {
    const match = line.match(/^ */);
    return match ? match[0].length : 0;
  }

  function parseBlock(start, parentIndent) {
    const obj = {};
    let list = null;
    let i = start;

    while (i < lines.length) {
      const { line, index } = lines[i];
      const indent = indentOf(line);
      if (indent < parentIndent) break;
      if (indent !== parentIndent) {
        throw new Error(`${fileName}:${index + 1}: unexpected indent`);
      }

      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) {
        if (!list) list = [];
        const rest = trimmed.slice(2).trim();
        if (!rest) {
          throw new Error(`${fileName}:${index + 1}: empty list item`);
        }
        if (rest.includes(":") && !rest.startsWith("{")) {
          const [key, ...valueParts] = rest.split(":");
          const value = valueParts.join(":").trim();
          const item = { [key.trim()]: coerce(value) };
          const next = lines[i + 1];
          if (next && indentOf(next.line) > indent) {
            const nested = parseBlock(i + 1, indent + 2);
            i = nested.index;
            Object.assign(item, nested.value);
            list.push(item);
            continue;
          }
          list.push(item);
          i += 1;
          continue;
        }
        const next = lines[i + 1];
        if (next && indentOf(next.line) > indent && !rest.includes(":")) {
          const nested = parseBlock(i + 1, indent + 2);
          i = nested.index;
          list.push(nested.value);
          continue;
        }
        list.push(coerce(rest));
        i += 1;
        continue;
      }

      if (list) {
        return { value: list, index: i };
      }

      const colon = trimmed.indexOf(":");
      if (colon === -1) {
        throw new Error(`${fileName}:${index + 1}: expected key: value`);
      }
      const key = trimmed.slice(0, colon).trim();
      const value = trimmed.slice(colon + 1).trim();
      const next = lines[i + 1];

      if (!value && next && indentOf(next.line) > indent) {
        const nested = parseBlock(i + 1, indentOf(next.line));
        obj[key] = nested.value;
        i = nested.index;
        continue;
      }

      obj[key] = value ? coerce(value) : {};
      i += 1;
    }

    return { value: list || obj, index: i };
  }

  if (!lines.length) return {};
  return parseBlock(0, indentOf(lines[0].line)).value;
}

module.exports = { parseYaml };
