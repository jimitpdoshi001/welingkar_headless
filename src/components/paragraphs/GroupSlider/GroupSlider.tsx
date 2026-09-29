import GroupSliderType1 from "./GroupSliderType1";
import GroupSliderType2 from "./GroupSliderType2";
import GroupSliderType3 from "./GroupSliderType3";
import GroupSliderType4 from "./GroupSliderType4";
import GroupSliderType5 from "./GroupSliderType5";
import type { GroupSliderProps } from "./group-slider-config";

export type { GroupSliderProps } from "./group-slider-config";
export { getGroupSliderConfig } from "./group-slider-config";

export function GroupSlider(props: GroupSliderProps) {
  switch (props.paragraph.attributes.field_slider_type) {
    case "type_2":
      return <GroupSliderType2 {...props} />;
    case "type_3":
      return <GroupSliderType3 {...props} />;
    case "type_4":
      return <GroupSliderType4 {...props} />;
    case "type_5":
      return <GroupSliderType5 {...props} />;
    case "type_1":
    default:
      return <GroupSliderType1 {...props} />;
  }
}
