import { React, useState } from 'react';
import { Link } from "react-router-dom";
import "./Quiz.css";
import { QUERY_QUIZ, QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';


const Quiz = () => {
    const username = Auth.loggedIn() ? Auth.getProfile().data.username : '';
    const { loading, data, error } = useQuery(QUERY_QUIZ);
    const { load, userData, err } = useQuery(username ? QUERY_USER : QUERY_ME, {
        variables: { username: username },
      });
    const quizzes = data?.quizzes || [];

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

    const handleNextQuestion = async () => {
        if (currentQuestion === quizzes.length - 1) {

          setIsQuizComplete(true);

          console.log("quiz is set to complete");
          setIsButtonDisabled(true);
        }
      
        if (currentQuestion < quizzes.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      
        setSelectedAnswer(null);
        setResult(answer ? result + 1 : result);
        localStorage.setItem("scores", JSON.stringify(result + 1));

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
                                <button onClick={handleNextQuestion} disabled={isButtonDisabled}>Submit</button>
                            )}
                        </div>
                        {isQuizComplete && (
                            <div className='results'>
                                <div>
                                    <p>Quiz is complete!</p>
                                    <p>Score:  {result}</p>
                                </div>
                                <Link className="btn btn-primary" to="/me">View Profile</Link>
                            </div>
                            
                        )}
                    </div>
                </div>
            ) : (
            <div className='row'>
                <div className='column'>
                  <h1 className='welcomeTitle'>{'WELCOME TO \nCODE WIZARD'}</h1>
                  <h1 className='welcomeType'>
                    {'\nAre you eager to master the art of coding?\nLook no further!\nCode Wizard is a quiz app to help start\nyou off on your coding journey\nor refresh your skills as a seasoned coder.' }
                  </h1>
                </div>
                
                <img className="heroImage" src={require('../../assets/Frogboy2.png')} alt="lilGuy"></img>
                
            </div>
          )
            }
        </div>
    );
};


export default Quiz;