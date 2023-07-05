import classNames from 'classnames/bind';
import styles from './Quiz10.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Quiz10() {
  useEffect(() => {
    const getQuizQuestions = async () => {
      try {
		const loginResponse = await axios.post('https://vietnam-history.azurewebsites.net/api/Auth/login', {
			email: 'cong123@gmail.com',
			password: '123456'
		});
		const accessToken = loginResponse.data.accessToken;

		const config = {
			headers: {
			Authorization: `Bearer ${accessToken}`,
			},
		};

		const quizId = new URLSearchParams(window.location.search).get('quizId');
	  
        const response = await axios.get(`https://vietnam-history.azurewebsites.net/api/Quizees/getQuiz?quizId=${quizId}`, config);

        
        console.log('Quiz created:', response.data);
        console.log('Quiz created:', response.data.questionQuizzes);
        console.log(response.data.questionQuizzes[0].question.questionText);

        // Extract the array of questions from the API response
        const retrievedQuestions = response.data.questionQuizzes.forEach((questionQuiz) => {
          console.log('Question:', questionQuiz.question.questionText);
          questionQuiz.question.answers.forEach((answer) => {
            console.log('Answer Id:', answer.answerId);
            console.log('Answer Text:', answer.answerText);
          });
        });
        setQuestions(retrievedQuestions);
      } catch (error) {
        console.error('Error retrieving quiz questions:', error);
      }
    };

    getQuizQuestions();
  }, []);

  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  
  const handleAnswerOptionClick = () => {

    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < 10) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className={cx('wapper-quiz10')}>
      <div className={cx('inner-quiz10')}>
        <div className={cx('Quiz10')}>
          {showScore ? (
            <div className='score-section'>
              You scored {score} out of 10
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/10
                </div>
                <div className='question-text'>{questions[currentQuestion]?.question.questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                  <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz10;
