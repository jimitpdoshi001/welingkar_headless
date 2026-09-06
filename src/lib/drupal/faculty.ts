import { jsonApiUrl } from "./jsonapi";
import type { JsonApiDocument, JsonApiResource } from "./types";

export type FacultyCategory = {
  id: string;
  name: string;
  slug: string;
};

export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  department?: string;
  categorySlug: string;
  image: string;
  imageAlt?: string;
  link?: string;
};

export const DEFAULT_FACULTY_CATEGORIES: FacultyCategory[] = [
  { id: "cat-1", name: "Deans", slug: "deans" },
  { id: "cat-2", name: "Associate deans & heads", slug: "associate-deans" },
  { id: "cat-3", name: "Faculty", slug: "faculty" },
  { id: "cat-4", name: "Specialization", slug: "specialization" },
];

export const DEFAULT_FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Prof Jai Raj Nair",
    designation: "Professor",
    department: "Information Technology",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof Jai Raj Nair",
    link: "/faculty/prof-jai-raj-nair",
  },
  {
    id: "fac-2",
    name: "Dr. Kiran G",
    designation: "Associate Professor",
    department: "Marketing",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Dr. Kiran G",
    link: "/faculty/dr-kiran-g",
  },
  {
    id: "fac-3",
    name: "Radhika Uttam",
    designation: "Assistant Professor",
    department: "Finance",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Radhika Uttam",
    link: "/faculty/radhika-uttam",
  },
  {
    id: "fac-4",
    name: "Prof. Sonia Mehrotra",
    designation: "Professor",
    department: "Centre of Excellence",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof. Sonia Mehrotra",
    link: "/faculty/prof-sonia-mehrotra",
  },
  {
    id: "fac-5",
    name: "Prof. Mudumita",
    designation: "Professor",
    department: "Centre of Excellence",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof. Mudumita",
    link: "/faculty/prof-mudumita",
  },
  {
    id: "fac-6",
    name: "Prof. Sonia Mehrotra",
    designation: "Professor",
    department: "Centre of Excellence for Case Development & Case Studies (Mumbai/Bangalore)",
    categorySlug: "faculty",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof. Sonia Mehrotra",
    link: "/faculty/prof-sonia-mehrotra-2",
  },
  {
    id: "fac-7",
    name: "Dr. Uday Salunkhe",
    designation: "Group Director",
    department: "Leadership & Strategy",
    categorySlug: "deans",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Dr. Uday Salunkhe",
    link: "/faculty/dr-uday-salunkhe",
  },
  {
    id: "fac-8",
    name: "Prof. Dr. Pradeep Pendse",
    designation: "Dean",
    department: "Academics & IT",
    categorySlug: "deans",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof. Dr. Pradeep Pendse",
    link: "/faculty/prof-pradeep-pendse",
  },
  {
    id: "fac-9",
    name: "Dr. Kaustubh Dhargalkar",
    designation: "Associate Dean",
    department: "Design Thinking & Innovation",
    categorySlug: "associate-deans",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Dr. Kaustubh Dhargalkar",
    link: "/faculty/dr-kaustubh-dhargalkar",
  },
  {
    id: "fac-10",
    name: "Prof. Deepa Dixit",
    designation: "Head of Department",
    department: "Healthcare Management",
    categorySlug: "associate-deans",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Prof. Deepa Dixit",
    link: "/faculty/prof-deepa-dixit",
  },
  {
    id: "fac-11",
    name: "Dr. Sandeep Sharma",
    designation: "Specialist",
    department: "Data Analytics & AI",
    categorySlug: "specialization",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Dr. Sandeep Sharma",
    link: "/faculty/dr-sandeep-sharma",
  },
];

export async function getFacultyCategories(): Promise<FacultyCategory[]> {
  try {
    const url = jsonApiUrl("/taxonomy_term/faculty_category", {
      sort: "weight,name",
    });
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const document = (await res.json()) as JsonApiDocument<JsonApiResource>;
      const terms = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
      if (terms.length > 0) {
        return terms.map((term) => {
          const name = (term.attributes.name as string) || "Category";
          return {
            id: term.id,
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          };
        });
      }
    }
  } catch {
    // Return default categories if fetch fails or network is offline
  }

  return DEFAULT_FACULTY_CATEGORIES;
}

export async function getFacultyMembers(): Promise<FacultyMember[]> {
  try {
    const url = jsonApiUrl("/node/faculty", {
      include: "field_image,field_media_image,field_category",
      "filter[status]": "1",
      sort: "title",
    });
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const document = (await res.json()) as JsonApiDocument<JsonApiResource>;
      const nodes = Array.isArray(document.data) ? document.data : document.data ? [document.data] : [];
      if (nodes.length > 0) {
        return nodes.map((node, index) => {
          const attributes = node.attributes as Record<string, unknown>;
          const name = (attributes.title as string) || `Faculty Member ${index + 1}`;
          const designation = (attributes.field_designation as string) || "Faculty Member";
          const department = (attributes.field_department as string) || "";
          const pathAlias = (attributes.path as { alias?: string })?.alias;
          const link = pathAlias || `/faculty/${node.id}`;

          return {
            id: node.id,
            name,
            designation,
            department,
            categorySlug: "faculty",
            image: DEFAULT_FACULTY_MEMBERS[index % DEFAULT_FACULTY_MEMBERS.length].image,
            imageAlt: name,
            link,
          };
        });
      }
    }
  } catch {
    // Return default faculty members if fetch fails or network is offline
  }

  return DEFAULT_FACULTY_MEMBERS;
}
