import { clearDrupalSession, getAuthHeaders } from "./auth";
import { drupalConfig } from "./config";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

/**
 * Drupal GraphQL 5.x client.
 *
 * Note: the current server at /graphql exposes an empty Query type until
 * GraphQL Compose (or custom schema) is configured and exposed.
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const url = `${drupalConfig.baseUrl}${drupalConfig.graphqlPath}`;
  const authHeaders = await getAuthHeaders();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (response.status === 401 || response.status === 403) {
    clearDrupalSession();
  }

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed (${response.status}): ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data.");
  }

  return payload.data;
}
