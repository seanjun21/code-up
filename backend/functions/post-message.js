const knex = require('../database/connect.js');

let postMessages = (data) => {
    let messageText = data.input;
    let questionID = data.questionID;
    let userName = data.userName;
    return new Promise((resolve, reject) => {
        const promise = knex.insert({ message_text: messageText, question_id: question_id, user_name: userName })
        .returning('question_id')
        .into('messages')
        promise.then((question_id) => {
            return new Promise((resolve, reject) => {
                knex.select()
                .from('messages')
                .where({ question_id: question_id })
                .orderBy('when_sent')
                .then((messages) => {
                    resolve({ messages: messages });
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

module.exports = postMessages;
