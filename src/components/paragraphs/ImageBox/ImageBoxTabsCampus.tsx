"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ResponsiveMedia } from "../ResponsiveMedia/ResponsiveMedia";
import type { ImageBoxProps } from "./ImageBox";
import styles from "./ImageBoxTabsCampus.module.scss";

type TabData = {
  id: string;
  label: string;
};

type ImageBoxTabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerTab: (id: string, label: string) => void;
  tabs: TabData[];
};

const ImageBoxTabsContext = createContext<ImageBoxTabsContextType | null>(null);

function GreenArrow() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: "1rem", flexShrink: 0 }}>
      <path
        d="M10 6L0 12L0 0L10 6Z"
        fill="var(--color-primary, #329638)"
      />
    </svg>
  );
}

export function ImageBoxTabsCampusGroup({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabs, setTabs] = useState<TabData[]>([]);

  const registerTab = useCallback((id: string, label: string) => {
    setTabs((prev) => {
      if (prev.some((t) => t.id === id && t.label === label)) return prev;
      const filtered = prev.filter((t) => t.id !== id);
      return [...filtered, { id, label }];
    });
  }, []);

  const contextValue = useMemo(
    () => ({ activeIndex, setActiveIndex, registerTab, tabs }),
    [activeIndex, setActiveIndex, registerTab, tabs]
  );

  return (
    <ImageBoxTabsContext.Provider value={contextValue}>
      <div className={styles.groupWrapper}>{children}</div>
    </ImageBoxTabsContext.Provider>
  );
}

export default function ImageBoxTabsCampus({ paragraph, image, responsiveMedia, children }: ImageBoxProps) {
  const context = useContext(ImageBoxTabsContext);
  const registerTab = context?.registerTab;
  const id = paragraph.id;
  const heading = paragraph.attributes.field_header || null;
  const description = paragraph.attributes.field_description?.processed || null;
  const tabLabel =
    paragraph.attributes.field_image_description ||
    paragraph.attributes.field_link?.title ||
    heading ||
    "Tab";
  const hasMedia = Boolean(responsiveMedia || image);

  useEffect(() => {
    if (registerTab) {
      registerTab(id, tabLabel);
    }
  }, [registerTab, id, tabLabel]);

  const tabs = context?.tabs || [];
  const itemIndex = tabs.findIndex((t) => t.id === id);
  const activeIndex = context?.activeIndex ?? 0;
  const isActive = itemIndex === -1 ? true : itemIndex === activeIndex;

  if (!isActive) return null;

  return (
    <div className={styles.card}>
      {hasMedia && (
        <div className={styles.media}>
          {responsiveMedia && (
            <ResponsiveMedia
              media={responsiveMedia}
              fill
              className={styles.mediaFill}
            />
          )}

          {image && !responsiveMedia && (
            <Image
              src={image.url}
              alt={image.alt || heading || ""}
              fill
              className={styles.mediaFill}
              sizes="(max-width: 767px) 100vw, 90vw"
            />
          )}
        </div>
      )}

      <div className={styles.overlay} />

      <div className={styles.content}>
        {heading ? <h2 className={styles.heading}>{heading}</h2> : null}

        {description ? (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {children}

        {tabs.length > 0 && (
          <div className={styles.tabList}>
            {tabs.map((tab, idx) => {
              const isTabActive = idx === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => context?.setActiveIndex(idx)}
                  className={clsx(styles.tabBtn, isTabActive && styles.activeTab)}>
                  <span>{tab.label}</span>
                  {isTabActive && <GreenArrow />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
