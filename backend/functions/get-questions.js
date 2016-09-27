const knex = require('../database/connect.js');

let getQuestions = () => {
    return new Promise((resolve, reject) => {
        knex.select()
        .from('questions')
        .where({ is_answered: false })
        .orderBy('when_asked')
        .then((questions) => {
            resolve({ questions: questions });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = getQuestions;
