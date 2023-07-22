import React, { useEffect, useState } from 'react';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import classNames from 'classnames/bind';
import styles from './UpdateQuestion.scss';
import { message } from 'antd';
const cx = classNames.bind(styles);

function UpdateQuestion({ question, handleQuestionUpdate, closeQuestion }) {
  const [updatedQuestionText, setUpdatedQuestionText] = useState(question.questionText);
  const [updatedDifficultyLevel, setUpdatedDifficultyLevel] = useState(question.difficultyLevel);

  const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
        });
    };

    const showError = () => {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật thất bại',
        });
    };

  const handleQuestionTextChange = (event) => {
    setUpdatedQuestionText(event.target.value);
  };

  const handleDifficultyLevelChange = (event) => {
    setUpdatedDifficultyLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedQuestionData = {
      questionId: question.questionId,
      questionText: updatedQuestionText,
      difficultyLevel: updatedDifficultyLevel,
    };

    handleQuestionUpdate(updatedQuestionData);
    success();
  };

  return (
    <tr className="tr-update">
      <td colSpan={4} className="td-update">
        <div className="div-update">Update Question</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="questionText">Question Text:</label>
            <input
              className="input-question"
              type="text"
              id="questionText"
              value={updatedQuestionText}
              onChange={handleQuestionTextChange}
            />
          </div>
          <div className="form-group">
            <label className="difficultyLevel" htmlFor="difficultyLevel">Difficulty Level:</label>
            <select
              className="input-difficultyLevel"
              id="difficultyLevel"
              value={updatedDifficultyLevel}
              onChange={handleDifficultyLevelChange}
            >
              <option value="Easy">Easy</option>
              <option value="Normal">Normal</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <Button className="submit" type="submit">Update</Button>
          <Button onClick={closeQuestion}>Close</Button>
          {contextHolder}
        </form>
      </td>
    </tr>
  );
}


export default UpdateQuestion;