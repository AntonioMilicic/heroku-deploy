const topicsCourses = require('./json_files/courses');
const models = require('../');
const promiseArray = [];
function seed() {
  console.log('Importing courses');
  topicsCourses.forEach(topicCourse => {
    const promise = models.topic.find({
      where: {
        title: topicCourse.topic}
    }).then((topic) => {
      const promiseCourse = models.course.create({
        title: topicCourse.course,
        topicId: topic.id
      });
      return promiseCourse;
    });
    promiseArray.push(promise);
  });
  return Promise.all(promiseArray).then(() => {
    console.log('seeded courses');
  });
}
module.exports = { seed };
