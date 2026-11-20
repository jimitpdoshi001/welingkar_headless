/**
 * Accreditation documents (from the visible sections of the current site's
 * Mandatory Disclosures page, minus the Mandatory Disclosure section, which
 * has its own page). PDFs are copied into /public/accreditation/docs.
 */
import type { DisclosureGroup } from "./statutory-data";

export type AccreditationSection = { id: string; title: string; groups: DisclosureGroup[] };

export const ACCREDITATION_SECTIONS: AccreditationSection[] = [
  {
    "id": "aicte-approvals",
    "title": "AICTE Approvals",
    "groups": [
      {
        "title": "Mumbai",
        "links": [
          {
            "label": "EOA 2026 (PGDM)",
            "href": "/accreditation/docs/eoa-report-2026-2027-pgdm.pdf"
          },
          {
            "label": "EOA 2026 (MMS)",
            "href": "/accreditation/docs/eoa-report-2026-2027-mms.pdf"
          },
          {
            "label": "EOA 2025 (PGDM)",
            "href": "/accreditation/docs/eoa-report-2025-26-pgdm.pdf"
          },
          {
            "label": "EOA 2025 (MMS)",
            "href": "/accreditation/docs/eoa-report-2025-2026-mms.pdf"
          },
          {
            "label": "EOA 2024 (PGDM)",
            "href": "/accreditation/docs/eoa-report-2024-25-pgdm.pdf"
          },
          {
            "label": "EOA 2024 (MMS)",
            "href": "/accreditation/docs/eoa-report-2024-25-mms.pdf"
          },
          {
            "label": "EOA 2023 (PGDM)",
            "href": "/accreditation/docs/eoa-report-2023-24---pgdm.pdf"
          },
          {
            "label": "EOA 2023 (MMS)",
            "href": "/accreditation/docs/eoa-report-2023-24---mms.pdf"
          },
          {
            "label": "EOA 2022 (PGDM)",
            "href": "/accreditation/docs/eoa-report-22-23.pdf"
          },
          {
            "label": "EOA 2022 (MMS)",
            "href": "/accreditation/docs/eoa-report-22-23-mms.pdf"
          },
          {
            "label": "EOA 2021 PGDM",
            "href": "/accreditation/docs/eoa-2021-pgdm.pdf"
          },
          {
            "label": "EOA 2021 MMS",
            "href": "/accreditation/docs/eoa_report_21-22_mms.pdf"
          },
          {
            "label": "EOA 2020 PGDM",
            "href": "/accreditation/docs/eoa-2020-pgdm.pdf"
          },
          {
            "label": "EOA 2020 MMS",
            "href": "/accreditation/docs/eoa-2020-mms.pdf"
          },
          {
            "label": "EOA 2019",
            "href": "/accreditation/docs/eoa-2019.pdf"
          },
          {
            "label": "EOA 2018",
            "href": "/accreditation/docs/eoa-2018.pdf"
          },
          {
            "label": "EOA 2017",
            "href": "/accreditation/docs/eoa-2017.pdf"
          },
          {
            "label": "EOA 2016",
            "href": "/accreditation/docs/eoa-2016.pdf"
          },
          {
            "label": "EOA 2015",
            "href": "/accreditation/docs/eoa-2015.pdf"
          },
          {
            "label": "EOA 2014",
            "href": "/accreditation/docs/eoa-2014.pdf"
          },
          {
            "label": "EOA 2013",
            "href": "/accreditation/docs/eoa-2013.pdf"
          },
          {
            "label": "EOA 2012",
            "href": "/accreditation/docs/eoa-2012.pdf"
          },
          {
            "label": "EOA 2011",
            "href": "/accreditation/docs/extension_of_approval_letter_2011-12.pdf"
          },
          {
            "label": "EOA 2010",
            "href": "/accreditation/docs/eoa-2010.pdf"
          },
          {
            "label": "EOA 2009 PIO Quota",
            "href": "/accreditation/docs/eoa-2009-pio-quota.pdf"
          },
          {
            "label": "EOA 2009",
            "href": "/accreditation/docs/eoa-2009.pdf"
          },
          {
            "label": "EOA 2008 PIO Quota",
            "href": "/accreditation/docs/eoa-2008-pio-quota.pdf"
          },
          {
            "label": "EOA 2008",
            "href": "/accreditation/docs/eoa-2008.pdf"
          },
          {
            "label": "EOA 2007",
            "href": "/accreditation/docs/eoa-2007.pdf"
          },
          {
            "label": "EOA 2006 Corrigendum PT Masters",
            "href": "/accreditation/docs/eoa-2006-corrigendum-pt-masters.pdf"
          },
          {
            "label": "EOA 2006",
            "href": "/accreditation/docs/eoa-2006.pdf"
          },
          {
            "label": "EOA 2005 MMS",
            "href": "/accreditation/docs/eoa-2005-mms.pdf"
          },
          {
            "label": "EOA 2005",
            "href": "/accreditation/docs/eoa-2005.pdf"
          },
          {
            "label": "EOA 2004 PIO Quota",
            "href": "/accreditation/docs/eoa-2004-pio-quota.pdf"
          },
          {
            "label": "EOA 2004 PGDM",
            "href": "/accreditation/docs/eoa-2004-pgdm.pdf"
          },
          {
            "label": "EOA 2004",
            "href": "/accreditation/docs/eoa-2004.pdf"
          },
          {
            "label": "EOA 2002 PGDM and PT Masters",
            "href": "/accreditation/docs/eoa-2002-pgdm-and-pt-masters.pdf"
          },
          {
            "label": "EOA 2002-2004 MMS",
            "href": "/accreditation/docs/eoa-2002-2004-mms.pdf"
          },
          {
            "label": "EOA 2001",
            "href": "/accreditation/docs/eoa-2001.pdf"
          },
          {
            "label": "EOA 2000",
            "href": "/accreditation/docs/eoa-2000.pdf"
          },
          {
            "label": "EOA 1999",
            "href": "/accreditation/docs/eoa-1999.pdf"
          },
          {
            "label": "EOA 1998",
            "href": "/accreditation/docs/eoa-1998.pdf"
          },
          {
            "label": "EOA 1995",
            "href": "/accreditation/docs/eoa-1995.pdf"
          },
          {
            "label": "EOA 1994",
            "href": "/accreditation/docs/eoa-1994.pdf"
          }
        ]
      },
      {
        "title": "Bengaluru",
        "links": [
          {
            "label": "EOA Report 2026-27",
            "href": "/accreditation/docs/eoa_report_2026-27.pdf"
          },
          {
            "label": "EOA Report 25-26",
            "href": "/accreditation/docs/eoa_report_2025-26.pdf"
          },
          {
            "label": "EOA-Report 24-25",
            "href": "/accreditation/docs/eoa-report-2024-2025.pdf"
          },
          {
            "label": "EOA-Report 23-24",
            "href": "/accreditation/docs/eoa-report-2023-24.pdf"
          },
          {
            "label": "EOA-Report 22-23",
            "href": "/accreditation/docs/eoa-report-22-23-48.pdf"
          },
          {
            "label": "Bengaluru AICTE approvals",
            "href": "/accreditation/docs/aicte-eoa-2008-to-2020.pdf"
          },
          {
            "label": "AICTE Approval letter 2021-2022",
            "href": "/accreditation/docs/eoa-2021-22.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "nirf",
    "title": "NIRF",
    "groups": [
      {
        "title": "Mumbai",
        "links": [
          {
            "label": "NIRF Functional Email Address: ragini.m@welingkar.org",
            "href": "mailto:ragini.m@welingkar.org"
          },
          {
            "label": "NIRF 2026 Submitted Institute Data (Management)",
            "href": "/accreditation/docs/nirf-2026-submitted-institute-data.pdf"
          }
        ]
      },
      {
        "title": "Bengaluru",
        "links": [
          {
            "label": "NIRF Functional Email Address: asha.mathew@welingkar.org",
            "href": "mailto:asha.mathew@welingkar.org"
          },
          {
            "label": "NIRF Management 2026",
            "href": "/accreditation/docs/nirf_management_2026.pdf"
          },
          {
            "label": "NIRF Innovation 2025",
            "href": "/accreditation/docs/innovation_2025.pdf"
          },
          {
            "label": "NIRF Innovation 2024",
            "href": "/accreditation/docs/innovation_2024.pdf"
          },
          {
            "label": "NIRF Management 2025 (Management Category DCS Report)",
            "href": "/accreditation/docs/management_2025.pdf"
          },
          {
            "label": "NIRF Management 2024 (Management Category DCS Report)",
            "href": "/accreditation/docs/management_2024.pdf"
          },
          {
            "label": "NIRF SDG 2025 (Management Category DCS Report)",
            "href": "/accreditation/docs/sdg_2025.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "aiu-equivalence",
    "title": "AIU Equivalence",
    "groups": [
      {
        "title": "Mumbai: PGDM",
        "links": [
          {
            "label": "PGDM Equivalence for AY 2025 to 2030",
            "href": "/accreditation/docs/pgdm-equivalence-for-ay-2025-2030.pdf"
          },
          {
            "label": "PGDM Equivalence for AY 2022 to 2025",
            "href": "/accreditation/docs/pgdm-equivalence-for-ay-2022-to-2025.pdf"
          },
          {
            "label": "PGDM Equivalence approval AY 2017-19",
            "href": "/accreditation/docs/aiu-pgdm.pdf"
          },
          {
            "label": "PGDM Equivalence for AY 2013 to 2016",
            "href": "/accreditation/docs/pgdm_aiu_approval_for_ay_2013to2016.pdf"
          },
          {
            "label": "PGDM Equivalence for AY 2008 to 2013",
            "href": "/accreditation/docs/pgdm_aiu_approval_for_ay_2008to2013.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM Business Design",
        "links": [
          {
            "label": "PGDM Business Design Equivalence for AY 2025 to 2030",
            "href": "/accreditation/docs/pgdm-business-design-equivalence-for-ay-2025-2030.pdf"
          },
          {
            "label": "PGDM Business Design Equivalence for AY 2022 to 2025",
            "href": "/accreditation/docs/pgdm-business-design-equivalence-for-ay-2022-to-2025.pdf"
          },
          {
            "label": "PGDM Business Design Equivalence for AY 2017-19",
            "href": "/accreditation/docs/aiu-pgdm-business-design.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM E-business",
        "links": [
          {
            "label": "PGDM E -Business Equivalence for AY 2025 to 2030",
            "href": "/accreditation/docs/pgdm-ebusiness-equivalence-for-ay-2025-2030.pdf"
          },
          {
            "label": "PGDM E -Business Equivalence for AY 2022 to 2025",
            "href": "/accreditation/docs/pgdm-e--business-equivalence-for-ay-2022-to-2025.pdf"
          },
          {
            "label": "PGDM E Business Equivalence for AY 2017-19",
            "href": "/accreditation/docs/aiu-pgdm-ebusiness.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM Healthcare",
        "links": [
          {
            "label": "PGDM Healthcare Equivalence from AY 2026-30",
            "href": "/accreditation/docs/pgdm-healthcare-equivalence-from-ay-2026-to-2030.pdf"
          },
          {
            "label": "PGDM Healthcare Equivalence from AY 2023-26",
            "href": "/accreditation/docs/pgdm-healthcare-equivalence-from-ay-2023-26.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM Retail Management",
        "links": [
          {
            "label": "PGDM Retail Management Equivalence from AY 2026-2030",
            "href": "/accreditation/docs/pgdm-retail-management-equivalence-from-ay-2026-to-2030.pdf"
          },
          {
            "label": "PGDM Retail Management Equivalence from AY 2023-2026",
            "href": "/accreditation/docs/pgdm-retail-management-equivalence-from-ay-2023-2026.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM Rural Management",
        "links": [
          {
            "label": "PGDM Rural Management Equivalence from AY 2026-30",
            "href": "/accreditation/docs/pgdm-rural-management-equivalence-from-ay-2026-to-2030.pdf"
          },
          {
            "label": "PGDM Rural Management Equivalence from AY 2023-26",
            "href": "/accreditation/docs/pgdm-rural-management-equivalence-from-ay-2023-26.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM Media and Entertainment",
        "links": [
          {
            "label": "PGDM Media and Entertainment Equivalence from AY 2024-27",
            "href": "/accreditation/docs/pgdm_media_-_entertainment_equivalence_for_ay_2024-27.pdf"
          }
        ]
      },
      {
        "title": "Mumbai: PGDM RESEARCH & BUSINESS ANALYTICS",
        "links": [
          {
            "label": "PGDM Reseach & Business Analytics Equivalence from AY 2024-27",
            "href": "/accreditation/docs/pgdm_research_-_business_analytics_equivalence_for_ay_2024-27.pdf"
          }
        ]
      },
      {
        "title": "Bengaluru",
        "links": [
          {
            "label": "AIU Approval for the AY 2024-25 to 2028-29 - All Programs",
            "href": "/accreditation/docs/aiu_approval_for_the_ay_2024-25_to_2028-29-all_programs.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "ariia",
    "title": "ARIIA",
    "groups": [
      {
        "title": "",
        "links": [
          {
            "label": "ARIIA Mumbai",
            "href": "/accreditation/docs/ariia-report-mumbai-2021-ari-c-34129-2020-21-mumbai.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "saqs",
    "title": "SAQS Accreditation",
    "groups": [
      {
        "title": "",
        "links": [
          {
            "label": "SAQS Accreditation Certificate 2025 to 2030 - WeSchool, Mumbai",
            "href": "/accreditation/docs/saqs-accreditation-certificate-2025-to-2030-weschool-mumbai.pdf"
          },
          {
            "label": "SAQS Approval for the AY April 2019 to April 2024",
            "href": "/accreditation/docs/saqs-accreditation.pdf"
          },
          {
            "label": "SAQS Accreditation Certificate Nov. 2024 to Nov. 2029 - WeSchool, Bengaluru",
            "href": "/accreditation/docs/saqs-accreditation-certificate-nov-2024-to-nov-2029-weschool-bengaluru.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "nba",
    "title": "NBA",
    "groups": [
      {
        "title": "PGDM Mumbai",
        "links": [
          {
            "label": "PGDM, PGDM EBusiness, PGDM Business Design Accreditation letter (AY 2025-28)",
            "href": "/accreditation/docs/pgdm-pgdm-ebusiness-and-pgdm-business-design-accreditation-letter-from-ay-2025---28-.pdf"
          },
          {
            "label": "PGDM_RBA_and_Media_Accreditation_letter_A.Y._(2024-2027)",
            "href": "/accreditation/docs/pgdm_rba_and_media_accreditation_letter_a.y._-2024-2027-.pdf"
          },
          {
            "label": "PGDM - Retail, PGDM - Rural and PGDM Healthcare Accreditation letter A.Y.(2023 -26)",
            "href": "/accreditation/docs/nba-accreditation-for-pgdm-retail-rural-and-healthcare-programs.pdf"
          },
          {
            "label": "PGDM, PGDM EBusiness, PGDM Business Design Accreditation letter (AY 2022 -2025)",
            "href": "/accreditation/docs/pgdm-pgdm-ebusiness-pgdm-business-design-accreditation-letter-ay-2022--2025-.pdf"
          },
          {
            "label": "PGDM, PGDM EBusiness, PGDM Business Design Accreditation letter (AY 2017-19)",
            "href": "/accreditation/docs/nba-accreditation-for-ay-2017-2019.pdf"
          },
          {
            "label": "NBA Accreditation Status (PGDM)",
            "href": "/accreditation/docs/nba-accreditation-status-pgdm-.pdf"
          }
        ]
      },
      {
        "title": "Balance Sheet - Mumbai",
        "links": [
          {
            "label": "Balance Sheet for 2025-26",
            "href": "/accreditation/docs/balance-sheet-nba-2025-26.pdf"
          },
          {
            "label": "Balance Sheet for 2024-25",
            "href": "/accreditation/docs/balance-sheet-nba-2024-25.pdf"
          },
          {
            "label": "Balance Sheet for 2023-24",
            "href": "/accreditation/docs/balance-sheet-nba-2023-24.pdf"
          }
        ]
      },
      {
        "title": "MMS Mumbai",
        "links": [
          {
            "label": "MMS NBA Accreditation Letter (A.Y. 2026-28)",
            "href": "/accreditation/docs/mms-nba-accreditation-letter-ay-2026-28.pdf"
          },
          {
            "label": "MMS NBA Accreditation Letter(A.Y 2022 -2025)",
            "href": "/accreditation/docs/mms-nba-accreditation-letter-a.y-2022--2025-.pdf"
          }
        ]
      },
      {
        "title": "Bengaluru",
        "links": [
          {
            "label": "PGDM, PGDM E Business and PGDM RBA Accreditation letter",
            "href": "/accreditation/docs/pgdm-and-pgdm-e-business-accreditation-letter.pdf"
          },
          {
            "label": "PGDM BD& I NBA Accreditation Letter Bengaluru",
            "href": "/accreditation/docs/nba-bd-i-accreditation-letter-2024-27.pdf"
          },
          {
            "label": "NBA Accreditation Status Bengaluru",
            "href": "/accreditation/docs/nba_accreditation_status.pdf"
          }
        ]
      }
    ]
  },
  {
    "id": "acbsp",
    "title": "ACBSP accreditation",
    "groups": [
      {
        "title": "",
        "links": [
          {
            "label": "ACBSP",
            "href": "/accreditation/docs/acbsp-students-achievements.pdf"
          }
        ]
      }
    ]
  }
];

export type AccreditationCampus = "mumbai" | "bengaluru";

/** Side menu for one campus page: every accreditation section. */
export const accreditationNav = (campus: AccreditationCampus) =>
  ACCREDITATION_SECTIONS.map((s) => ({ label: s.title, href: `/accreditation/${campus}?section=${s.id}` }));

/**
 * Groups for one campus: titled groups naming the campus (prefix "Mumbai: "
 * dropped), plus untitled groups, which apply to both campuses.
 */
export function campusGroups(section: AccreditationSection, campus: AccreditationCampus): DisclosureGroup[] {
  const name = campus === "mumbai" ? "Mumbai" : "Bengaluru";
  return section.groups
    .filter((g) => !g.title || new RegExp(`\\b${name}\\b`, "i").test(g.title))
    .map((g) => ({ ...g, title: g.title.replace(new RegExp(`^${name}(:\\s*|$)`, "i"), "") }));
}
