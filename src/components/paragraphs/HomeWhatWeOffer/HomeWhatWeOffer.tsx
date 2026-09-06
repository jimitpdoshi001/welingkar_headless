import type { HomeWhatWeOfferAttributes, JsonApiResource } from "@/lib/drupal";
import { getWhatWeOfferTerms } from "@/lib/drupal/what-we-offer";
import { HomeWhatWeOfferClient } from "./HomeWhatWeOfferClient";

type HomeWhatWeOfferProps = {
  paragraph: JsonApiResource<"paragraph--home_what_we_offer", HomeWhatWeOfferAttributes>;
  children?: React.ReactNode;
};

export async function HomeWhatWeOffer({ paragraph, children }: HomeWhatWeOfferProps) {
  const items = await getWhatWeOfferTerms();

  return (
    <HomeWhatWeOfferClient paragraph={paragraph} items={items}>
      {children}
    </HomeWhatWeOfferClient>
  );
}
