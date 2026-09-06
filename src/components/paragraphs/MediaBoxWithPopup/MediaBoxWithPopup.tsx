import type { DrupalImage, DrupalResponsiveMedia, JsonApiResource, MediaBoxWithPopupAttributes } from "@/lib/drupal";
import MediaBoxWithPopupGridOf2, { MediaBoxWithPopupGridOf2Group } from "./MediaBoxWithPopupGridOf2";
import MediaBoxWithPopupSingleImage, { MediaBoxWithPopupSingleImageGroup } from "./MediaBoxWithPopupSingleImage";

export type MediaBoxWithPopupProps = {
  paragraph: JsonApiResource<"paragraph--media_box_with_popup", MediaBoxWithPopupAttributes>;
  image?: DrupalImage | null;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children?: React.ReactNode;
};

export function MediaBoxWithPopup(props: MediaBoxWithPopupProps) {
  const componentStyle = props.paragraph.attributes.field_components_style_media_pop || props.paragraph.attributes.field_components_style;

  switch (componentStyle) {

    case "single_image":
      return <MediaBoxWithPopupSingleImage {...props} />;

    case "grid_of_2":
    case "default":
    default:
      return <MediaBoxWithPopupGridOf2 {...props} />;
  }
}

export function MediaBoxWithPopupGroup({ componentStyle, children }: { componentStyle?: string | null; children: React.ReactNode }) {
  switch (componentStyle) {
    case "single_image":
      return <MediaBoxWithPopupSingleImageGroup>{children}</MediaBoxWithPopupSingleImageGroup>;

    case "grid_of_2":
    case "default":
    default:
      return <MediaBoxWithPopupGridOf2Group>{children}</MediaBoxWithPopupGridOf2Group>;
  }
}
