// const pg = require('../database/connect.js');
// const knex = require('knex')(pg);

const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'chat'
    },
});

let postMessages = (data) => {
    let messageText = data.input;
    let questionID = data.questionID;
    let userName = data.userName;
    
    knex.insert({ 
        message_text: messageText,
        question_id: question_id,
        user_name: userName }
    ).returning(
        'question_id'
    ).into(
        'messages'
    ).then(
        (question_id) => {
            knex.select(
            ).from(
                'messages'
            ).where({ 
                question_id: question_id }
            ).orderBy(
                'when_sent'
            ).then(
                (messages) => {
                    return { 
                        messages: messages 
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

module.exports = postMessages;
