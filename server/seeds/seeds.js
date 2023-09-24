const db = require('../config/connection');
const { Quiz } = require('../models');

const quizData = require('./quizData.json');

db.once('open', async () => {
  await Quiz.deleteMany({});

  const quizzes = await Quiz.insertMany(quizData);

  console.log('Quizzes seeded!');
  process.exit(0);
});
