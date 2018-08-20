const express = require('express');
const router = express.Router();
const topic = require('./topic');
const course = require('./course');
const lesson = require('./lesson');
const question = require('./question');
const answer = require('./answer');
const user = require('./user');
const quizAttempt = require('./quiz-attempt');
const userAnswer = require('./user-answer');

router.get('/topics', topic.get);
router.get('/topics/:id/courses', course.get);
router.get('/courses/:id/lessons', lesson.get);
router.get('/questions', question.get);
router.get('/questions/:id', question.getOne);
router.get('/questions/:id/answers', answer.get);
router.get('/answers/:id', answer.getOne);
router.get('/top-scores', user.topScore);
router.get('/users/:id/quizzes', quizAttempt.get);
router.post('/users/:id/quizzes', quizAttempt.submit);
router.get('/attempts/:id/user-answers', userAnswer.get);
router.post('/attempts/:id/user-answers', userAnswer.submit);

module.exports = router;
