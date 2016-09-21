const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let postQuestion = (data) => {
    let question = data.input;
    let userID = data.userID;
    //let whenasked = data.timeStamp;

    knex.insert({
        user_id: userID,
        question_text: question,
        answered: false
        //whenasked: whenasked
    })
    .returning('id', 'question_text')
    .into('questions')
    .then((id) => {
        knex.select()
        .from('questions')
        .where({
            answered: false
        })
        .orderBy('whenasked')
        .then((questions) => {
            return {
                questions: questions,
                questionID: id,
                questionText: question_text
            }
        })
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = postQuestion;
