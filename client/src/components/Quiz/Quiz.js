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
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching quiz data:", error);
        return <p>Error fetching quiz data.</p>;
    }

    const { question, answers, correct_answer } = quizzes[currentQuestion];

    const handleNextQuestion = () => {

        if (currentQuestion === quizzes.length - 1) {
            setIsQuizComplete(true);
            setInterval(() => {
                window.location.href = "/"
            }, 5000)
            console.log("quiz is set to complete")
            setIsButtonDisabled(true);
        }
        if (currentQuestion < quizzes.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
        setSelectedAnswer(null);
        setResult((answer ? result + 1 : result));
        console.log("score:", result);
        console.log(answer);
    };
    const handleAnswerSelection = (answer, answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (answer === correct_answer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };


    return (
        <div className='quizCard'>
            {Auth.loggedIn() ? (
                <div >
                    <div className='quiz'>
                        <div className='numbers'>
                            <span className='questionNum'>{currentQuestion + 1}</span> /
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
                                <button onClick={handleNextQuestion} disabled={isButtonDisabled}>See My Score</button>
                            )}
                        </div>
                        {isQuizComplete && (
                            <div className='result-section'>
                                <div className='results'>
                                    <p>Quiz is complete!</p>
                                    <p>Score:  {result} / {quizzes.length}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='homepageCard'>
                    <div className='home-info'>
                        <h1>Hello, Welcome to CodeMaster!</h1>
                        <h5>Insert cute frog here</h5>
                        <h4>CodeMaster is your go-to destination for quick and engaging quizzes
                            on various coding languages. Whether you're a seasoned programmer looking to test your knowledge or a
                            beginner eager to learn, our platform has something for everyone.</h4>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Quiz;