const pg = require('../../server.js');
const knex = require('knex')(pg);

let postMessages = (data) => {
    let message = data.input;
    //let id = data.questionID;
    let name = data.userName;
    //let timestamp = data.timeStamp;
    let question_id = data.questionID;

    knex.insert({
        message_text: message,
        username: name,
        //time_stamp: timestamp
        question_id: question_id
    })
    .returning('question_id')
    .into('messages')
    .then((question_id) => {
        knex.select()
        .from('messages')
        .where({
            question_id: question_id,
        }).orderBy('whensent')
        .then((messages) => {
            return {
                messages: messages
            }
        })
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = postMessages;
