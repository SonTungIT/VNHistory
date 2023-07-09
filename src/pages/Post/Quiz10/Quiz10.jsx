import classNames from 'classnames/bind';
import styles from './Quiz10.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Quiz10() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const getQuizQuestions = async () => {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        };

        const quizId = new URLSearchParams(window.location.search).get('quizId');

        const response = await axios.get(`https://vietnam-history.azurewebsites.net/api/Quizees/getQuiz?quizId=${quizId}`, config);

        const retrievedQuestions = response.data.questionQuizzes.map((questionQuiz) => {
          const questionText = questionQuiz.question.questionText;
          const questionId = questionQuiz.question.questionId;
          const answerOptions = questionQuiz.question.answers.map((answer) => {
            const answerText = answer.answerText;
            const answerId = answer.answerId;
            const isCorrect = answer.isCorrect;

            return { answerText, answerId, isCorrect };
          });

          return {
            questionId,
            questionText,
            answerOptions,
          };
        });
        setQuestions(retrievedQuestions);
      } catch (error) {
        console.error('Error retrieving quiz questions:', error);
      }
    };

    getQuizQuestions();
  }, []);

  const handleAnswerOptionClick = (isCorrect, answerId) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestion].questionId,
        answerId: answerId,
      },
    ]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleGetResultQuiz = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };

      const quizId = new URLSearchParams(window.location.search).get('quizId');

      const payload = {
        quizId: quizId,
        quizzes: userAnswers,
      };

      const response = await axios.post(
        'https://vietnam-history.azurewebsites.net/api/Quizees/getResultQuiz',
        payload,
        config
      );

      console.log(response.data); // In ra console để kiểm tra dữ liệu trả về từ server

      const quizScore = response.data.data.score;

      setUserScore(quizScore);
      // Hiển thị dữ liệu kết quả quiz trên giao diện hoặc thực hiện các thao tác khác với dữ liệu trả về từ server
    } catch (error) {
      console.error('Error getting quiz result:', error);
    }
  };

  return (
    <div className={cx('wapper-quiz10')}>
      <div className={cx('inner-quiz10')}>
        <div className={cx('Quiz10')}>
          {questions.length > 0 ? (
            showScore ? (
              <div className='score-section'>
                <button onClick={handleGetResultQuiz}>Get Quiz Result</button>
                <p className='p-section'>Your scored {userScore}</p>
              </div>
            ) : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='answer-section'>
                  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerId)
                      }
                    >
                      {answerOption.answerText}
                    </button>
                  ))}
                </div>
              </>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz10;
