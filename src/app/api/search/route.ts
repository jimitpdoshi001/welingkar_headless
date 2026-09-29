import { NextResponse } from "next/server";
import { SEARCH_PREVIEW_LIMIT, searchDrupal } from "@/lib/drupal";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keys = searchParams.get("q")?.trim() || "";
  const limit = Math.min(20, Math.max(1, Number(searchParams.get("limit")) || SEARCH_PREVIEW_LIMIT));

  const result = await searchDrupal(keys, { limit, page: 1 });

  return NextResponse.json({
    keys: result.keys,
    items: result.items,
    total: result.total,
  });
}
