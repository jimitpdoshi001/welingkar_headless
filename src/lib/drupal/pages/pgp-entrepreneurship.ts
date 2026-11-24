import type { PgpData } from "@/lib/pgp/pgp-entrepreneurship-data";
import { absoluteDrupalUrl } from "../jsonapi";
import { getNodeReader, htmlParas, or, type NodeReader } from "../node-page";

/** Drupal node--pgp_entrepreneurship 5799 (PGP in Entrepreneurship & Family Managed Business). */
const NID = 5799;
const INCLUDE = [
  "field_banner",
  "field_banner.field_desktop",
  "field_banner.field_desktop.field_media_image",
  "field_programme_overview",
  "field_programme_overview.field_desktop",
  "field_programme_overview.field_desktop.field_media_image",
  "field_programme_overview.field_desktop.field_media_video_file",
  "field_programme_overview.field_mobile",
  "field_programme_overview.field_mobile.field_media_image",
  "field_program_usps",
  "field_program_usp_desktop_image",
  "field_program_usp_mobile_image",
  "field_admission_and_course_fees",
  "field_admission_and_course_fees.field_image",
];

type Entity = Parameters<NodeReader["text"]>[0];

/** Raw HTML of a rich-text field (rendered only through SafeHtml). */
const html = (e: Entity, f: string) => {
  const v = (e?.attributes as Record<string, unknown> | undefined)?.[f];
  return (typeof v === "string" ? v : ((v as { value?: string } | null)?.value ?? "")).trim();
};

/** Plain multi-line field: first non-bullet lines = body, "- " lines = items. */
function textList(raw: string): { body: string; items: string[] } {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const items = lines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());
  const body = lines.filter((l) => !l.startsWith("- ")).join(" ");
  return { body, items };
}

/** Raw plain-text value (keeps line breaks, unlike reader.text which trims only). */
const plain = (e: Entity, f: string) => {
  const v = (e?.attributes as Record<string, unknown> | undefined)?.[f];
  return typeof v === "string" ? v.replace(/\r\n/g, "\n").trim() : "";
};

// Links to the old live site are not used (site rule: no links to welingkar.org).
const isLiveSite = (href: string) => /^https?:\/\/(www\.)?welingkar\.org/i.test(href);

/** Drupal fee-card photos smaller than this are icons, too small for the 610px photo card. */
const MIN_CARD_IMAGE_WIDTH = 400;

/** "<h3>Item</h3><ul><li>…</li></ul>" x n -> item titles + their bullets. */
function headingLists(source: string): { items: string[]; details: string[][] } {
  const items: string[] = [];
  const details: string[][] = [];
  for (const m of source.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi)) {
    const title = htmlParas(m[1]).join(" ");
    if (!title) continue;
    items.push(title);
    details.push([...m[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => htmlParas(li[1]).join(" ")).filter(Boolean));
  }
  return { items, details };
}

/**
 * PGP EFMB page from Drupal. Each value falls back to the built-in page while Drupal is
 * unreachable; empty Drupal fields hide their element. Kept built-in: the Ideal For photo
 * (no Drupal field), the USP photo while its Drupal field is empty, the Ideal For primary button (Drupal links to the old
 * live site), the hero breadcrumb.
 */
