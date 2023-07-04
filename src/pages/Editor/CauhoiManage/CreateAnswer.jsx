import axios from 'axios';
import React, { useState } from 'react';

function CreateAnswer({ setCreatedAnswerData }) {
  const [questionId, setQuestionId] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCreateAnswer = async () => {
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

      const answerData = {
        questionId: questionId,
        answerText: answerText,
        isCorrect: isCorrect
      };

      const response = await axios.post('https://vietnam-history.azurewebsites.net/api/Anwsers/createAnswer', answerData, config);
      console.log('Câu trả lời đã được tạo:', response.data);
      setCreatedAnswerData(prevData => [...prevData, response.data]);
      // Update the created answer data
    } catch (error) {
      console.error('Lỗi khi tạo câu trả lời:', error);
      // Handle the error
    }
  };

  return (
    <div>
      <h2>Tạo câu trả lời</h2>
      <div>
        <label>Question ID:</label>
        <input type="number" value={questionId} onChange={e => setQuestionId(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Text câu trả lời:</label>
        <input type="text" value={answerText} onChange={e => setAnswerText(e.target.value)} />
      </div>
      <div>
        <label>Đúng/Sai:</label>
        <select value={isCorrect} onChange={e => setIsCorrect(e.target.value === 'true')}>
          <option value="false">Sai</option>
          <option value="true">Đúng</option>
        </select>
      </div>
      <button onClick={handleCreateAnswer}>Tạo câu trả lời</button>
    </div>
  );
}

export default CreateAnswer;
