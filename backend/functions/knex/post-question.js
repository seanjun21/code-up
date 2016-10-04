const knex = require('../../database/connect.js');

let postQuestion = (data) => {
    let questionText = data.questionText;
    let userID = data.userID;
    let tags = data.tags;
    return new Promise((resolve, reject) => {
        let currentQuestion = insertQ(questionText, userID);
        let insertedTags = insertT(tags, currentQuestion.id);
        knex.insert()
        .from('questions')
        .where({ is_answered: false })
        .orderBy('when_asked')
        .then((questions) => {
            resolve({
                questions: questions,
                currentQuestion: {
                    questionID: currentQuestion.id,
                    questionText: currentQuestion.question_text,
                    whenAsked: currentQuestion.when_asked,
                    messages: [],
                    insertedTags: insertedTags
                }
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
};

let insertQ = (questionText, userID) => {
    console.log(questionText, userID);
    knex.insert({question_text: questionText, user_id: userID, is_answered: false })
    .into('questions')
    .returning(['id', 'question_text', 'when_asked'])
    .then((data) => {
        return data[0];
    })
    .catch((err) => {
        console.error(err);
    });
}

let insertT = (tags, questionID) => {
    console.log(tags, questionID);
    let addedTags = []
    tags.forEach((tag) => {
        knex.insert({ tag: tag, question_id: questionID})
        .into('tags')
        .returning('tag')
        .then(() => {
            console.log('post tag success', tag);
            addedTags.push(tag)
        })
        .catch((err) => {
            console.log('post tag error', err, tag);
        });
    });
    return addedTags
}

module.exports = postQuestion;
