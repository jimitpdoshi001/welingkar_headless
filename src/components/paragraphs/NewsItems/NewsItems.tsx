import type { NewsItemsAttributes, JsonApiResource } from "@/lib/drupal";
import { getNewsItems } from "@/lib/drupal/news";
import { NewsItemsGrid } from "./NewsItemsGrid";
import { NewsItemsSwiper } from "./NewsItemsSwiper";
import { NewsItemsFlatGrid } from "./NewsItemsFlatGrid";

type NewsItemsProps = {
  paragraph: JsonApiResource<"paragraph--newsitems", NewsItemsAttributes>;
  children?: React.ReactNode;
};

export async function NewsItems({ paragraph, children }: NewsItemsProps) {
  const rawStyle = (paragraph.attributes.field_components_style_news || "").trim().toLowerCase();
  const items = await getNewsItems();

  console.log(items, " items");

  if (rawStyle === "slider") {
    return <NewsItemsSwiper items={items} />;
  }

  if (
    rawStyle === "flat_grid_of_3"
  ) {
    return <NewsItemsFlatGrid items={items} />;
  }

  return <NewsItemsGrid items={items}>{children}</NewsItemsGrid>;
}
