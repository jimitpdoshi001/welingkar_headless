#!/usr/bin/env node
/**
 * Scaffold a new Drupal paragraph component and print the registry checklist.
 *
 * Usage:
 *   npm run scaffold:paragraph -- Card
 *   npm run scaffold:paragraph -- Card --type card --nested field_items
 *
 * Options:
 *   --type <machine_name>   Drupal paragraph machine name (default: kebab of name)
 *   --nested <field,...>    Nested paragraph relationship fields this type owns
 *   --dry-run               Print actions without writing files
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
Next steps (required — the scaffold only creates the component files):

1. types.ts
   Add:
     export type ${attrsType} = {
       parent_id?: string | null;
       parent_type?: string | null;
       parent_field_name?: string | null;
       // TODO: Drupal fields
       [key: string]: unknown;
     };
     export type ${resourceType} = JsonApiResource<"${paragraphType}", ${attrsType}>;

2. paragraph-registry.ts  (DATA — includes + tree)
   - If this nests under a parent, add each child field to NESTED_PARAGRAPH_FIELDS${
     nestedFields.length
       ? `
     Suggested nested fields for THIS type: ${nestedFields.map((f) => `"${f}"`).join(", ")}
     Also add include suffixes under the right key in INCLUDE_SUFFIXES_BY_NODE_FIELD.`
       : ""
   }
   - If it hangs off a node field, add that field to NODE_PARAGRAPH_FIELDS_BY_BUNDLE
   - Add include path suffixes in INCLUDE_SUFFIXES_BY_NODE_FIELD (field_section and/or field_components)
   - If it needs media, use withMediaChain("field_…", RESPONSIVE_MEDIA_INCLUDE)

3. paragraph-components.tsx  (UI)
   Import { ${componentName} } and register:
     "${paragraphType}": (item, { renderChildren }) => (
       <${componentName} key={item.resource.id} paragraph={item.resource as ...}>
         {renderChildren(item.children)}
       </${componentName}>
     ),

4. Drupal checklist
   - Paragraph type machine name must be: ${machineName}
   - Nested reference fields must match exactly (field_*)
   - Clear Drupal caches if JSON:API returns 400 on include=

Invalid include paths break EVERY page fetch for that bundle — always add includes
that exist on at least one allowed target type of the parent relationship.
`);
}

main();
