import { getImageProps } from "next/image";

/**
 * Props for a plain <img> served through the Next image optimizer (WebP/AVIF,
 * resized srcset) without changing existing layout CSS. `fill` avoids fixed
 * width/height attributes; its absolute-positioning style is dropped so the
 * element keeps the component's own styling.
 */
export function optimizedImgProps(
  src: string,
  alt: string,
  sizes = "(max-width: 768px) 100vw, 50vw",
) {
  const {
    props: { style: _style, ...props },
  } = getImageProps({ src, alt, fill: true, sizes });
  return props;
}
