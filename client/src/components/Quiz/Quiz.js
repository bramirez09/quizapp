import { React, useState } from 'react';
import "./Quiz.css";
// const [currentQuestion, setCurrentQuestion] = useState(0);
// const { question, answers, correct_answers} = questions[currentQuestion]
// const [showResults, setShowResults] = useState(false)

function Quiz() {
    return (
        <div className='quizCard'>
            <div className='quiz'>
                <h2>Quiz question</h2>
                <ul className='quizChoices'>
                    <li className='selectedAnswer'>Quiz Choices</li>
                </ul>
                <button>Next</button>
            </div>
            {/* <div className='results'>
                <h2>Results</h2>
            </div> */}
        </div>
    );
};

export default Quiz;


