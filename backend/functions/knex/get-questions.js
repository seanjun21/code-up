const knex = require('../../database/connect.js');

let getQuestions = () => {
    return new Promise((resolve, reject) => {
        knex.select()
        .from('questions')
        .where({ is_answered: false })
        .orderBy('when_asked')
        .then((questions) => {
            // same nested loop to add tags to question objects before resolving
            resolve({ questions: questions });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = getQuestions;
