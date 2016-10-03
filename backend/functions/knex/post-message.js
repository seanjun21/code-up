const knex = require('../../database/connect.js');

let postMessages = (data) => {
    let messageText = data.input;
    let questionID = data.questionID;
    let userName = data.userName;
    return new Promise((resolve, reject) => {
        const promise = insertM(messageText, questionID, userName);
        promise.then((question_id) => {
            knex.select()
            .from('messages')
            .where({ question_id: parseInt(question_id) })
            .orderBy('when_sent')
            .then((messages) => {
                resolve({ messages: messages });
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

let insertM = (messageText, questionID, userName) => {
    return new Promise((resolve, reject) => {
        knex.insert({
            message_text: messageText,
            question_id: questionID,
            user_name: userName
        })
        .into('messages')
        .returning('question_id')
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = postMessages;