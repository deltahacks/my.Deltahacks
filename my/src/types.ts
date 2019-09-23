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
    id?: number;
  };
  profiles: {
    devpost?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  responses: {
    q1?: string;
    q2?: string;
    q3?: string;
    q4?: string;
  };
  other: {
    discover: string;
    dietary_restrictions: string;
    shirt_size: "XS" | "S" | "M" | "L" | "XL";
    hackathons_attended: number;
  };
}
