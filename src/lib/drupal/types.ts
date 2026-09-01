export type JsonApiLink = {
  href: string;
};

export type DrupalPath = {
  alias: string | null;
  pid: number | null;
  langcode: string;
};

export type JsonApiResource<TType extends string = string, TAttributes extends Record<string, unknown> = Record<string, unknown>> = {
  type: TType;
  id: string;
  attributes: TAttributes;
  relationships?: Record<string, JsonApiRelationship>;
  links?: Record<string, JsonApiLink>;
};

export type JsonApiRelationship = {
  data: { type: string; id: string; meta?: Record<string, unknown> } | Array<{ type: string; id: string; meta?: Record<string, unknown> }> | null;
};

export type JsonApiDocument<T extends JsonApiResource = JsonApiResource> = {
  data: T | T[] | null;
  included?: JsonApiResource[];
  links?: Record<string, JsonApiLink>;
  meta?: Record<string, unknown>;
};

export type NodeAttributes = {
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  path: DrupalPath;
  promote?: boolean;
  sticky?: boolean;
  body?: {
    value: string;
    format: string;
    processed: string;
    summary?: string;
  } | null;
  field_body?: {
    value?: string;
    format?: string;
    processed?: string;
    summary?: string;
  } | null;
  field_date?: string | null;
};

export type NodeResource = JsonApiResource<`node--${string}`, NodeAttributes>;

/** @deprecated Prefer generated types from /paragraphs YAML. Kept for unused Drupal leftovers. */
export type IconBoxAttributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  field_header?: string | null;
  field_description?: {
    value: string;
    format: string;
    processed: string;
  } | null;
  field_icon?: {
    type: string;
    id: string;
  } | null;
  field_image_description?: string | null;
  field_link?: {
    uri: string;
    title: string;
  } | null;
  [key: string]: unknown;
};

export type IconBoxResource = JsonApiResource<"paragraph--iconbox", IconBoxAttributes>;

export type DrupalImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  filename?: string;
};

export type DrupalMedia =
  | {
      kind: "image";
      url: string;
      alt: string;
      width?: number;
      height?: number;
    }
  | {
      kind: "video";
      url: string;
      alt: string;
      mimeType?: string;
    }
  | {
      kind: "remote_video";
      url: string;
      alt: string;
    };

export type DrupalResponsiveMedia = {
  desktop: DrupalMedia | null;
  mobile: DrupalMedia | null;
};

export type HomeSection2Attributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  field_image_description?: string | null;
  field_icon?: {
    type: string;
    id: string;
  } | null;
  field_background_media?: {
    type: string;
    id: string;
  } | null;
  field_background_media_image?: {
    type: string;
    id: string;
  } | null;
  field_background_media_image_field_media_image?: {
    type: string;
    id: string;
  } | null;
  [key: string]: unknown;
};

export type HomeSection2Resource = JsonApiResource<"paragraph--home_section2", HomeSection2Attributes>;

export type HomeProductsTabAttributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  field_header?: string | null;
  /** Tab label shown in the tab list. */
  field_tab_text?: string | null;
  field_description?: {
    value: string;
    format: string;
    processed: string;
  } | null;
  field_background_media?: {
    type: string;
    id: string;
  } | null;
  [key: string]: unknown;
};

export type HomeProductsTabResource = JsonApiResource<"paragraph--home_products_tab", HomeProductsTabAttributes>;

export type HomeSustainabilitySecAttributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  field_header?: string | null;
  field_image_description?: string | null;
  field_description?: {
    value: string;
    format: string;
    processed: string;
  } | null;
  field_background_media?: {
    type: string;
    id: string;
  } | null;
  field_button?: {
    type: string;
    id: string;
  } | null;
  [key: string]: unknown;
};

export type HomeSustainabilitySecResource = JsonApiResource<"paragraph--home_sustainability_sec", HomeSustainabilitySecAttributes>;

export type InvestorSectionAttributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  /** Multi-value link field on investor_section only. */
  field_multiple_links?: { uri: string; title: string }[] | { uri: string; title: string } | null;
  field_desktop?: {
    type: string;
    id: string;
  } | null;
  [key: string]: unknown;
};

export type InvestorSectionResource = JsonApiResource<"paragraph--investor_section", InvestorSectionAttributes>;

export type NewsroomListAttributes = {
  parent_id?: string | null;
  parent_type?: string | null;
  parent_field_name?: string | null;
  field_header?: string | null;
  [key: string]: unknown;
};

export type NewsroomListResource = JsonApiResource<"paragraph--newsroom_list", NewsroomListAttributes>;

/** Top-level or nested paragraph with optional child paragraphs. */
export type ParagraphItem = {
  resource: JsonApiResource;
  children: ParagraphItem[];
};

export type DrupalPage = {
  id: string;
  bundle: string;
  title: string;
  path: string;
  paths: string[];
  status: boolean;
  changed: string;
  node: NodeResource;
  paragraphs: ParagraphItem[];
  /** Images keyed by paragraph UUID (from field_image → media → file). */
  paragraphImages: Record<string, DrupalImage>;
  /** Multi-value images keyed by paragraph UUID (field_multiple_images → media → file). */
  paragraphImageLists: Record<string, DrupalImage[]>;
  /** Responsive media keyed by paragraph UUID (responsive_image or section with background media). */
  paragraphResponsiveMedia: Record<string, DrupalResponsiveMedia>;
};
