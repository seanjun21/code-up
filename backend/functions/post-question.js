const pg = require('../database/connect.js');
const knex = require('knex')(pg);

let postQuestion = (data) => {
    let questionText = data.input;
    let userID = data.userID;

    knex.insert({
        question_text: questionText,
        user_id: userID,
        is_answered: false }
    ).returning(
        'id', 
        'question_text'
    ).into(
        'questions'
    ).then(
        (id, question_text) => {
            knex.select(
            ).from(
                'questions'
            ).where({
                is_answered: false }
            ).orderBy(
                'when_asked'
            ).then(
                (questions) => {
                    return {
                        questions: questions,
                        questionID: id,
                        questionText: question_text
                    };
                }
            ).catch((err) => {
            console.error(err);
            });
        }
    ).catch((err) => {
        console.error(err);
    });
};

module.exports = postQuestion;
