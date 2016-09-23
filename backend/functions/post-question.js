const knex = require('../database/connect.js');

let postQuestion = (data) => {
    let questionText = data.input;
    let userID = data.userID;
    return new Promise((resolve, reject) => {
        const promise = knex.insert({ question_text: questionText, user_id: userID, is_answered: false })
        .returning('id', 'question_text')
        .into('questions')
        promise.then((id, question_text) => {
            return new Promise((resolve, reject) => {
                knex.select()
                .from('questions')
                .where({ is_answered: false })
                .orderBy('when_asked')
                .then((questions) => {
                    resolve({ questions: questions, questionID: id, questionText: question_text });
                })
                .catch((err) => {
                    reject(err);
                });   
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = postQuestion;
