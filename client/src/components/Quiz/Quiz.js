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
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(0);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching quiz data:", error);
        return <p>Error fetching quiz data.</p>;
    }

    const { question, answers, correct_answer } = quizzes[currentQuestion];

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setResult ((prev) => 
            answer
            ? {
                ...prev,
                score: prev.score + 1
            } : {
                ...prev,
                score: prev.score + 0
            }
        );
        console.log(answer);
    };
    const handleAnswerSelection = (answer, answerIndex) => {
        setSelectedAnswer(answerIndex);
        if(answer === correct_answer){
            setAnswer(true);
        } else {
            setAnswer(false);
        }
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
                    <h3>{question}</h3>
                    <ul className='quizChoices'>
                        {answers.map((answer, answerIndex) => (
                            <li key={answerIndex} className={`quizChoice ${selectedAnswer === answerIndex ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelection(answer, answerIndex)}>
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
                            <div>
                                <p>Quiz is complete!</p>
                                <p>Score:</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Quiz;