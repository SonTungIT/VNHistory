import axios from 'axios';
import React, { useState } from 'react';

function CreateQuestion({ setCreatedQuestionData }) {
  const [eventId, setEventId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleCreateQuestion = async () => {
    try {
      // Đăng nhập vào tài khoản Editor và lấy mã thông báo truy cập
      const loginResponse = await axios.post('https://vietnam-history.azurewebsites.net/api/Auth/login', {
        email: 'cong@gmail.com',
        password: '123456'
      });
      const accessToken = loginResponse.data.accessToken;

      // Sử dụng mã thông báo truy cập để gửi yêu cầu API với phân quyền Editor
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const questionData = {
        eventId: eventId,
        questionText: questionText,
        difficultyLevel: difficultyLevel
      };

      const response = await axios.post('https://vietnam-history.azurewebsites.net/api/Question/createQuestion', questionData, config);
      console.log('Câu hỏi đã được tạo:', response.data);
      setCreatedQuestionData(prevData => [...prevData, response.data]);
      // Update the created question data
    } catch (error) {
      console.error('Lỗi khi tạo câu hỏi:', error);
      // Handle the error
    }
  };

  return (
    <div>
      <h2>Tạo câu hỏi</h2>
      <div>
        <label>Event ID:</label>
        <input type="number" value={eventId} onChange={e => setEventId(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Text câu hỏi:</label>
        <input type="text" value={questionText} onChange={e => setQuestionText(e.target.value)} />
      </div>
      <div>
        <label>Độ khó:</label>
        <input type="text" value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)} />
      </div>
      <button onClick={handleCreateQuestion}>Tạo câu hỏi</button>
    </div>
  );
}

export default CreateQuestion;
