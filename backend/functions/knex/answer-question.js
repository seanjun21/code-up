const knex = require('../../database/connect.js');

let answerQuestion = (data) => {
    let questionID = data.questionID;
    let userID = data.userID;
    return new Promise((resolve, reject) => {
        const promise = findQ(questionID);
        promise.then((data) => {
            let promiseQ = data[0];
            if (data[0].user_id === userID) {
                promiseQ = updateQ(questionID);
            }
            promiseQ.then((dataQ) => {
                console.log(dataQ, '<------DATAQ');

                knex.select()
                .from('questions')
                .where({is_answered: false})
                .orderBy('when_asked', 'desc')
                .then((questions) => {
                    resolve({
                        questions: questions,
                        currentQuestion: dataQ[0]
                    });
                })
                .catch((err) => {
                    reject(err);
                });
            });
        });
    });
};

let findQ = (questionID) => {
    return new Promise((resolve, reject) => {
        knex.select()
        .from('questions')
        .where({
            id: questionID
        })
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

let updateQ = (questionID) => {
    return new Promise((resolve, reject) => {
        knex.update({
            is_answered: true
        })
        .from('questions')
        .where({
            id: questionID
        })
        .then(() => {
            resolve([{
                questionID: '',
                questionText: '',
                whenAsked: '',
                messages: [],
                tags: []
            }]);
        })
        .catch((err) => {
            reject(err);
        });
    })
};


module.exports = answerQuestion;