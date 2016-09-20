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
    .innerJoin('tags', 'question.id', 'tags.question_id')
    .where({
        tag_name: tag,
        answered: false
    })
    .returning('question_text', 'question_id', 'whenasked')
    .orderBy('whenasked')
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
