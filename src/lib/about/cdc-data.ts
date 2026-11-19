/**
 * College Development Committee members (from the supplied design screenshot).
 * No Drupal content type exists for this yet; swap for a fetch once it does.
 */
export type CdcMember = { name: string; designation: string; role: string };

export const CDC_INTRO = { title: "College Development Committee" };

export const CDC_MEMBERS: CdcMember[] = [
  { name: "Shri. Sunil Joshi", designation: "Member, Managing Council, S.P.M.", role: "Chairman" },
  { name: "Shri. Sudhir Kalkar", designation: "Chairman, Managing Council, S.P.M.", role: "Member" },
  { name: "Shri. Radhesham Bajranglal Agrawal", designation: "Vice Chairman, Managing Council, S.P.M.", role: "Member" },
  { name: "Shri. Vivek V. Nayak", designation: "Member, Managing Council, S.P.M.", role: "Member" },
  { name: "Shri. Naveen Dasari", designation: "Member, Managing Council, S.P.M.", role: "Member" },
  { name: "Prof. Dr. Pankaj R. Natu", designation: "Director", role: "Member Secretary" },
  { name: "Prof. Dr. Suhas Dhande", designation: "Nominated by HOI", role: "Member" },
  { name: "Dr. Arati Kale", designation: "Nominated by HOI", role: "Member" },
  { name: "Shri. Shekhar More", designation: "Representative – Non-Teaching Staff", role: "Member" },
  { name: "Mr. Pramod Mulik", designation: "Chief Financial Officer", role: "Special Invitee" },
];
