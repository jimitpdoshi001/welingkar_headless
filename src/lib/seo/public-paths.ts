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
  ["/programmes/mdp", "/mdc"],
  ["/programmes/mdp/bengaluru", "/mdc/bengaluru"],
  ["/testimonial", "/testimonials"],
  ["/grievance", "/grievance-redressal"],
  // WeFactor
  ["/we-factor", "/wefactor"],
  ["/we-factor/we-learn", "/wefactor/welearning"],
  ["/we-factor/we-innovate", "/wefactor/weinnovate"],
  ["/we-factor/we-entrepreneurship", "/wefactor/weentrepreneur"],
  ["/we-factor/we-lead", "/wefactor/welead"],
  ["/we-research-mumbai", "/weresearch"],
  // Full-time programmes, Mumbai
  ["/programmes/full-time-programme-in-mumbai", "/programmes/mumbai"],
  ["/programmes/full-time-programme-in-mumbai/pgdm", "/programmes/pgdm"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-business-design", "/programmes/pgdm-business-design"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-e-business", "/programmes/pgdm-e-business"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-health-care-management", "/programmes/pgdm-healthcare"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-media-and-entertainment", "/programmes/pgdm-media"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-research-and-business-analytics", "/programmes/pgdm-research-analytics"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-retail-management", "/programmes/pgdm-retail"],
  ["/programmes/full-time-programme-in-mumbai/pgdm-rural-management", "/programmes/pgdm-rural"],
  ["/programmes/full-time-programme-in-mumbai/masters-in-management-studies", "/programmes/mms"],
  // Full-time programmes, Bengaluru
  ["/programmes/full-time-programme-in-bengaluru", "/programmes/bengaluru"],
  ["/programmes/full-time-programme-in-bengaluru/pgdm", "/programmes/pgdm/bengaluru"],
  ["/programmes/full-time-programme-in-bengaluru/pgdm-business-design-and-innovation", "/programmes/pgdm-business-design?campus=bengaluru"],
  ["/programmes/full-time-programme-in-bengaluru/pgdm-e-business", "/programmes/pgdm-e-business?campus=bengaluru"],
  ["/programmes/full-time-programme-in-bengaluru/pgdm-research-and-business-analytics", "/programmes/pgdm-research-analytics?campus=bengaluru"],
  // Executive, certificate and PhD
  ["/programmes/executive-programme-in-mumbai/entrepreneurship-management", "/programmes/pgp-entrepreneurship"],
  ["/programmes/executive-programme-in-mumbai/media-and-entertainment-management", "/programmes/pgp-media"],
  ["/programmes/11-month-pg-6-month-certificate-programmes", "/programmes/certificate"],
  ["/programmes/phd-programme-in-mumbai", "/programmes/phd"],
  ["/programmes/phd-programme-in-mumbai/management-studies", "/programmes/phd"],
];

const TO_PUBLIC = new Map<string, string>();
for (const [live, internal] of PUBLIC_PATHS) if (!TO_PUBLIC.has(internal)) TO_PUBLIC.set(internal, live);

/** Public (live) address for an internal route; other paths are returned unchanged. */
export function toPublicPath(href: string): string {
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
