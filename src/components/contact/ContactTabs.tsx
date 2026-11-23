"use client";

import { useState } from "react";

import { CONTACT_CAMPUSES, type ContactGroup, type ContactItem } from "@/lib/contact/contact-data";
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


/** "a/ b, c" -> separate numbers, but only when every part is a full number (keeps "Ext: 8133 / 8134" and "43476207/ 08" whole). */
function splitNumbers(t: string): string[] {
  const parts = t.split(/[/,]/).map((x) => x.trim()).filter(Boolean);
  return parts.length > 1 && parts.every((x) => x.replace(/\D/g, "").length >= 8) ? parts : [t];
}

const PhoneIcon = () => <img src="/contact/icon-phone.svg" alt="" width={15} height={15} />;

/** One number as a tile: dials when it is a plain number. */
function NumberChip({ n }: { n: string }) {
  const href = telHref(n);
  return href ? (
    <a href={href} className={styles.chip}>
      <PhoneIcon />
      {n}
    </a>
  ) : (
    <span className={styles.chip}>
      <PhoneIcon />
      {n}
    </span>
  );
}

type Card = { main: ContactGroup; children: ContactGroup[] };

/** A heading starts a card; following groups without a heading belong to it. */
function toCards(groups: ContactGroup[]): Card[] {
  const cards: Card[] = [];
  for (const g of groups) {
    if (g.heading || !cards.length) cards.push({ main: g, children: [] });
    else cards[cards.length - 1].children.push(g);
  }
  return cards;
}

/** Card body shared by the card and its unlabelled sub-blocks: intro text, desk tiles, notes. */
function CardBody({ group, desks }: { group: ContactGroup; desks: boolean }) {
  const firstContact = group.items.findIndex((i) => i.kind === "phone" || i.kind === "mail");
  const intro = group.items.filter((i, k) => i.kind === "text" && (firstContact < 0 || k < firstContact));
  const notes = group.items.filter((i, k) => i.kind === "link" || (i.kind === "text" && firstContact >= 0 && k > firstContact));
  const numbers = group.items.filter((i) => i.kind === "phone").flatMap((i) => splitNumbers(i.text));
  return (
    <>
      {intro.map((i, k) => (
        <p key={k} className={styles.cardSub}>
          {i.text}
        </p>
      ))}
      {numbers.length ? (
        <div className={styles.desks}>
          {numbers.map((n, k) => {
            const href = telHref(n);
            return (
              <div key={k} className={styles.desk}>
                <div>
                  {desks && numbers.length > 1 ? <p className={styles.deskLabel}>Desk {k + 1}</p> : null}
                  <p className={styles.deskNumber}>
                    <PhoneIcon />
                    {n}
                  </p>
                </div>
                {href ? (
                  <a href={href} className={styles.callBtn} aria-label={`Call ${n}`}>
                    Call
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {notes.map((it, k) => (
        <Item key={k} item={it} />
      ))}
    </>
  );
}

/** Contact cards (reference layout): title + email pills, desk tiles, then regional zone cards. */
function ContactCards({ groups }: { groups: ContactGroup[] }) {
  return (
    <div className={styles.cards}>
      {toCards(groups).map(({ main, children }, ci) => {
        // Emails from the card and its zones sit as pills in the card header.
        const mails = [main, ...children.filter((c) => c.label)].flatMap((g) => g.items.filter((i) => i.kind === "mail").map((i) => i.text));
        const region = children.find((c) => c.region);
        const zones = children.filter((c) => c.label && !c.region);
        const blocks = children.filter((c) => !c.label);
        return (
          <article key={ci} className={styles.contactCard}>
            <header className={styles.cardHead}>
              <div>
                {main.heading ? <h3 className={styles.cardTitle}>{main.heading}</h3> : null}
              </div>
              {mails.length ? (
                <div className={styles.mails}>
                  {mails.map((m) => (
                    <a key={m} href={`mailto:${m}`} className={styles.mailPill}>
                      <img src="/contact/icon-mail.svg" alt="" width={18} height={11} />
                      {m}
                    </a>
                  ))}
                </div>
              ) : null}
            </header>
            <CardBody group={main} desks />

            {blocks.map((b, k) => (
              <div key={k} className={styles.subBlock}>
                <CardBody group={b} desks={false} />
                {b.items.filter((i) => i.kind === "mail").map((i) => (
                  <Item key={i.text} item={i} />
                ))}
              </div>
            ))}

            {zones.length ? (
              <div className={styles.region}>
                <div className={styles.regionHead}>
                  <p className={styles.regionTitle}>{region?.label ?? "Regional admission desks"}</p>
                  {region?.items.map((i, k) => (
                    <p key={k} className={styles.regionNote}>
                      {i.text}
                    </p>
                  ))}
                </div>
                <div className={styles.zones}>
                  {zones.map((z) => {
                    const nums = z.items.filter((i) => i.kind === "phone").flatMap((i) => splitNumbers(i.text));
                    return (
                      <div key={z.label} className={styles.zone}>
                        <p className={styles.zoneHead}>
                          <span>{z.label}</span>
                          <span className={styles.zoneCount}>
                            {nums.length} {nums.length === 1 ? "Line" : "Lines"}
                          </span>
                        </p>
                        <div className={styles.zoneNumbers}>
                          {nums.map((n) => (
                            <NumberChip key={n} n={n} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
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

          <ContactCards groups={section.groups} />
        </section>
      ) : null}
    </>
  );
}
