const knex = require('../../database/connect.js');

let getMessages = (data) => {
    let questionID = data.questionID;
    return new Promise((resolve, reject) => {
        knex.select()
        .from('messages')
        .where({ question_id: questionID })
        .returning('message_text', 'user_name', 'when_sent')
        .orderBy('when_sent')
        .then((messages) => {
            resolve({ messages: messages });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = getMessages;