export async function withPgpEntrepreneurshipContent(base: PgpData): Promise<PgpData> {
  const r = await getNodeReader("pgp_entrepreneurship", NID, INCLUDE);
  if (!r) return base;
  const n = r.node;

  // Hero: sub-title = tagline / description / key facts, separated by blank lines.
  const banner = r.refs(n, "field_banner")[0];
  const [tagline = "", description = "", facts = ""] = plain(banner, "field_sub_title").split(/\n\s*\n/).map((b) => b.replace(/\s*\n\s*/g, " ").trim());
  const apply = r.link(banner, "field_apply_now");

  // Overview (rich list + video thumbnail).
  const ov = r.refs(n, "field_programme_overview")[0];
  const youtubeId = r.text(ov, "field_youtube_id");
  const isVideo = r.text(ov, "field_type") === "video" && /^[\w-]{11}$/.test(youtubeId);
  // field_desktop may be a media--video (MP4 in field_media_video_file): plays inline.
  const ovMedia = r.refs(ov, "field_desktop")[0];
  const videoFileEntity = ovMedia?.type === "media--video" ? r.refs(ovMedia, "field_media_video_file")[0] : undefined;
  const videoUri = (videoFileEntity?.attributes?.uri as { url?: string } | undefined)?.url;
  const videoFile = videoUri ? absoluteDrupalUrl(videoUri) ?? "" : "";

  // Fees: items with a photo are fee cards; the rest are the purple info blocks.
  const feeItems = r.refs(n, "field_admission_and_course_fees");
  const withImage = (p: (typeof feeItems)[number]) => Boolean(p.relationships?.field_image?.data);
  const cards = feeItems.filter(withImage).map((p, i) => {
    const meta = (p.relationships?.field_image?.data as { meta?: { width?: number } } | null)?.meta;
    const big = (meta?.width ?? 0) >= MIN_CARD_IMAGE_WIDTH;
    const fallback = base.fees.cards[i];
    return {
      label: r.text(p, "field_main_title"),
      value: plain(p, "field_sub_title").split("\n").map((l) => l.trim()).filter(Boolean),
      // Drupal's photos are small icons today: keep the built-in photo (and its crop) until a large one is uploaded.
      image: big ? r.image(p, "field_image") : (fallback?.image ?? r.image(p, "field_image")),
      imagePosition: big ? undefined : fallback?.imagePosition,
      imageTop: big ? undefined : fallback?.imageTop,
    };
  }).filter((c) => c.label);
  const info = feeItems.filter((p) => !withImage(p)).map((p) => ({ heading: r.text(p, "field_main_title"), ...textList(plain(p, "field_sub_title")) })).filter((b) => b.heading);
  const feesDesc = textList(plain(n, "field_admission_course_descripti"));

  // Ideal For: "<p>intro</p><ul><li>…</li></ul>" (or h3 + ul groups).
  const idealHtml = html(n, "field_ideal_for_description");
  const ideal = headingLists(idealHtml);
  if (!ideal.items.length) ideal.items = [...idealHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => htmlParas(m[1]).join(" ")).filter(Boolean);
  const idealIntro = [...idealHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => htmlParas(m[1]).join(" ")).filter(Boolean).join(" ");
  // Brochure (stage PDF on the banner): hero and Ideal For "Download Brochure" buttons.
  const brochure = r.link(banner, "field_brochure");

  return {
    hero: {
      ...base.hero,
      title: r.text(banner, "field_main_title"),
      tagline,
      description,
      facts: facts ? facts.split(/\s*·\s*/).filter(Boolean) : [],
      image: or(r.image(banner, "field_desktop"), base.hero.image),
      cta: apply.href && !isLiveSite(apply.href) ? { label: or(apply.title, base.hero.cta.label), href: apply.href } : base.hero.cta,
      brochure: brochure.href && !isLiveSite(brochure.href) ? { label: or(brochure.title, "Download Brochure"), href: brochure.href } : undefined,
    },
    overview: {
      heading: r.text(ov, "field_main_title"),
      paragraphs: [],
      html: html(ov, "field_desc"),
      // With a video file, field_mobile is its poster; otherwise the desktop/mobile photos.
      image: videoFile ? or(r.image(ov, "field_mobile"), base.overview.image) : or(r.image(ov, "field_desktop"), base.overview.image),
      imageMobile: videoFile ? undefined : r.image(ov, "field_mobile") || undefined,
      videoFile: videoFile || undefined,
      videoHref: !videoFile && isVideo ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined,
    },
    uspBand: {
      ...base.uspBand,
      // Drupal USP photos (plain image files); the built-in photo stays while they are empty.
      image: or(r.image(n, "field_program_usp_desktop_image"), base.uspBand.image),
      imageMobile: r.image(n, "field_program_usp_mobile_image") || undefined,
      heading: r.text(n, "field_program_usp_title"),
      cards: r.refs(n, "field_program_usps").map((p) => r.text(p, "field_main_title")).filter(Boolean),
    },
    fees: {
      heading: r.text(n, "field_admission_fees_heading"),
      description: feesDesc.body,
      descriptionItems: feesDesc.items,
      cards,
      info,
    },
    idealFor: {
      ...base.idealFor,
      heading: r.text(n, "field_ideal_for_title"),
      description: idealIntro,
      items: ideal.items,
      itemDetails: ideal.details,
      secondaryCta: brochure.href && !isLiveSite(brochure.href) ? { label: or(brochure.title, base.idealFor.secondaryCta.label), href: brochure.href } : base.idealFor.secondaryCta,
    },
  };
}
