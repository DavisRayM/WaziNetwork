const faker = require('faker');
const Task = require('./models/task');

async function seedPost() {
    // delete all pre-existing posts
    await Task.remove({});

    // create 80 new filler tasks
    for (const i of new Array(80)) {
        const task = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id': '5d3d9532691c862472d93ebb',
                'username': 'DavisRayM',
            }
        };

        await Task.create(task);
    }

    console.log('80 new filler posts created')
}

module.exports = seedPost;
