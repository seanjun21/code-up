const pg = require('../database/connect.js');
const knex = require('knex')(pg);

// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         database: 'chat'
//     },
// });

let joinRoom = (data) => {
    let questionID = data.questionID;
    return new Promise((resolve, reject) => {
        const promise = knex.select()
            .from('questions')
            .where({
                question_id: questionID
            })
            .returning('question_id', 'question_text');
        promise.then((question_id, question_text) => {
            return new Promise((resolve, reject) => {
                knex.select()
                    .from('messages')
                    .where({
                        question_id: question_id
                    })
                    .orderBy('when_sent')
                    .then((messages) => {
                        resolve({
                            questionText: question_text,
                            questionID: question_id,
                            messages: messages
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = joinRoom;