const pg = require('../database/connect.js');
const knex = require('knex')(pg);

// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         database: 'chat'
//     },
// });

let getQuestions = () => {
    return new Promise((resolve, reject) => {
        knex.select()
        .from('questions')
        .where({ is_answered: false })
        .returning('id', 'question_text', 'when_asked')
        .orderBy('when_asked')
        .then((questions) => {
            resolve({ questions: questions });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = getQuestions;
