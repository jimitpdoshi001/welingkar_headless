import type { DividerAttributes, JsonApiResource } from "@/lib/drupal";
import clsx from "clsx";
type DividerProps = {
  paragraph: JsonApiResource<"paragraph--divider", DividerAttributes>;
};

export function Divider({ paragraph }: DividerProps) {
  const { attributes } = paragraph;

  const spacerClasses = {
    0: "mt-0",
    5: "mt-05",
    10: "mt-1",
    15: "mt-15",
    20: "mt-2",
    25: "mt-25",
    30: "mt-3",
    40: "mt-4",
    50: "mt-5",
    60: "mt-6",
    70: "mt-7",
    80: "mt-8",
    90: "mt-9",
    100: "mt-10",
    110: "mt-11",
    120: "mt-12",
    1000: "mt-10dvh",
    2000: "mt-20dvh",
    3000: "mt-30dvh",
    4000: "mt-40dvh",
    5000: "mt-50dvh",
    6000: "mt-60dvh",
    7000: "mt-70dvh",
    8000: "mt-80dvh",
  } as const;

  const spacerClass = spacerClasses[attributes.field_divider as keyof typeof spacerClasses] || null;

  return <div className={clsx(spacerClass)} />;
}
