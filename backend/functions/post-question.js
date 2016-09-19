const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let postQuestion = (data) => {
    let question = data.input;
    let id = data.userID;
    knex.insert({
        question_text: question,
        user_id: id
    })
    .returning('id', 'question_text')
    .into('questions')
    .then((id, question_text) => {
        return {
            questionID: id,
            questionText: question_text
        };
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = postQuestion;