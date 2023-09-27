const db = require('../config/connections');
const { Quiz } = require('../models');

const quizData = require('./quizData.json');

db.once('open', async () => {
  try {
    await Quiz.deleteMany({});
    await Quiz.create(quizData);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

