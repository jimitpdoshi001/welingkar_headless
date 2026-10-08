"use client";

import Link from "next/link";

import type { PgdmFaqs as PgdmFaqsData } from "@/lib/pgdm/pgdm-data";
import { PgdmAccordion, type AccordionItem } from "../common/PgdmAccordion";
import styles from "./PgdmFaqs.module.scss";

export function PgdmFaqs({ data }: { data: PgdmFaqsData }) {
  const items: AccordionItem[] = data.items.map((item) => ({
    id: item.id,
    label: item.q,
    content: <p className={styles.answer}>{item.a}</p>,
  }));

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <PgdmAccordion
        items={items}
        defaultOpenId={data.items[2]?.id}
      />

      <div className={styles.brochure}>
        <Link
          href={data.brochureCta.href}
          className="btn accent">
          {data.brochureCta.label}
        </Link>
      </div>
    </div>
  );
}

export default PgdmFaqs;
