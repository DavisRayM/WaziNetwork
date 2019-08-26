const faker = require('faker');
const Task = require('./models/task');
const Bid = require('./models/bid');

async function seedPost() {
    // // delete all pre-existing posts
    // await Task.remove({});

    // // create 80 new filler tasks
    // for (const i of new Array(80)) {
    //     const task = {
    //         title: faker.lorem.word(),
    //         description: faker.lorem.text(),
    //         author: {
    //             '_id': '5d529ef66cd76883e5cfcbfe',
    //             'username': 'DavisRayM',
    //         }
    //     };

    //     await Task.create(task);
    // }

    await Bid.remove({});

    for (const i of new Array(80)) {
        const bid = {
            description: "Hey there, I'm just testing out the max amount of things I can think about while writing this.\r\n\r\nLorem ipsum dolor amet affogato man braid dreamcatcher meh cloud bread, occupy glossier. Humblebrag cred mustache 90's, subway tile butcher gluten-free letterpress. Seitan hell of man bun mixtape deep v yuccie snackwave raw denim occupy everyday carry. Direct trade retro art party bespoke. Artisan taiyaki bespoke thundercats, authentic narwhal pinterest meh. Pop-up next level edison bulb freegan vexillologist wayfarers PBR&B church-key poke woke.\r\n\r\nMeditation squid artisan butcher raclette unicorn church-key hot chicken live-edge you probably haven't heard of them. Tumblr locavore kitsch, pinterest knausgaard woke listicle vinyl narwhal. 8-bit tilde palo santo, poke schlitz kogi trust fund waistcoat vegan iceland fashion axe succulents fingerstache meh quinoa. Kickstarter blog selfies glossier cray semiotics.\r\n\r\nNeutra lumbersexual chia, 90's seitan keffiyeh trust fund shoreditch XOXO. Before they sold out butcher mlkshk XOXO franzen organic fanny pack skateboard knausgaard. Artisan ethical retro, gochujang hell of pug jianbing. Taiyaki sartorial paleo offal microdosing fanny pack keytar letterpress kogi. Roof party skateboard slow-carb irony seitan austin tbh kogi thundercats retro cliche. Gentrify kinfolk selvage normcore skateboard roof party. Selvage aesthetic small batch jianbing, tumblr street art hexagon.",
            bid: 2000,
            author: {
                '_id': '5d63614c86946b0f8fdde18a'
            },
            task: {
                '_id': '5d5d33ca9683090f8663dd2a'
            }
        };

        await Bid.create(bid);
    }

    console.log('80 new filler posts created')
}

module.exports = seedPost;
