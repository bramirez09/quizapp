import { React } from 'react';
import "./Quiz.css";
import { QUERY_QUIZ } from '../../utils/queries';
import { useQuery } from '@apollo/client';
// const [currentQuestion, setCurrentQuestion] = useState(0);
// const { question, answers, correct_answers} = questions[currentQuestion]
// const [showResults, setShowResults] = useState(false)

function Quiz() {
    const { loading, data } = useQuery(QUERY_QUIZ);
    const quizzes = data?.quizzes || [];
    console.log(quizzes.question)
    return (
        <div className='quizCard'>
            {quizzes.question}
            {quizzes.answers}
            {quizzes.correct_answer}
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