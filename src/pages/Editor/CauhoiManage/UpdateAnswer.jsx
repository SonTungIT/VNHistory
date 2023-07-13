import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import classNames from 'classnames/bind';
import styles from './UpdateAnswer.scss';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';

const cx = classNames.bind(styles);

function UpdateAnswer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get('questionId');
  const [answerData, setAnswerData] = useState([]);
  const [createdAnswerData, setCreatedAnswerData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    };

    const fetchAnswerData = async () => {
      try {
        const response = await axios.get(
          `https://vietnamhistory.azurewebsites.net/api/Anwsers/getAllAnswersByQuestionId?id=${questionId}`,
          config
        );

        setAnswerData(response.data.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswerData();
  }, [questionId]);

  const handleUpdateAnswer = async (answerId) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    };

    try {
      const updatedAnswer = answerData.find((answer) => answer.answerId === answerId);

      const response = await axios.put(
        'https://vietnamhistory.azurewebsites.net/api/Anwsers/updateAnswer',
        {
          questionId: updatedAnswer.questionId,
          answerId: updatedAnswer.answerId,
          answerText: updatedAnswer.answerText,
          isCorrect: updatedAnswer.isCorrect,
        },
        config
      );

      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleAnswerTextChange = (event, answerId) => {
    const updatedAnswerData = answerData.map((answer) => {
      if (answer.answerId === answerId) {
        return {
          ...answer,
          answerText: event.target.value,
        };
      }
      return answer;
    });

    setAnswerData(updatedAnswerData);
  };

  const handleIsCorrectChange = (event, answerId) => {
    const updatedAnswerData = answerData.map((answer) => {
      if (answer.answerId === answerId) {
        return {
          ...answer,
          isCorrect: event.target.value === 'true',
        };
      }
      return answer;
    });

    setAnswerData(updatedAnswerData);
  };

  return (
    <div className='bg-answer'>
      <Button primary leftIcon={<AddIcon />} setCreatedAnswerData={setCreatedAnswerData}>
        <Link to={`/CreateAnswer?questionId=${questionId}`}>
          THÊM MỚI ANSWER
        </Link>
      </Button>
      <h1>Answer Page</h1>
      <table>
        <thead>
          <tr>
            <th>Answer ID</th>
            <th>Answer Text</th>
            <th>Answer Correct</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {answerData.map((answer) => (
            <tr key={answer.answerId}>
              <td>{answer.answerId}</td>
              <td>
                <input
                  className={cx('input-answer')}
                  type="text"
                  value={answer.answerText}
                  onChange={(event) => handleAnswerTextChange(event, answer.answerId)}
                />
              </td>
              <td>
                <select
                  className={cx('input-isCorrect')}
                  value={answer.isCorrect ? 'true' : 'false'}
                  onChange={(event) => handleIsCorrectChange(event, answer.answerId)}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </td>
              <td>
                <Button className={cx('submit')} onClick={() => handleUpdateAnswer(answer.answerId)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateAnswer;
