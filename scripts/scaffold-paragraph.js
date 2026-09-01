#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Scaffold a new Drupal paragraph component (legacy helper).
 * Prefer: create paragraphs/<machine_name>.yaml then `npm run paragraphs:generate`.
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const positional = [];
  const flags = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      flags.dryRun = true;
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        flags[key] = true;
        continue;
      }
      flags[key] = value;
      i += 1;
      continue;
    }
    positional.push(arg);
  }

  return { positional, flags };
}

function toPascalCase(value) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toMachineName(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .toLowerCase()
    .replace(/^_+|_+$/g, "");
}

function writeFile(filePath, contents, dryRun) {
  if (dryRun) {
    console.log(`[dry-run] write ${filePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath)) {
    console.log(`skip (exists): ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, contents, "utf8");
  console.log(`created: ${filePath}`);
}

function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const rawName = positional[0];

  if (!rawName || flags.help) {
    console.log(`Usage: npm run scaffold:paragraph -- <ComponentName> [--type machine_name] [--nested field_a,field_b] [--dry-run]`);
    process.exit(rawName ? 0 : 1);
  }

  const componentName = toPascalCase(rawName);
  const machineName = String(flags.type || toMachineName(componentName));
  const paragraphType = `paragraph--${machineName}`;
  const nestedFields = String(flags.nested || "")
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);
  const dryRun = Boolean(flags.dryRun);

  const root = path.resolve(__dirname, "..");
  const componentDir = path.join(root, "src/components/paragraphs", componentName);
  const attrsType = `${componentName}Attributes`;
  const resourceType = `${componentName}Resource`;

  const tsx = `import type { ${attrsType}, JsonApiResource } from "@/lib/drupal";
import clsx from "clsx";
import styles from "./${componentName}.module.scss";

type ${componentName}Props = {
  paragraph: JsonApiResource<"${paragraphType}", ${attrsType}>;
  children?: React.ReactNode;
};

export function ${componentName}({ paragraph, children }: ${componentName}Props) {
  const { attributes } = paragraph;

  return (
    <div className={clsx(styles.root)}>
      {/* TODO: map Drupal fields from attributes */}
      <pre>{JSON.stringify(attributes, null, 2)}</pre>
      {children}
    </div>
  );
}
`;

  const scss = `@import "../../../styles/base/var";

.root {
  // ${componentName} styles
}
`;

  writeFile(path.join(componentDir, `${componentName}.tsx`), tsx, dryRun);
  writeFile(path.join(componentDir, `${componentName}.module.scss`), scss, dryRun);

  console.log(`
Prefer the YAML workflow:

  1. Create paragraphs/${machineName}.yaml
  2. npm run paragraphs:generate
  3. Implement UI in src/components/paragraphs/${componentName}/
  4. If this is a new Drupal type, set drupalConfig: true and copy generated/drupal-config/${machineName}/ into the Drupal repo.

This scaffold only creates component files if they do not exist.
`);
}

main();
