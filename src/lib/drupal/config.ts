const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const drupalConfig = {
  baseUrl: trimSlash(process.env.DRUPAL_BASE_URL ?? "https://tata.thebetaweb.site"),
  jsonApiPrefix: process.env.DRUPAL_JSONAPI_PREFIX ?? "/jsonapi",
  graphqlPath: process.env.DRUPAL_GRAPHQL_PATH ?? "/graphql",
  /** Path alias also accepted for the site home (allpage titled "homepage"). */
  homepageAlias: process.env.DRUPAL_HOMEPAGE_ALIAS ?? "/homepage",
  username: process.env.DRUPAL_USERNAME,
  password: process.env.DRUPAL_PASSWORD,
} as const;

/**
 * Node bundles fetched from Drupal.
 * Site pages use `allpage`; the page titled "homepage" is served at `/`.
 * News articles use `newsroom` and are served at `/newsroom/[title-slug]`.
 */
export const NODE_BUNDLES = ["allpage", "blogs"] as const;

export type NodeBundle = (typeof NODE_BUNDLES)[number];
