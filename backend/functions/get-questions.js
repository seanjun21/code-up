const pg = require('../../server.js');
const knex = require('knex')(pg);

let getQuestions = (data) => {
    let tag = data.tag;

    knex.select()
    .from('questions')
    .where({answered: false})
    .returning('question_text', 'question_id', 'whenasked')
    .orderBy('whenasked')
    .then((questions) => {
        return {
            questions: questions
        }
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = getQuestions;
