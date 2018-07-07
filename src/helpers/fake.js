import faker from 'faker';

const unis = ['Waterloo', 'U Toronto', 'York U', 'McMaster', 'Guelph', 'Queens', 'UBC', 'McGill'];
const {
  items, hackathons, food, shirts,
} = {
  items: [
    'First Year',
    'Second Year',
    'Third Year',
    'Forth Year',
    'Fifth Year',
  ],
  hackathons: ['This is my first one', '2', '3', '5+', '10+'],
  food: ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten Free', 'Kosher'],
  shirts: ['XS', 'S', 'M', 'L', 'XL'],
};

function generateApp(email, emergencyPhone, name, story, university) {
  const applicationDate = faker.date.recent();
  return {
    dietry_restrictions: food[Math.floor(Math.random() * items.length)],
    email,
    emergency_phone: emergencyPhone,
    github: 'https://github.com/johndoe',
    hackathons: hackathons[Math.floor(Math.random() * items.length)],
    linkedin: 'https://linkedin.com/johndoe',
    name,
    phone: emergencyPhone,
    school_year: items[Math.floor(Math.random() * items.length)],
    shirt_size: shirts[Math.floor(Math.random() * items.length)],
    story,
    university,
    website: 'google.com',
    documents: [
      {
        download_link: 'https://firebasestorage.googleapis.com/v0/b/mydeltahacks.appspot.com/o/users%2Ftest5%40test.ca%2FGeneral%20Expectations.docx.pdf?alt=media&token=7dcf28a5-2215-4824-8600-583df46399ba',
        filename: 'General Expectations.docx.pdf',
        id: '3ln3opja2',
      },
    ],
    time: {
      applied_initially: applicationDate,
      applied_initially_unix: applicationDate.getTime(),
      updated: applicationDate,
      updated_unix: applicationDate.getTime(),
    },
  };
}

function p() {
  const email = faker.internet.email();
  const name = faker.name.findName();
  const phone = faker.phone.phoneNumber();
  const story = faker.lorem.paragraphs();
  const university = unis[Math.round(Math.random() * (7))];
  const dateCreated = faker.date.past();
  return {
    name,
    email,
    account_created: {
      date: dateCreated,
      unix: dateCreated.getTime(),
    },
    country: faker.address.country(),
    university,
    phone,
    description: faker.name.jobDescriptor(),
    story,
    age: (Math.round(Math.random() * (25 - 16)) + 16),
    is_admin: false,
    geo: {
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
    },
    application: generateApp(email, phone, name, story, university),
  };
}

const people = [];
for (let i = 0; i < 15; i += 1) {
  people.push(p());
}

export default people;
