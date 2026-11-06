/**
 * Bengaluru faculty page: the approved list (Bengaluru_Faculty_List_Final.xlsx).
 * Only these people show on /about-us/faculty/bengaluru. `drupalTitle` is the
 * faculty entry's exact title in Drupal; `program` fills the Specialization
 * dropdown; `designation` (from the sheet) decides Deans / Associate Deans / Faculty.
 */
export type BengaluruProgram = "pgdm" | "pgdm-rba" | "pgdm-bdi" | "pgdm-e-business" | "librarian";

/** Specialization dropdown entries, in display order. */
export const BENGALURU_PROGRAMS: { slug: BengaluruProgram; name: string }[] = [
  { slug: "pgdm", name: "PGDM" },
  { slug: "pgdm-rba", name: "PGDM-RBA" },
  { slug: "pgdm-bdi", name: "PGDM-BD&I" },
  { slug: "pgdm-e-business", name: "PGDM-E Business" },
  { slug: "librarian", name: "Librarian" },
];

export const BENGALURU_FACULTY: { drupalTitle: string; designation: string; program: BengaluruProgram }[] = [
  { drupalTitle: "Prof. Dr.Madhavi Lokhande", designation: "Director-Bengaluru Campus", program: "pgdm" },
  { drupalTitle: "Prof. Savitha G R", designation: "Dean-PGDM & HR", program: "pgdm" },
  { drupalTitle: "Prof.Jyoti Pant", designation: "Head-Conulting & Professor-HR", program: "pgdm" },
  { drupalTitle: "Prof. Preetha Chandran", designation: "Professor-Finance", program: "pgdm" },
  { drupalTitle: "Dr. P. Madhan Kumar", designation: "Assistant Professor-Research", program: "pgdm" },
  { drupalTitle: "Dr.Radhika Uttam", designation: "Assistant Professor-Finance", program: "pgdm" },
  { drupalTitle: "Mr. Satish K V", designation: "Assistant Professor-Marketing", program: "pgdm" },
  { drupalTitle: "Dr. T Viswanathan", designation: "Associate Dean-R&BA", program: "pgdm-rba" },
  { drupalTitle: "Prof. Sonia Mehrotra", designation: "Dean-Centre of Excellence for Case Development & Case Studies & Strategic Initiatives", program: "pgdm-rba" },
  { drupalTitle: "Dr. John Ben Prince", designation: "Associate Professor-Operations", program: "pgdm-rba" },
  { drupalTitle: "Dr. Rangappa Yaraddi", designation: "Associate Professor-Operations", program: "pgdm-rba" },
  { drupalTitle: "Dr. Alok Chakravarty", designation: "Associate Professor-R&BA", program: "pgdm-rba" },
  { drupalTitle: "Dr.Asha Mathew", designation: "Senior Manager-Quality System & Assistant Professor-General Mgt.", program: "pgdm-rba" },
  { drupalTitle: "Mr.Ragesh TS", designation: "Assistant Professor-R&BA", program: "pgdm-rba" },
  { drupalTitle: "Mr. Sridhar Chakravarthi Mulakaluri", designation: "Assistant Professor-General Management & Business design", program: "pgdm-rba" },
  { drupalTitle: "Mr.Prakash Unakal", designation: "Dean-Business Design", program: "pgdm-bdi" },
  { drupalTitle: "Prof. Hema Doreswamay", designation: "Dean-Finance", program: "pgdm-bdi" },
  { drupalTitle: "Dr Madhav Murthy", designation: "Assistant Professor-Business Design", program: "pgdm-bdi" },
  { drupalTitle: "Dr.Kiran G", designation: "Associate Professor-Marketing", program: "pgdm-bdi" },
  { drupalTitle: "Prof.Jai Raj Nair", designation: "Dean-PGDM-E business", program: "pgdm-e-business" },
  { drupalTitle: "Prof. D N Murthy", designation: "Dean - Marketing & Research", program: "pgdm-e-business" },
  { drupalTitle: "Prof. Anuradha Mahesh", designation: "Dean-Industry Collaboration", program: "pgdm-e-business" },
  { drupalTitle: "Dr.RA Dakshina Murthy", designation: "Dean - Academics", program: "pgdm-e-business" },
  { drupalTitle: "Dr.Anita Santhosh Pillai", designation: "Professor-IT & Controller of Examination Cell", program: "pgdm-e-business" },
  { drupalTitle: "Dr.Santosh Rupa Jaladi", designation: "Associate Professor-Finance", program: "pgdm-e-business" },
  { drupalTitle: "Dr. Manoharan S", designation: "Associate Professor-Marketing", program: "pgdm-e-business" },
  { drupalTitle: "Dr.Priyanka Sharma", designation: "Associate Professor - HR", program: "pgdm-e-business" },
  { drupalTitle: "Dr.Alex Nero", designation: "Assistant Professor-Operations", program: "pgdm-e-business" },
  { drupalTitle: "Dr. Ishani Chakraborty", designation: "Assistant Professor-HR", program: "pgdm-e-business" },
  { drupalTitle: "Mr.Ramanath Krishnamoorthy", designation: "Assistant Professor-Marketing Research", program: "pgdm-e-business" },
  { drupalTitle: "Mr. Navarun Bhattacharjee", designation: "Assistant Professor-Entreprenenurship & IIC", program: "pgdm-e-business" },
  { drupalTitle: "Ms.Srija Bose", designation: "General Manager-ADC & Assistant Professor- General Management", program: "pgdm-e-business" },
  { drupalTitle: "Mr.Rajakumar A", designation: "Librarian", program: "librarian" },
];
