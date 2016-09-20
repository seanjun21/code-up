const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let postMessages = (data) => {
    let message = data.input;
    //let id = data.questionID;
    let name = data.userName;
    //let timestamp = data.timeStamp;

    knex.insert({
        message_text: message,
        //question_id: id,
        username: name,
        //time_stamp: timestamp
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