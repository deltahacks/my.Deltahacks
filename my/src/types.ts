export interface ApplicationModel {
  name: {
    first: string;
    last: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  first_submitted: Date;
  academics: {
    degree: "Bachelors" | "Masters" | "PhD";
    major: string;
    graduating: string,
    school: string;
    year:
      | "First Year"
      | "Second Year"
      | "Third Year"
      | "Fourth Year"
      | "Fifth Year"
      | "Sixth Year";
  };
  personal: {
    birthday: Date;
    gender: "M" | "F" | "O";
    race:
      | "Black / African American"
      | "Hispanic"
      | "East Asian"
      | "South Asian"
      | "Middle Eastern"
      | "Native American"
      | "White / Caucasian"
      | "Multiple ethnicity / Other"
      | "Prefer not to say";
  };
  emergency: {
    name: string;
    phone: string;
    relation:
      | "Parent"
      | "Grandparent"
      | "Sibling"
      | "Partner"
      | "Friend"
      | "Guardian"
      | "Other";
  };
  documents: {
    download_link?: string;
    filename?: string;
    id?: string;
  };
  profiles: {
    devpost?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  responses: {
    anything_else?: string;
    q1?: string;
    q2?: string;
    q3?: string;
    q4?: string;
    workshops?: Array<string>;
  };
  logistics: {
    discovered_by: string;
    diet_restrictions: string;
    shirt_size: "XS" | "S" | "M" | "L" | "XL";
    traveling_from: string;
    hackathons_attended: number;
  };
  resume: {
    filename: string;
    link: string;
  }
}
