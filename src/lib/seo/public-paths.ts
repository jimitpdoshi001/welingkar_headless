/**
 * SEO URL map: the current welingkar.org addresses (from its sitemap) and the
 * route of this site that renders the same page. The live address is the
 * public/canonical one: next.config rewrites it to the route, and internal
 * links use it. Live pages with no equivalent here are left out for now.
 *
 * [live address, internal route]
 */
export const PUBLIC_PATHS: [live: string, internal: string][] = [
  ["/who-we-are", "/about-us"],
  ["/campus-mumbai", "/campuses/mumbai"],
  ["/campus-bengaluru", "/campuses/bengaluru"],
  ["/career-management-centre-mumbai", "/corporate-interface/mumbai"],
  ["/career-management-centre-bengaluru", "/corporate-interface/bengaluru"],
  ["/mandatory-disclosures", "/mandatory-disclosure"],
  // MDP (Management Development Programs) pages use the MDC design.
  ["/programs/mdp", "/mdc"],
  ["/programs/mdp/bengaluru", "/mdc/bengaluru"],
  ["/testimonial", "/testimonials"],
  ["/grievance", "/grievance-redressal"],
  // WeFactor
  ["/we-factor", "/wefactor"],
  ["/we-factor/we-learn", "/wefactor/welearning"],
  ["/we-factor/we-innovate", "/wefactor/weinnovate"],
  ["/we-factor/we-entrepreneurship", "/wefactor/weentrepreneur"],
  ["/we-factor/we-lead", "/wefactor/welead"],
  ["/we-research-mumbai", "/weresearch"],
  ["/we-research-bengaluru", "/weresearch/bengaluru"],
  // Full-time programmes, Mumbai
  ["/programs/full-time-programme-in-mumbai", "/programs/mumbai"],
  ["/programs/full-time-programme-in-mumbai/pgdm", "/programs/pgdm"],
  ["/programs/full-time-programme-in-mumbai/pgdm-business-design", "/programs/pgdm-business-design"],
  ["/programs/full-time-programme-in-mumbai/pgdm-e-business", "/programs/pgdm-e-business"],
  ["/programs/full-time-programme-in-mumbai/pgdm-health-care-management", "/programs/pgdm-healthcare"],
  ["/programs/full-time-programme-in-mumbai/pgdm-media-and-entertainment", "/programs/pgdm-media"],
  ["/programs/full-time-programme-in-mumbai/pgdm-research-and-business-analytics", "/programs/pgdm-research-analytics"],
  ["/programs/full-time-programme-in-mumbai/pgdm-retail-management", "/programs/pgdm-retail"],
  ["/programs/full-time-programme-in-mumbai/pgdm-rural-management", "/programs/pgdm-rural"],
  ["/programs/full-time-programme-in-mumbai/masters-in-management-studies", "/programs/mms"],
  // Full-time programmes, Bengaluru
  ["/programs/full-time-programme-in-bengaluru", "/programs/bengaluru"],
  ["/programs/full-time-programme-in-bengaluru/pgdm", "/programs/pgdm/bengaluru"],
  ["/programs/full-time-programme-in-bengaluru/pgdm-business-design-and-innovation", "/programs/pgdm-business-design?campus=bengaluru"],
  ["/programs/full-time-programme-in-bengaluru/pgdm-e-business", "/programs/pgdm-e-business?campus=bengaluru"],
  ["/programs/full-time-programme-in-bengaluru/pgdm-research-and-business-analytics", "/programs/pgdm-research-analytics?campus=bengaluru"],
  // Executive, certificate and PhD
  ["/programs/executive-programme-in-mumbai/entrepreneurship-management", "/programs/pgp-entrepreneurship"],
  ["/programs/executive-programme-in-mumbai/media-and-entertainment-management", "/programs/pgp-media"],
  ["/programs/11-month-pg-6-month-certificate-programmes", "/programs/certificate"],
  ["/programs/phd-programme-in-mumbai", "/programs/phd"],
  ["/programs/phd-programme-in-mumbai/management-studies", "/programs/phd"],
];

const TO_PUBLIC = new Map<string, string>();
for (const [live, internal] of PUBLIC_PATHS) if (!TO_PUBLIC.has(internal)) TO_PUBLIC.set(internal, live);

/** Public (live) address for an internal route; other paths are returned unchanged. */
export function toPublicPath(href: string): string {
  // Drupal content still links to the old /programmes prefix; the site now uses /programs.
  href = href.replace(/^\/programmes(?=[/?#]|$)/, "/programs");
  const m = href.match(/^([^#]*)(#.*)?$/);
  const path = (m?.[1] ?? href).replace(/\/+$/, "") || "/";
  const live = TO_PUBLIC.get(path);
  if (live) return live + (m?.[2] ?? "");
  // Faculty profile (not the Bengaluru / inside listing pages).
  const profile = path.match(/^\/about-us\/faculty\/(?!bengaluru$|inside$)([^/?]+)$/);
  return profile ? `/profile/${profile[1]}${m?.[2] ?? ""}` : href;
}

/** Faculty profiles: live /profile/<slug> = /about-us/faculty/<slug>. */
export const PROFILE_PREFIX = { live: "/profile", internal: "/about-us/faculty" };

/** Page metadata canonical: always the public (live-site) address. */
export function canonical(internalPath: string): { alternates: { canonical: string } } {
  return { alternates: { canonical: toPublicPath(internalPath) } };
}
