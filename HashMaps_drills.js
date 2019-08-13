'use strict';

const { HashMap } = require('./HashMap');

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

function main() {
    const lor = new HashMap();
    const data = [{'Hobbit': 'Bilbo'}, {'Hobbit': 'Frodo'},
    {'Wizard': 'Gandolf'}, {'Human': 'Aragon'}, {'Elf': 'Legolas'}, {'Maiar': 'The Necromancer'},
    {'Maiar': 'Sauron'}, {'RingBearer': 'Gollum'}, {'LadyOfLight': 'Galadriel'}, {'HalfElven': 'Arwen'},
    {'Ent': 'Treebeard'}];
    data.forEach(obj => {
        const key = Object.keys(obj)[0];
        lor.set(key, obj[key])
    });

    console.log(lor); // length = 9. 2 items are missing because there are 2 items with the same key value ('Hobbit', 'Maiar')

    // Retrieve the value that is hashed in the key "Maiar" and "Hobbit"
    console.log('Maiar =', lor.get('Maiar')) // Sauron
    console.log('Hobbit =', lor.get('Hobbit')) // Frodo

    // What are the values of Maiar and Hobbit that I have?
    // I am getting Sauron and Frodo because we have 2 keys storing 2 different values and its only showing the latter value due to not having anything to resolve collisions
}

main();