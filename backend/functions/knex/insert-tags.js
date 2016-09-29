const knex = require('../../database/connect.js');
const tagsArr = require('../../../js/tags-arr');

let insertTags = () => {
    tagsArr.forEach((tag) => {
        knex.insert({ name: tag})
        .into('tags')
        .then(() => {
            console.log('post tag success', tag);
        })
        .catch((err) => {
            console.log('post tag error', err, tag);
        });
    });
};

module.exports = insertTags;