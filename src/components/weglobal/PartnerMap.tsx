import type { WgPartner } from "@/lib/weglobal/weglobal-data";
import styles from "./WeGlobalPage.module.scss";

// Figma 2568:* map artboard: 1240x667, world map at (41, 53.28) sized 1120.79x613.72.
const VIEW_W = 1240;
const VIEW_H = 667;
const MAP = { x: 41, y: 53.28, w: 1120.79, h: 613.72 };

// Label text metrics from Figma: 14.46px SemiBold title, 10.85px lines 14px apart.
const TEXT_X = 13.6;
const TITLE_BASELINE = 22.5;
const LINE_STEP = 14;

type Props = { map: string; items: WgPartner[]; title: string };

// Partner universities map: purple labels joined to green city dots by hairline connectors.
export function PartnerMap({ map, items, title }: Props) {
  return (
    <div className={styles.mapScroll}>
      <svg
        className={styles.map}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`${title}: ${items.map((p) => p.title).join(", ")}`}>
        <image href={map} x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} />

        {items.map((p) => (
          <g key={p.id}>
            <polyline
              points={p.path.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke="#000"
              strokeWidth={0.9}
            />
            <circle cx={p.dot[0]} cy={p.dot[1]} r={4.07} fill="#3A9030" />
            <rect x={p.box.x} y={p.box.y} width={p.box.w} height={p.box.h} rx={9.04} fill="#493460" />
            <text x={p.box.x + TEXT_X} y={p.box.y + TITLE_BASELINE} className={styles.mapTitle}>
              {p.title}
            </text>
            {p.lines.map((line, i) => (
              <text
                key={line}
                x={p.box.x + TEXT_X}
                y={p.box.y + TITLE_BASELINE + LINE_STEP * (i + 1)}
                className={styles.mapLine}>
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default PartnerMap;
