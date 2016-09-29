const knex = require('../../database/connect.js');

let filterQuestions = (data) => {
    let tag = data.tag;
    return new Promise((resolve, reject) => {
        knex.select()
        .from('questions')
        .innerJoin('tags', 'questions.id', 'tags.question_id')
        .where({ tag: tag, is_answered: false })
        .returning('question_text', 'question_id', 'when_asked')
        .orderBy('when_asked')
        .then((questions) => {
            resolve({ questions: questions });
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = filterQuestions;
