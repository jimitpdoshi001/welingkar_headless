# Paragraph contract (source of truth)

YAML in this folder drives Next.js types, JSON:API includes, and component mapping.

```bash
npm run paragraphs:generate   # write generated files
npm run paragraphs:watch      # regenerate on YAML changes
npm run paragraphs:check      # CI: fail if generated files are stale
```

## Add a paragraph

1. Create `paragraphs/your_type.yaml` (copy an existing file).
2. Run `npm run paragraphs:generate`.
3. Implement UI in the scaffolded `src/components/paragraphs/YourType/` files (those are not overwritten).
4. If `drupalConfig: true`, copy `generated/drupal-config/your_type/` into the Drupal repo and `drush cim`. Add the type to the parent field’s allowed bundles in Drupal (merge, do not replace).

Do not edit `*.generated.ts` / `paragraph-components.generated.tsx`.
