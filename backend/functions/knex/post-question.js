const knex = require('../../database/connect.js');

let postQuestion = (data) => {
    let questionText = data.questionText;
    let userID = data.userID;
    let tags = data.tags;
    return new Promise((resolve, reject) => {
        const promiseQ = insertQ(questionText, userID);
        promiseQ.then((dataQ) => {

            const promiseT = insertT(tags, dataQ[0].id);
            promiseT.then((dataT) => {
                knex.select()
                    .from('questions')
                    .where({is_answered: false})
                    .orderBy('when_asked', 'desc')
                    .then((questions) => {
                        // select * from tags
                        // nested loop, first loop through questions, then tags.
                        // For each question, at start of loop modify obj giving new key/value pair (tags: []).
                        // then nest a loop through tags. Check each tag.question_id to see if it matches question.id of current question. if so question.tags.push(tag.tag). 
                        // updatedquestions = []; at top.
                        // push question (updated with tags) onto updated question array.
                        resolve({
                            questions: questions,
                            currentQuestion: {
                                questionID: dataQ[0].id,
                                questionText: dataQ[0].question_text,
                                whenAsked: dataQ[0].when_asked,
                                messages: [],
                                tags: dataT[0]
                            }
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
        });

        // TODO: Write if statement here for if tags were passed in, do insert to questions_tags and update select to be a join query returning tags also for each question and map this in component.

    });
};

let insertQ = (questionText, userID) => {
    return new Promise((resolve, reject) => {
        knex.insert({question_text: questionText, user_id: userID, is_answered: false})
            .into('questions')
            .returning(['id', 'question_text', 'when_asked'])
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

let insertT = (tags, questionID) => {
    return new Promise((resolve, reject) => {
        let addedTags = [];
        let completed = 0;
        if (tags.length >= 1) {
            tags.forEach((tag) => {
                knex.insert({
                    tag: tag,
                    question_id: questionID
                })
                    .into('tags')
                    .returning('tag')
                    .then(() => {
                        console.log('post tag success', tag);
                        addedTags.push(tag)
                    })
                    .catch((err) => {
                        console.log('post tag error', err, tag);
                    });
                completed++;
                if (completed === tags.length) {
                    resolve(addedTags);
                }
            });
        } else {
            resolve(addedTags);
        }
    });
};

module.exports = postQuestion;
