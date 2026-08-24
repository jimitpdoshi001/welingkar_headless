import type { DrupalImage, DrupalResponsiveMedia, ImageBoxAttributes, JsonApiResource } from "@/lib/drupal";
import ImageBoxDefault, { ImageBoxDefaultGroup } from "./ImageBoxDefault";
import ImageBoxWefactor, { ImageBoxWefactorGroup } from "./ImageBoxWefactor";

export type ImageBoxProps = {
  paragraph: JsonApiResource<"paragraph--image_box", ImageBoxAttributes>;
  image?: DrupalImage | null;
  responsiveMedia?: DrupalResponsiveMedia | null;
  children: React.ReactNode;
};

export function ImageBox(props: ImageBoxProps) {
  const componentStyle = props.paragraph.attributes.field_components_style;

  switch (componentStyle) {
    case "wefactor":
      return <ImageBoxWefactor {...props} />;

    case "default":
    default:
      return <ImageBoxDefault {...props} />;
  }
}

export function ImageBoxGroup({ componentStyle, children }: { componentStyle?: string | null; children: React.ReactNode }) {
  switch (componentStyle) {
    case "wefactor":
      return <ImageBoxWefactorGroup>{children}</ImageBoxWefactorGroup>;

    case "default":
    default:
      return <ImageBoxDefaultGroup>{children}</ImageBoxDefaultGroup>;
  }
}
