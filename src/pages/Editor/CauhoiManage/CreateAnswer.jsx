import axios from 'axios';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateAnswer.scss';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
const cx = classNames.bind(styles);

function CreateAnswer({ setCreatedAnswerData }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get('questionId');

  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm mới thành công',
        });
    };

    const showError = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm mới thất bại',
        });
    };

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://vietnamhistory.azurewebsites.net/api/Question/getQuestionsById/${questionId}`, config);
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách câu hỏi:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [questionId]);

  const handleCreateAnswer = async () => {
    try {
      const answerData = {
        questionId: questionId,
        answerText: answerText,
        isCorrect: isCorrect,
      };

      const response = await axios.post('https://vietnamhistory.azurewebsites.net/api/Anwsers/createAnswer', answerData, config);
      if (localStorage.getItem('role') === 'Editor') {
        console.log('Câu trả lời đã được tạo:', response.data);
        // setCreatedAnswerData(prevData => [...prevData, response.data]);
        success();
      }
    } catch (error) {
      console.error('Lỗi khi tạo câu trả lời:', error);
      showError();
    }
  };

  // Extract the questionId from the first question in the array
  const displayQuestionId = questions.questionText;

  return (
    <div className={cx('CreateAnswer')}>
      <div className={cx('Answer')}>
        <h2 className={cx('title')}>Tạo câu trả lời</h2>
        <div className={cx('QuestionText')}>
          <label>Question Text:</label>
          <label>{displayQuestionId}</label>
        </div>
        <div className={cx('AnswerText')}>
          <label>Câu trả lời:</label>
          <input type="text" value={answerText} onChange={e => setAnswerText(e.target.value)} />
        </div>
        <div className={cx('IsCorrect')}>
          <label>Đúng/Sai:</label>
          <select value={isCorrect} onChange={e => setIsCorrect(e.target.value === 'true')}>
            <option value="false">Sai</option>
            <option value="true">Đúng</option>
          </select>
        </div>
        <button onClick={handleCreateAnswer}>Tạo câu trả lời</button>
        {contextHolder}
      </div>
    </div>
  );
}

export default CreateAnswer;
