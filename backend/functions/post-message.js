const knex = require('../database/connect.js');

let postMessages = (data) => {
    let messageText = data.input;
    let questionID = data.questionID;
    let userName = data.userName;
    return new Promise((resolve, reject) => {
        const promise = insertM(messageText, questionID, userName);
        promise.then((promiseData) => {
            knex.select()
            .from('messages')
            .where({ question_id: promiseData })
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
            user_name: userName,
            when_sent: '1999-01-08 04:05:06'
        })
        .into('messages')
        .returning(['question_id'])
        .then((data) => {
            resolve(data[0].question_id);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = postMessages;
