"use client";

import { useState } from "react";

import styles from "./PgdmReadMore.module.scss";

/** Words shown before "Show More" (content spec: 162 words ≈ 1,143 characters). */
export const READ_MORE_LIMIT = 162;

type PgdmReadMoreProps = {
  /** Plain text (one block; keep line breaks with white-space: pre-line on className). */
  text?: string;
  /** Several paragraphs, each rendered as its own <p>. */
  paragraphs?: string[];
  /** Sanitized HTML (lists, links…), already cleaned server-side. */
  html?: string;
  /** Class for the text element(s). */
  className?: string;
  limit?: number;
};

const countWords = (text: string) => (text.match(/\S+/g) ?? []).length;

/** Keep the first `limit` words of plain text (whitespace preserved), adding an ellipsis. */
function cutText(text: string, limit: number): string {
  if (countWords(text) <= limit) return text;
  let seen = 0;
  const end = text.replace(/\S+/g, (word) => (++seen <= limit ? word : "")).trimEnd();
  return `${end}…`;
}

const VOID_TAGS = new Set(["br", "img", "hr", "wbr"]);

/**
 * Shorten HTML to `limit` visible words without breaking markup: words are
 * counted, tags are kept, and any tags still open at the cut are closed.
 */
function cutHtml(html: string, limit: number): { html: string; cut: boolean } {
  const tokens = html.match(/<[^>]+>|[^<]+/g) ?? [];
  const open: string[] = [];
  let used = 0;
  let out = "";
  for (const token of tokens) {
    if (token.startsWith("<")) {
      const closing = /^<\//.test(token);
      const name = (token.match(/^<\/?\s*([a-z0-9]+)/i)?.[1] ?? "").toLowerCase();
      if (closing) open.pop();
      else if (name && !VOID_TAGS.has(name) && !token.endsWith("/>")) open.push(name);
      out += token;
      continue;
    }
    const visible = countWords(token);
    if (used + visible <= limit) {
      out += token;
      used += visible;
      continue;
    }
    out += cutText(token, Math.max(limit - used, 0));
    // Close whatever is still open (innermost first).
    return { html: out + open.reverse().map((tag) => `</${tag}>`).join(""), cut: true };
  }
  return { html: out, cut: false };
}

/** Long content: shows the first {@link READ_MORE_LIMIT} words with a Show More / Show Less toggle. */
export function PgdmReadMore({ text, paragraphs, html, className, limit = READ_MORE_LIMIT }: PgdmReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  let body: React.ReactNode;
  let isLong = false;

  if (html !== undefined) {
    const short = cutHtml(html, limit);
    isLong = short.cut;
    // Sanitized server-side; the shortened copy only re-closes those same tags.
    body = <div className={className} dangerouslySetInnerHTML={{ __html: expanded || !isLong ? html : short.html }} />;
  } else if (paragraphs) {
    isLong = countWords(paragraphs.join(" ")) > limit;
    let budget = limit;
    const shown: string[] = [];
    for (const para of paragraphs) {
      if (expanded || !isLong) {
        shown.push(para);
        continue;
      }
      if (budget <= 0) break;
      shown.push(cutText(para, budget));
      budget -= countWords(para);
    }
    body = shown.map((para, i) => (
      <p key={i} className={className}>
        {para}
      </p>
    ));
  } else {
    const value = text ?? "";
    isLong = countWords(value) > limit;
    body = <p className={className}>{expanded || !isLong ? value : cutText(value, limit)}</p>;
  }

  return (
    <>
      {body}
      {isLong ? (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Show Less" : "Show More"}
        </button>
      ) : null}
    </>
  );
}

export default PgdmReadMore;
