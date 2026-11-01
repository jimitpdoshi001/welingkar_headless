type PgdmImageProps = {
  src: string;
  /** Optional mobile-specific image (≤767px) from Drupal. */
  mobileSrc?: string;
  alt: string;
  className?: string;
};

// Plain <img>, or <picture> with a mobile source when Drupal supplies one.
export function PgdmImage({ src, mobileSrc, alt, className }: PgdmImageProps) {
  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
  if (!mobileSrc) return img;

  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet={mobileSrc}
      />
      {img}
    </picture>
  );
}

export default PgdmImage;
