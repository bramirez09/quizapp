import { React, useState } from 'react';
import "./Quiz.css";
import { QUERY_QUIZ } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Quiz = () => {
    const { loading, data, error } = useQuery(QUERY_QUIZ);
    const quizzes = data?.quizzes || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isQuizComplete, setIsQuizComplete] = useState(false);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching quiz data:", error);
        return <p>Error fetching quiz data.</p>;
    }

    const quiz = quizzes[currentQuestion];

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
    };
    const handleAnswerSelection = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmit = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (currentQuestion === quizzes.length - 1) {
            setIsQuizComplete(true);
        }
    };


    return (
        <div className='quizCard'>
            <div >
                <div className='quiz'>
                    <div className='numbers'>
                        <span className='questionNum'>{currentQuestion + 1}</span>/
                        <span className='totalNum'>{quizzes.length}</span>
                    </div>
                    <h3>{quiz.question}</h3>
                    <ul className='quizChoices'>
                        {quiz.answers.map((answer, answerIndex) => (
                            <li key={answerIndex} className={`quizChoice ${selectedAnswer === answerIndex ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelection(answerIndex)}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                    <div className='btn'>
                        {currentQuestion < quizzes.length - 1 ? (
                            <button onClick={handleNextQuestion}>Next</button>
                        ) : (
                            <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                    {isQuizComplete && (
                        <div className='results'>
                            <h6>Great job finishing! See results below:</h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Quiz;


