const knex = require('../../database/connect.js');

let joinRoom = (data) => {
    let questionID = data.questionID;
    return new Promise((resolve, reject) => {
        const promise = findQ(questionID);
        promise.then((data) => {
            knex.select()
            .from('messages')
            .where({
                question_id: data[0].id
            })
            .orderBy('when_sent')
            .then((messages) => {
                // one more helper function to select for tags whose question_id matches data[0].id. add a key 'tags' to the object were creating in the resolve with the returned array of tags
                resolve({  
                    currentQuestion: { 
                        questionID: data[0].id, 
                        questionText: data[0].question_text, 
                        whenAsked: data[0].when_asked, 
                        messages: messages
                    } 
                });
            })
            .catch((err) => {
                reject(err);
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
        .returning(['id', 'question_text', 'when_asked'])
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
                reject(err);
        });
    });
};

module.exports = joinRoom;