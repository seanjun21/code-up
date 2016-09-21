// For when you join a room for someone else's question
const pg = require('../../server.js');
const knex = require('knex')(pg);

let getMessages = (data) => {
    let questionID = data.questionID;
    
    knex.select(
    ).from(
        'messages'
    ).where({ 
        question_id: questionID }
    ).returning(
        'message_text', 
        'user_name', 
        'when_sent'
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
};

module.exports = getMessages;