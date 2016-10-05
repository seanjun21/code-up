const knex = require('../../database/connect.js');
// TODO: account for multiple filters
let filterQuestions = (data) => {
    let tag = data.filters[0];
    return new Promise((resolve, reject) => {
        const promise = findIds(tag);
        promise.then((tags) => {
            let questionsArr = [];
            let completed = 0;
            tags.forEach((tag) => {
                knex.select()
                .from('questions')
                .where({ id: tag.question_id, is_answered: false })
                .then((question) => {
                    questionsArr.push(question[0]);
                    if (questionsArr.length === tags.length) {
                        // same nested loop to add tags to question objects before resolving
                        resolve({ questions: questionsArr });
                    }
                }).catch((err) => {
                    questionsArr.push({});
                });
            });
        });
    });
};

let findIds = (tag) => {
    return new Promise((resolve, reject) => {
        knex.select()
        .from('tags')
        .where({ tag: tag })
        .then((tags) => {
            resolve(tags);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = filterQuestions;
