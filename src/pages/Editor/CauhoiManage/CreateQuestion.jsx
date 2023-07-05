import axios from 'axios';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateQuestion.scss';
const cx = classNames.bind(styles);

function CreateQuestion({ setCreatedQuestionData }) {
  const [eventId, setEventId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleCreateQuestion = async () => {
    try {
      // Sử dụng mã thông báo truy cập để gửi yêu cầu API với phân quyền Editor
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };

      const questionData = {
        eventId: eventId,
        questionText: questionText,
        difficultyLevel: difficultyLevel
      };

      const response = await axios.post('https://vietnam-history.azurewebsites.net/api/Question/createQuestion', questionData, config);
      if (localStorage.getItem('role') === 'Editor') {
        console.log('Câu hỏi đã được tạo:', response.data);
        setCreatedQuestionData(prevData => [...prevData, response.data]);
      }
      // Update the created question data
    } catch (error) {
      console.error('Lỗi khi tạo câu hỏi:', error);
      // Handle the error
    }
  };

  return (
    <div className={cx('CreateQuestion')}>
      <div className={cx('Question')}>
        <h2 className={cx('title')}>Tạo câu hỏi</h2>
        <div className={cx('EventID')}>
          <label>Event ID:</label>
          <input type="number" value={eventId} onChange={e => setEventId(parseInt(e.target.value))} />
        </div>
        <div className={cx('QuestionText')}>
          <label>Text câu hỏi:</label>
          <input type="text" value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </div>
        <div className={cx('DifficultyLevel')}>
          <label>Độ khó:</label>
          <input type="text" value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)} />
        </div>
        <button onClick={handleCreateQuestion}>Tạo câu hỏi</button>
      </div>
    </div>
  );
}

export default CreateQuestion;
