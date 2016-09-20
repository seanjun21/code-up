const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let postQuestion = (data) => {
    let question = data.input;
    let userID = data.userID;
    let timestamp = data.timeStamp;

    knex.insert({
        question_text: question,
        user_id: userID,
        time_stamp: timestamp
    })
    .returning()
    .into('questions')
    .then(() => {
        knex.select()
        .from('questions')
        .where({
            is_answered: false
        })
        .orderBy('time_stamp')
        .then((questions) => {
            return {
                questions: questions
            }
        })
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = postQuestion;