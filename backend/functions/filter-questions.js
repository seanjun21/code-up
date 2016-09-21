const pg = require('../../server.js');
const knex = require('knex')(pg);

let filterQuestions = (data) => {
    let tag = data.tag;
    
    knex.select(
    ).from(
        'questions'
    ).innerJoin(
        'tags', 
        'questions.id', 
        'tags.question_id'
    ).where({ 
        tag: tag,
        is_answered: false }
    ).returning(
        'question_text', 
        'question_id', 
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

module.exports = filterQuestions;
