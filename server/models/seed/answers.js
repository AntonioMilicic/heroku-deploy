const questionsAnswers = require('./json_files/answers');
const models = require('../');
const promiseArray = [];
function seed() {
  questionsAnswers.forEach(questionAnswer => {
    const promise = models.question.find({
      where: {
        text: questionAnswer.question}
    }).then((question) => {
      const promiseAnswer = models.answer.create({
        text: questionAnswer.text,
        correct: questionAnswer.correct,
        correctIndex: questionAnswer.correctIndex,
        questionId: question.id
      });
      return promiseAnswer;
    });
    promiseArray.push(promise);
  });
  return Promise.all(promiseArray).then(() => {
    console.log('seeded answers');
  });
}
module.exports = { seed };
