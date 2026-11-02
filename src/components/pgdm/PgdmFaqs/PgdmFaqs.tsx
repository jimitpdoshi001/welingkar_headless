"use client";

import Link from "next/link";

import type { PgdmFaqs as PgdmFaqsData } from "@/lib/pgdm/pgdm-data";
import { PgdmAccordion, type AccordionItem } from "../common/PgdmAccordion";
import styles from "./PgdmFaqs.module.scss";

export function PgdmFaqs({ data }: { data: PgdmFaqsData }) {
  const items: AccordionItem[] = data.items.map((item) => ({
    id: item.id,
    label: item.q,
    // Answer is Drupal HTML, sanitized server-side.
    content: <div className={styles.answer} dangerouslySetInnerHTML={{ __html: item.a }} />,
  }));

  return (
    <div className={styles.root}>
      {items.length > 0 ? (
        <>
          <h2 className={styles.heading}>{data.heading}</h2>
          <PgdmAccordion
            items={items}
            defaultOpenId={null} // all FAQs start closed
          />
        </>
      ) : null}

      {data.brochureCta.href ? (
        <div className={styles.brochure}>
          <Link
            href={data.brochureCta.href}
            className="btn accent">
            {data.brochureCta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default PgdmFaqs;
