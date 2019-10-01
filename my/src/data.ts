import { AppContents } from './types';

/* eslint-disable import/prefer-default-export */
export const blankApplication: AppContents =
{
  _: {
    index: 0,
    reviews: {
      assignedTo: [],
      scores: [],
    },
    status: 'progress',
    time_initiated: new Date(),
    time_submitted: new Date(),
  },
  name: {
    first: '',
    last: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  first_submitted: new Date(),
  academics: {
    degree: '',
    major: '',
    graduating: '',
    school: '',
    year: '',
  },
  personal: {
    birthday: new Date(),
    gender: '',
    race: '',
  },
  emergency: {
    name: '',
    phone: '',
    relation: '',
  },
  documents: {
    download_link: '',
    filename: '',
    id: '',
  },
  profiles: {
    devpost: '',
    github: '',
    linkedin: '',
    website: '',
  },
  responses: {
    anything_else: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    workshops: [],
  },
  logistics: {
    discovered_by: '',
    diet_restrictions: '',
    shirt_size: '',
    traveling_from: '',
    hackathons_attended: 0,
  },
  resume: {
    filename: '',
    link: '',
  },
};
