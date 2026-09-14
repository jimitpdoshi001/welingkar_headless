"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { InPageLinksAttributes, JsonApiResource } from "@/lib/drupal";
import { toHref } from "@/lib/drupal/link";
import clsx from "clsx";
import styles from "./InPageLinks.module.scss";

type InPageLinksProps = {
  paragraph: JsonApiResource<"paragraph--in_page_links", InPageLinksAttributes>;
  children?: React.ReactNode;
};

type LinkItem = {
  uri: string;
  title: string;
  targetId: string | null;
  href: string;
};

function extractTargetId(uri?: string | null): string | null {
  if (!uri?.trim()) return null;
  const href = toHref(uri) || uri.trim();
  const hashIndex = href.indexOf("#");
  if (hashIndex !== -1) {
    const id = href.slice(hashIndex + 1).trim();
    return id || null;
  }
  return null;
}

function parseLinks(rawLinks: unknown): LinkItem[] {
  if (!rawLinks) return [];

  let linkObjects: Array<{ uri?: string; title?: string }> = [];

  if (Array.isArray(rawLinks)) {
    linkObjects = rawLinks;
  } else if (typeof rawLinks === "object" && rawLinks !== null) {
    const values = Object.values(rawLinks);
    const isListOfObjects = values.every((v) => v && typeof v === "object" && ("uri" in v || "title" in v));

    if (isListOfObjects && values.length > 0) {
      linkObjects = values as Array<{ uri?: string; title?: string }>;
    } else if ("uri" in rawLinks || "title" in rawLinks) {
      linkObjects = [rawLinks as { uri?: string; title?: string }];
    }
  }

  const parsed = linkObjects
    .filter((link) => Boolean(link && (link.uri || link.title)))
    .map((link) => {
      const uri = link.uri || "";
      const href = toHref(uri) || uri || "#";
      const targetId = extractTargetId(uri);
      return {
        uri,
        title: link.title || "Link",
        targetId,
        href,
      };
    });

  return parsed;
}

type InPageGroupContextType = {
  isGrouped: boolean;
  registerLinks: (id: string, links: LinkItem[]) => void;
  unregisterLinks: (id: string) => void;
};

const InPageGroupContext = createContext<InPageGroupContextType>({
  isGrouped: false,
  registerLinks: () => {},
  unregisterLinks: () => {},
});

