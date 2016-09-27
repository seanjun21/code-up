const knex = require('../database/connect.js');

let postQuestion = (data) => {
    let questionText = data.questionText;
    let userID = data.userID;
    let tags = data.tags;
    return new Promise((resolve, reject) => {
        const promise = insertQ(questionText, userID);
        promise.then((data) => {
            knex.select()
            .from('questions')
            .where({ is_answered: false })
            .orderBy('when_asked')
            .then((questions) => {
                resolve({ questionFeed: questions, questionID: data[0].id, questionText: data[0].question_text, whenAsked: data[0].when_asked });
            })
            .catch((err) => {
                reject(err);
            });   
        })
        .catch((err) => {
            reject(err);
        });
    });
};

let insertQ = (questionText, userID) => {
    return new Promise((resolve, reject) => {
        knex.insert({question_text: questionText, user_id: userID, is_answered: false, when_asked: '1999-01-08 04:05:06'})
        .into('questions')
        .returning(['id', 'question_text', 'when_asked'])
        .then((data) => {
            resolve(data);
            })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = postQuestion;
