import faker from 'faker'

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
var ra = faker.date.past(); // random contact card containing many properties
var unis = ['Waterloo', 'U Toronto', 'York U', 'McMaster', 'Guelph', "Queens", "UBC", 'McGill']
function p(){
    return{
        name: faker.name.findName(),
        email: faker.internet.email(),
        applied: faker.date.past(),
        country: faker.address.country(),
        university: unis[Math.round(Math.random() * (7))],
        phone: faker.phone.phoneNumber(),
        description: faker.name.jobDescriptor(),
        story: faker.lorem.paragraphs(),
        age: Math.round(Math.random() * (25 - 16) + 16)
        }
    }

var people = []
for(var i = 0; i < 15; i++){    
    people.push(p())
}

export default people;