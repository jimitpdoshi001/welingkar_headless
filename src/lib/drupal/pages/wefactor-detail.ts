import type { WeFactorBlock, WeFactorDetailData } from "@/lib/wefactor/welearning-data";
import { WEENTREPRENEURSHIP } from "@/lib/wefactor/weentrepreneurship-data";
import { WEINNOVATE } from "@/lib/wefactor/weinnovate-data";
import { WELEAD } from "@/lib/wefactor/welead-data";
import { WELEARNING } from "@/lib/wefactor/welearning-data";
import { getNodeReader, or, type NodeReader } from "../node-page";

/**
 * Drupal fields per block (block id -> node fields). `data` paragraphs carry
 * field_description + field_image (one photo per item); `image` is a single
 * file field on the node; `list` items use field_project_title + field_sub_title.
 */
type BlockSpec = { title?: string; itemTitle?: boolean; desc?: string; data?: string; image?: string; groupHeading?: string; list?: string };
type PageSpec = { type: string; nid: number; base: WeFactorDetailData; title: string; intro: string; blocks: Record<string, BlockSpec> };

const SPECS = {
  welearning: {
    type: "welearning", nid: 5772, base: WELEARNING,
    title: "field_welearning_title", intro: "field_welearning_description",
    blocks: {
      aaa: { title: "field_aaa_title", data: "field_aaa_data" },
      neev: { title: "field_student_induction_title", data: "field_student_induction_data" },
      "summer-internships": { title: "field_summer_internships_title", desc: "field_summer_internships_descrip" },
      "industry-roundtable": { title: "field_industry_roundtable_title", data: "field_industry_roundtable_data" },
      "global-citizen-leadership": { title: "field_global_citizen_title", desc: "field_global_citizen_description" },
      acdc: { title: "field_acdc_title", desc: "field_acdc_description" },
      impact: { groupHeading: "field_student_initiatives_title", data: "field_student_initiatives_data" },
      samvad: { title: "field_samvad_title", desc: "field_samvad_description" },
    },
  },
  weinnovate: {
    type: "weinnovate", nid: 5770, base: WEINNOVATE,
    title: "field_weinnovate_title", intro: "field_weinnovate_description",
    blocks: {
      redx: { title: "field_innovation_lab_title", desc: "field_innovation_lab_description" },
      "indo-sweden": { title: "field_innovation_initiatives_tit", data: "field_innovation_initiatives_dat" },
      icsid: { title: "field_icsid_title", data: "field_icsid_data" },
      "design-innovation": { title: "field_design_innovation_title", data: "field_design_innovation_data" },
    },
  },
  weentrepreneurship: {
    type: "weentrepreneurship", nid: 5769, base: WEENTREPRENEURSHIP,
    title: "field_weentrepreneurship_title", intro: "field_weentrepreneurship_descrip",
    blocks: {
      innowe: { title: "field_innowe_title", desc: "field_innowe_description", image: "field_innowe_image" },
      entrepreneurship: { title: "field_entrepreneurship_at_wescho", desc: "field_entrepreneurship_at_desc" },
      nisp: { title: "field_nisp_policy_title", desc: "field_nisp_policy_description" },
      wenture: { data: "field_wenture_data", itemTitle: true },
      // Drupal has photos only; the section text stays built-in.
      "smart-india-hackathons": { data: "field_smart_india_hackathons_dat" },
    },
  },
  welead: {
    type: "welead", nid: 5771, base: WELEAD,
    title: "field_welead_title", intro: "field_welead_description",
    blocks: {
      "global-citizen-leadership": { title: "field_leadership_program_title", desc: "field_leadership_program_descrip" },
      projects: { title: "field_project_title", list: "field_project_data" },
    },
  },
} satisfies Record<string, PageSpec>;

/** Unique paragraphs across data items (items often repeat the same text). */
const uniqueParas = (r: NodeReader, items: ReturnType<NodeReader["refs"]>) => [...new Set(items.flatMap((p) => r.paras(p, "field_description")))];

function applyBlock(r: NodeReader, block: WeFactorBlock, spec: BlockSpec | undefined): WeFactorBlock {
  if (!spec) return block;
  const n = r.node;
  const items = spec.data ? r.refs(n, spec.data) : [];
  // itemTitle: the section title lives on the data paragraph (e.g. Wenture.inv).
  const title = or(spec.title ? r.text(n, spec.title) : spec.itemTitle ? r.text(items[0], "field_main_title") : "", block.title);

  if (block.type === "list") {
    const list = spec.list
      ? r.refs(n, spec.list).map((p) => ({ title: r.text(p, "field_project_title"), subtitle: r.text(p, "field_sub_title") || undefined })).filter((i) => i.title)
      : [];
    return { ...block, title, items: list.length ? list : block.items };
  }

  const paragraphs = spec.desc ? r.paras(n, spec.desc) : uniqueParas(r, items);
  const images = spec.image ? [r.image(n, spec.image)].filter(Boolean) : items.map((p) => r.image(p, "field_image")).filter(Boolean);
  return {
    ...block,
    title,
    ...(spec.groupHeading ? { groupHeading: or(r.text(n, spec.groupHeading), block.groupHeading ?? ""), title: block.title } : {}),
    paragraphs: or(paragraphs, block.paragraphs),
    ...(block.type === "carousel" ? { images: or(images, block.images ?? []) } : {}),
  };
}

/** WeFactor sub-page from its Drupal node; built-in content fills anything empty. */
export async function getWeFactorDetail(page: keyof typeof SPECS): Promise<WeFactorDetailData> {
  const spec: PageSpec = SPECS[page];
  const include = Object.values(spec.blocks).flatMap((b: BlockSpec) => [
    ...(b.data ? [`${b.data}.field_image`] : []),
    ...(b.image ? [b.image] : []),
    ...(b.list ? [b.list] : []),
  ]);
  const r = await getNodeReader(spec.type, spec.nid, include);
  if (!r) return spec.base;
  const blocks = spec.blocks as Record<string, BlockSpec>;
  return {
    ...spec.base,
    title: or(r.text(r.node, spec.title), spec.base.title),
    intro: or(r.paras(r.node, spec.intro).join(" "), spec.base.intro),
    blocks: spec.base.blocks.map((b) => applyBlock(r, b, blocks[b.id])),
  };
}
