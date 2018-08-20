const input = require('./json_files/input');
const lodashArr = require('lodash/array');
const models = require('../');
const rawTopics = input.map(element => element.topic);
const topics = lodashArr.uniq(rawTopics);
const promiseArray = [];
function seed() {
  console.log('Importing topics');
  topics.forEach(topic => {
    const promise = models.topic.create({
      title: topic
    });
    promiseArray.push(promise);
  });
  return Promise.all(promiseArray).then(() => {
    console.log('seeded topics');
  });
}
module.exports = { seed };