export function InPageLinksGroup({ children }: { children: React.ReactNode }) {
  const [registeredMap, setRegisteredMap] = useState<Record<string, LinkItem[]>>({});
  const [headerHeight, setHeaderHeight] = useState(80);
  const [isSticky, setIsSticky] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const registerLinks = useCallback((id: string, links: LinkItem[]) => {
    setRegisteredMap((prev) => {
      const existing = prev[id];
      if (
        existing &&
        existing.length === links.length &&
        existing.every((l, i) => l.href === links[i]?.href && l.title === links[i]?.title)
      ) {
        return prev;
      }
      return { ...prev, [id]: links };
    });
  }, []);

  const unregisterLinks = useCallback((id: string) => {
    setRegisteredMap((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ isGrouped: true, registerLinks, unregisterLinks }),
    [registerLinks, unregisterLinks]
  );

  const allLinks = Object.values(registeredMap).flat();
  const items = allLinks;
  const itemsSerialized = JSON.stringify(items.map((i) => i.href));

  const [activeId, setActiveId] = useState<string | null>(items[0]?.targetId || null);

  useEffect(() => {
    const updateHeaderAndSticky = () => {
      const headerEl = document.querySelector("header");
      const currentHeaderHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;
      if (currentHeaderHeight > 0) {
        setHeaderHeight(currentHeaderHeight);
      }

      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        // Sticky docking when top of wrapper reaches or passes below header
        const stickyState = rect.top <= currentHeaderHeight;
        setIsSticky(stickyState);
      }

      const currentScrollY = window.scrollY;
      const validTargetIds = items
        .map((item) => item.targetId)
        .filter((id): id is string => Boolean(id));

      if (validTargetIds.length > 0) {
        const inPageNavEl = wrapperRef.current?.querySelector(`.${styles.root}`);
        const inPageNavHeight = inPageNavEl ? inPageNavEl.getBoundingClientRect().height : 50;
        const scrollPosition = currentScrollY + currentHeaderHeight + inPageNavHeight + 40;
        let currentActiveId: string | null = null;

        for (const id of validTargetIds) {
          const element = document.getElementById(id);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentActiveId = id;
              break;
            }
          }
        }

        if (currentActiveId) {
          setActiveId(currentActiveId);
        }
      }
    };

    updateHeaderAndSticky();

    const headerEl = document.querySelector("header");
    let observer: ResizeObserver | null = null;
    if (headerEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        updateHeaderAndSticky();
      });
      observer.observe(headerEl);
    }

    window.addEventListener("scroll", updateHeaderAndSticky, { passive: true });
    window.addEventListener("resize", updateHeaderAndSticky, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateHeaderAndSticky);
      window.removeEventListener("resize", updateHeaderAndSticky);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSerialized]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: LinkItem) => {
    if (item.targetId) {
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const inPageNavEl = wrapperRef.current?.querySelector(`.${styles.root}`);
        const inPageNavHeight = inPageNavEl ? inPageNavEl.getBoundingClientRect().height : 50;
        const totalHeaderOffset = headerHeight + inPageNavHeight + 10;
        const offsetPosition = elementPosition - totalHeaderOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveId(item.targetId);
      }
    }
  };

  if (items.length === 0) {
    return <InPageGroupContext.Provider value={contextValue}>{children}</InPageGroupContext.Provider>;
  }

  return (
    <InPageGroupContext.Provider value={contextValue}>
      <div style={{ display: "none" }}>{children}</div>

      <div
        ref={wrapperRef}
        className={styles.wrapper}>
        <div
          className={clsx(
            styles.root,
            isSticky && styles.isSticky
          )}
          style={{ top: isSticky ? `${headerHeight}px` : undefined }}>
          <nav
            className={styles.nav}
            aria-label="In-page navigation">
            {items.map((item, index) => {
              const isActive = item.targetId ? activeId === item.targetId : index === 0;

              return (
                <a
                  key={`${item.href}-${index}`}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={clsx(styles.link, isActive && styles.active)}>
                  {item.title}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </InPageGroupContext.Provider>
  );
}

export function InPageLinks({ paragraph }: InPageLinksProps) {
  const { attributes } = paragraph;
  const rawLinks = attributes.field_url;
  const parsedItems = parseLinks(rawLinks);
  const items = parsedItems;
  const paragraphId = paragraph.id || JSON.stringify(attributes);

  const { isGrouped, registerLinks, unregisterLinks } = useContext(InPageGroupContext);
  const itemsSerialized = JSON.stringify(items);

  useEffect(() => {
    if (isGrouped) {
      registerLinks(paragraphId, items);
      return () => {
        unregisterLinks(paragraphId);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGrouped, registerLinks, unregisterLinks, paragraphId, itemsSerialized]);

  if (isGrouped) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return <StandaloneInPageLinks items={items} />;
}

function StandaloneInPageLinks({ items }: { items: LinkItem[] }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [isSticky, setIsSticky] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.targetId || null);

  const itemsSerialized = JSON.stringify(items.map((i) => i.href));

  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector("header");
      const currentHeaderHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;
      if (currentHeaderHeight > 0) setHeaderHeight(currentHeaderHeight);

      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const stickyState = rect.top <= currentHeaderHeight;
        setIsSticky(stickyState);
      }

      const currentScrollY = window.scrollY;
      const validTargetIds = items
        .map((item) => item.targetId)
        .filter((id): id is string => Boolean(id));

      if (validTargetIds.length > 0) {
        const inPageNavEl = wrapperRef.current?.querySelector(`.${styles.root}`);
        const inPageNavHeight = inPageNavEl ? inPageNavEl.getBoundingClientRect().height : 50;
        const scrollPosition = currentScrollY + currentHeaderHeight + inPageNavHeight + 40;
        let currentActiveId: string | null = null;

        for (const id of validTargetIds) {
          const element = document.getElementById(id);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentActiveId = id;
              break;
            }
          }
        }

        if (currentActiveId) {
          setActiveId(currentActiveId);
        }
      }
    };

    handleScroll();

    const headerEl = document.querySelector("header");
    let observer: ResizeObserver | null = null;
    if (headerEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        handleScroll();
      });
      observer.observe(headerEl);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSerialized]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: LinkItem) => {
    if (item.targetId) {
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const inPageNavEl = wrapperRef.current?.querySelector(`.${styles.root}`);
        const inPageNavHeight = inPageNavEl ? inPageNavEl.getBoundingClientRect().height : 50;
        const totalHeaderOffset = headerHeight + inPageNavHeight + 10;
        const offsetPosition = elementPosition - totalHeaderOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveId(item.targetId);
      }
    }
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}>
      <div
        className={clsx(
          styles.root,
          isSticky && styles.isSticky
        )}
        style={{ top: isSticky ? `${headerHeight}px` : undefined }}>
        <nav
          className={styles.nav}
          aria-label="In-page navigation">
          {items.map((item, index) => {
            const isActive = item.targetId ? activeId === item.targetId : index === 0;

            return (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item)}
                className={clsx(styles.link, isActive && styles.active)}>
                {item.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

