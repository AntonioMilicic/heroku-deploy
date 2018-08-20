const coursesLessons = require('./json_files/lessons');
const models = require('../');
const promiseArray = [];
function seed() {
  coursesLessons.forEach(courseLesson => {
    const promise = models.course.find({
      where: {
        title: courseLesson.course}
    }).then((course) => {
      const promiseLesson = models.lesson.create({
        title: courseLesson.lesson,
        category: courseLesson.category,
        author: courseLesson.author,
        courseId: course.id,
        difficulty: 1
      });
      return promiseLesson;
    });
    promiseArray.push(promise);
  });
  return Promise.all(promiseArray).then(() => {
    console.log('seeded lessons');
  });
}
module.exports = { seed };
