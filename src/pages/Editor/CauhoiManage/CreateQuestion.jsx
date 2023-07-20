import axios from 'axios';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateQuestion.scss';
import { message } from 'antd';
const cx = classNames.bind(styles);

function CreateQuestion({ setCreatedQuestionData }) {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

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

  useEffect(() => {
    // Fetch events data
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://vietnamhistory.azurewebsites.net/api/events');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle the error
      }
    };

    fetchEvents();
  }, []);

  const handleCreateQuestion = async () => {
    try {
      // Use the access token to send API request with Editor permission
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };

      const questionData = {
        eventId: eventId,
        questionText: questionText,
        difficultyLevel: difficultyLevel,
      };

      const response = await axios.post(
        'https://vietnamhistory.azurewebsites.net/api/Question/createQuestion',
        questionData,
        config
      );

      if (localStorage.getItem('role') === 'Editor') {
        console.log('Created question:', response.data);
        setCreatedQuestionData(prevData => [...prevData, response.data]);
        success();
      }
      // Update the created question data
    } catch (error) {
      console.error('Error creating question:', error);
      showError();
      // Handle the error
    }
  };

  return (
    <div className={cx('CreateQuestion')}>
      <div className={cx('Question')}>
        <h2 className={cx('title')}>Create Question</h2>
        <div className={cx('EventID')}>
          <label>Event:</label>
          <select value={eventId} onChange={e => setEventId(parseInt(e.target.value))}>
            <option value={0}>Select an event</option>
            {events.map(event => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('QuestionText')}>
          <label>Question Text:</label>
          <input type="text" value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </div>
        <div className={cx('DifficultyLevel')}>
          <label>Difficulty Level:</label>
          <input type="text" value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)} />
        </div>
        <button onClick={handleCreateQuestion}>Create Question</button>
        {contextHolder}
      </div>
    </div>
  );
}

export default CreateQuestion;
