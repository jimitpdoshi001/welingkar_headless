import type { DrupalImage, DrupalResponsiveMedia, ImageLeftRightAttributes, JsonApiResource } from "@/lib/drupal";
import ImageLeftRightDefault, { ImageLeftRightDefaultGroup } from "./ImageLeftRightDefault";
import ImageLeftRightCampusListing, { ImageLeftRightCampusListingGroup } from "./ImageLeftRightCampusListing";

export type ImageLeftRightProps = {
  paragraph: JsonApiResource<"paragraph--image_left_right", ImageLeftRightAttributes>;
  children?: React.ReactNode;
  responsiveMedia?: DrupalResponsiveMedia | null;
  image?: DrupalImage;
};

export function ImageLeftRight(props: ImageLeftRightProps) {
  const componentStyle = props.paragraph.attributes.field_components_style_crl;

  switch (componentStyle) {
    case "campus_listing":
      return <ImageLeftRightCampusListing {...props} />;

    case "default":
    default:
      return <ImageLeftRightDefault {...props} />;
  }
}

export function ImageLeftRightGroup({ componentStyle, children }: { componentStyle?: string | null; children: React.ReactNode }) {
  switch (componentStyle) {
    case "campus_listing":
      return <ImageLeftRightCampusListingGroup>{children}</ImageLeftRightCampusListingGroup>;

    case "default":
    default:
      return <ImageLeftRightDefaultGroup>{children}</ImageLeftRightDefaultGroup>;
  }
}

