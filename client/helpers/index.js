export function shuffleArray(array) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function replaceThreeQuestionMarks(string) {
  return string.replace(/\?\?\?/g, '_____');
}

export function userInLocalStorage(persistedState, user) {
  try {
    const persistedUser = persistedState['auth']['user'];
    if (persistedUser['googleID'] === user['googleID']) return true;
    else if (persistedUser['facebookID'] === user['facebookID']) return true;
    else if (persistedUser['twitterID'] === user['twitterID']) return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export function quizInLocalStorage(persistedState) {
  try {
    return persistedState['quiz']['questions'].length > 0;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export function prepareQuestionsWithAnswers(questions, selectedAnswersIDs) {
  // Organize selectedAnswers to their respective questions
  const questionsWithAnswers = questions.map(question => {
    const answersForQuestion = question.answers
      .filter(answer => selectedAnswersIDs.includes(answer.id))
      .map(answer => answer.id);
    return {
      questionId: question.id,
      answerIds: answersForQuestion
    };
  });
  return questionsWithAnswers;
}

export function calculateCorrectQuestionsIDs(results) {
  // Find questions which don't have incorrect or missed answers
  // and take their Ids
  const correctQuestionsIDs = results.filter(result =>
    result.incorrectAnswersIds.length === 0 &&
    result.missedAnswersIds.length === 0
  )
    .map(result => result.questionId);
  return correctQuestionsIDs;
}

export function calculateCorrectAnswersIDs(results) {
  // Take Ids from correctAnswersIds array for each question
  const correctAnswersIDs = [];
  results.forEach(result => {
    correctAnswersIDs.push(...result.correctAnswersIds);
  });
  return correctAnswersIDs;
}

export function calculateIncorrectAnswersIDs(results) {
  // Take Ids from incorrectAnswersIds array for each question
  const incorrectAnswersIDs = [];
  results.forEach(result => {
    incorrectAnswersIDs.push(...result.incorrectAnswersIds);
  });
  return incorrectAnswersIDs;
}

export function calculateMissedAnswersIDs(results) {
  // Take Ids from missedAnswersIds array for each question
  const missedAnswersIDs = [];
  results.forEach(result => {
    missedAnswersIDs.push(...result.missedAnswersIds);
  });
  return missedAnswersIDs;
}
