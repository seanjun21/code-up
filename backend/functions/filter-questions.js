const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let filterQuestions = (data) => {
    let tag = data.tag;

    knex.select()
    .from('questions')
    .innerJoin('tags', 'questions.id', 'tags.question_id')
    .where({
        tag_name: tag,
        is_answered: false
    })
    .returning('question_text', 'id', 'time_stamp')
    .orderBy('time_stamp')
    .then((questions) => {
        return {
            questions: questions
        }
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = filterQuestions;