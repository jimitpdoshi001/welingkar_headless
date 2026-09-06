import type { DrupalImage, DrupalResponsiveMedia, ImageBoxAttributes, JsonApiResource } from "@/lib/drupal";
import ImageBoxDefault, { ImageBoxDefaultGroup } from "./ImageBoxDefault";
import ImageBoxWefactor, { ImageBoxWefactorGroup } from "./ImageBoxWefactor";
import ImageBoxTabsCampus, { ImageBoxTabsCampusGroup } from "./ImageBoxTabsCampus";
import ImageBoxGlassBg, {ImageBoxGlassBgGroup} from "./ImageBoxGlassBg";
import ImageBoxFlat, {ImageBoxFlatGroup} from "./ImageBoxFlat";

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

    case "tabs_campus":
      return <ImageBoxTabsCampus {...props} />;
    
    case "glass_bg_text_slider_campus":
      return <ImageBoxGlassBg {...props} />;

    case "flat_slider":
      return <ImageBoxFlat {...props} />;

    case "default":
    default:
      return <ImageBoxDefault {...props} />;
  }
}

export function ImageBoxGroup({ componentStyle, children }: { componentStyle?: string | null; children: React.ReactNode }) {
  switch (componentStyle) {
    case "wefactor":
      return <ImageBoxWefactorGroup>{children}</ImageBoxWefactorGroup>;

    case "tabs_campus":
      return <ImageBoxTabsCampusGroup>{children}</ImageBoxTabsCampusGroup>;


    case "glass_bg_text_slider_campus":
      return <ImageBoxGlassBgGroup>{children}</ImageBoxGlassBgGroup>;

    case "flat_slider":
      return <ImageBoxFlatGroup>{children}</ImageBoxFlatGroup>;

    case "default":
    default:
      return <ImageBoxDefaultGroup>{children}</ImageBoxDefaultGroup>;
  }
}
