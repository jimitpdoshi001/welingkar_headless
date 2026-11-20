"use client";

import { useState } from "react";

import { CONTACT_CAMPUSES, type ContactItem } from "@/lib/contact/contact-data";
import styles from "./ContactPage.module.scss";

// tel: target = first number in the text; rows with an extension or a timing stay plain.
function telHref(t: string) {
  const first = t.split(/[/,|]/)[0].replace(/[^\d+]/g, "");
  return first.length >= 8 && !/ext|timing/i.test(t) ? `tel:${first}` : undefined;
}

function Item({ item }: { item: ContactItem }) {
  if (item.kind === "text") return <p className={styles.note}>{item.text}</p>;
  if (item.kind === "link") {
    const external = item.href.startsWith("http");
    return (
      <p className={styles.note}>
        {item.before}
        <a href={item.href} className={styles.inlineLink} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {item.text}
        </a>
        {item.after}
      </p>
    );
  }
  const isPhone = item.kind === "phone";
  const href = isPhone ? telHref(item.text) : `mailto:${item.text}`;
  return (
    <p className={`${styles.line} ${isPhone ? "" : styles.mail}`}>
      <img src={isPhone ? "/contact/icon-phone.svg" : "/contact/icon-mail.svg"} alt="" width={isPhone ? 15 : 18} height={isPhone ? 15 : 11} />
      <span>{href ? <a href={href}>{item.text}</a> : item.text}</span>
    </p>
  );
}

/** Campus cards pick the campus; the side box picks the section shown in the two columns. */
export function ContactTabs() {
  const [campusId, setCampusId] = useState(CONTACT_CAMPUSES[0].id);
  const [sectionIdx, setSectionIdx] = useState(0);
  const campus = CONTACT_CAMPUSES.find((c) => c.id === campusId) ?? CONTACT_CAMPUSES[0];
  const section = campus.sections[sectionIdx];

  return (
    <>
      <div className={`container ${styles.campuses}`} role="tablist" aria-label="Campus">
        {CONTACT_CAMPUSES.map((c) => {
          const active = c.id === campus.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={styles.card}
              onClick={() => {
                setCampusId(c.id);
                setSectionIdx(0);
              }}
            >
              <img src={c.image} alt="" className={styles.cardImg} />
              <span className={styles.cardBar}>
                <span>{c.label}</span>
                <img src={active ? "/contact/arrow-active.svg" : "/contact/arrow.svg"} alt="" width={50} height={50} className={styles.cardArrow} />
              </span>
            </button>
          );
        })}
      </div>

      {section ? (
        <section className={`container ${styles.info}`}>
          <nav className={styles.side} aria-label={`${campus.label} contact sections`}>
            <ul>
              {campus.sections.map((s, i) => (
                <li key={s.title}>
                  <button type="button" aria-current={i === sectionIdx ? "true" : undefined} className={i === sectionIdx ? styles.sideActive : undefined} onClick={() => setSectionIdx(i)}>
                    {s.title}
                    {i === sectionIdx ? <img src="/contact/icon-play.svg" alt="" width={10} height={12} /> : null}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.groups}>
            {section.groups.map((g, i) => (
              <div key={i} className={`${styles.group} ${g.heading ? styles.groupStart : ""}`}>
                {g.heading ? <h3 className={styles.colHeading}>{g.heading}</h3> : null}
                {g.label ? <p className={styles.groupLabel}>{g.label}</p> : null}
                {g.items.map((it, j) => (
                  <Item key={j} item={it} />
                ))}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
