// import { React } from 'react';
// import "./Quiz.css";
// import { QUERY_QUIZ } from '../../utils/queries';
// import { useQuery } from '@apollo/client';
// const [currentQuestion, setCurrentQuestion] = useState(0);
// const { question, answers, correct_answers} = questions[currentQuestion]
// const [showResults, setShowResults] = useState(false)

// function Quiz() {
//     const { loading, data } = useQuery(QUERY_QUIZ);
//     const quizzes = data?.quizzes || [];
//     console.log(quizzes.question)
//     return (
//         <div className='quizCard'>
//             {quizzes.question}
//             {quizzes.answers}
//             {quizzes.correct_answer}
//             <div className='quiz'>
//                 <h2>Quiz question</h2>
//                 <ul className='quizChoices'>
//                     <li className='selectedAnswer'>Quiz Choices</li>
//                 </ul>
//                 <button>Next</button>
//             </div>
//             {/* <div className='results'>
//                 <h2>Results</h2>
//             </div> */}
//         </div>
//     );
// };

// export default Quiz;

import { React, useState } from 'react';
import "./Quiz.css";
import { QUERY_QUIZ } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

const Quiz = () => {
    const { loading, data, error } = useQuery(QUERY_QUIZ);
    const quizzes = data?.quizzes || [];
    console.log(data)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching quiz data:", error);
        return <p>Error fetching quiz data.</p>;
    }

    const quiz = quizzes[currentQuestion];
    console.log(quiz)

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        if (currentQuestion === quizzes.length -1) {
            <div className='results'>
                    <div>
                        <p>Quiz is complete!</p>
                    </div>
                </div>
        }
    };
    const handleAnswerSelection = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (currentQuestion === quizzes.length -1) {
            <div className='results'>
                    <div>
                        <p>Quiz is complete!</p>
                    </div>
                </div>
        }
    };

    const handleSubmit = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (currentQuestion === quizzes.length -1) {
            <div className='results'>
                    <div>
                        <p>Quiz is complete!</p>
                    </div>
                </div>
        }
    }


    return (
        <div className='quizCard'>
            {Auth.loggedIn()?(

  
            <div >
                <div className='quiz'>
                    <div className='numbers'>
                        <span className='questionNum'>{currentQuestion + 1}</span>/
                        <span className='totalNum'>{quizzes.length}</span>
                    </div>
                    {/* <h3>{quiz.question}</h3> */}
                    {/* <ul className='quizChoices'>
                        {quiz.answers.map((answer, answerIndex) => (
                            <li key={answerIndex} className={`quizChoice ${selectedAnswer === answerIndex ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelection(answerIndex)}>
                                {answer}
                            </li>
                        ))}
                    </ul> */}
                    <div className='btn'>
                        {currentQuestion < quizzes.length - 1 ? (
                        <button onClick={handleNextQuestion}>Next</button>
                        ):(
                        <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </div>
            </div> 
            ): (<h1>abcdef</h1>)
        }
        </div>
    );
};


export default Quiz;