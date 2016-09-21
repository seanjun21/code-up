const pg = require('../../database/connect.js');
const knex = require('knex')(pg);

let getQuestions = (data) => {
    
    knex.select(
    ).from(
        'questions'
    ).where({ 
        is_answered: false }
    ).returning(
        'id', 
        'question_text', 
        'when_asked'
    ).orderBy(
        'when_asked'
    ).then(
        (questions) => {
            return { 
                questions: questions 
            };
        }
    ).catch((err) => {
        console.error(err);
    });
};

module.exports = getQuestions;
