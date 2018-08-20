const lessonsQuestions = require('./json_files/questions');
const models = require('../');
const promiseArray = [];
function seed() {
  lessonsQuestions.forEach(lessonQuestion => {
    const promise = models.course.find({
      where: {
        title: lessonQuestion.course}
    }).then((course) => {
      const promiseLesson = models.lesson.find({
        where: {
          title: lessonQuestion.lesson,
          courseId: course.id
        }
      }).then((lesson) => {
        const promiseQuestion = models.question.create({
          text: lessonQuestion.question,
          category: lessonQuestion.category,
          author: lessonQuestion.author,
          difficulty: lessonQuestion.difficulty,
          lessonId: lesson.id
        });
        return promiseQuestion;
      });
      return promiseLesson;
    });
    promiseArray.push(promise);
  });
  return Promise.all(promiseArray).then(() => {
    console.log('seeded questions');
  });
}
module.exports = { seed };
