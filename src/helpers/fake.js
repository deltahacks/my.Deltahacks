import faker from 'faker';

const unis = ['Waterloo', 'U Toronto', 'York U', 'McMaster', 'Guelph', 'Queens', 'UBC', 'McGill'];
function p() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    applied: faker.date.past(),
    country: faker.address.country(),
    university: unis[Math.round(Math.random() * (7))],
    phone: faker.phone.phoneNumber(),
    description: faker.name.jobDescriptor(),
    story: faker.lorem.paragraphs(),
    age: (Math.round(Math.random() * (25 - 16)) + 16),
    is_admin: false,
    geo: {
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
    }
  };
}

const people = [];
for (let i = 0; i < 15; i += 1) {
  people.push(p());
}

export default people;
