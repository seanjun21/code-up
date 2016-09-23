const knex = require('../database/connect.js');

let getQuestions = () => {
    return new Promise((resolve, reject) => {
        console.log('before db pull');
        knex.select()
        .from('questions')
        .where({ is_answered: false })
        .orderBy('when_asked')
        .then((questions) => {
            console.log('after db pull');
            console.log(questions[0]);
            resolve({ questions: questions });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = getQuestions;
