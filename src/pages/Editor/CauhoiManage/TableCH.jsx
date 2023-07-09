import React, { useEffect, useState } from 'react';
import '../../Admin/Table.scss';
import Menu from '~/components/Popper/Menu';
import {
  DeleteIcon,
  HorizontalIcon,
  VisibilityIcon,
  EditIcon,
} from '~/components/GlobalStyles/Layout/components/Icons';
import axios from 'axios';
import UpdateQuestion from './UpdateQuestion';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../Admin/Table.scss';

function TableCH() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');
  console.log(location.search);

  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [updatedQuestionData, setUpdatedQuestionData] = useState({});
  

  useEffect(() => {
    const login = async () => {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        };

        // Fetch question data
        const response = await axios.get(
          `https://vietnam-history.azurewebsites.net/api/Question/getQuestionsByEventId/${eventId}`,
          config
        );
        setQuestionData(response.data.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    login();
  }, []);

  useEffect(() => {
    const fetchAnswerData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      for (const question of questionData) {
        try {
          const response = await axios.get(
            `https://vietnam-history.azurewebsites.net/api/Anwsers/getAllAnswersByQuestionId?id=${question.questionId}`,
            config
          );
          const answerItems = response.data.data;
          setAnswerData((prevAnswerData) => [
            ...prevAnswerData,
            { questionId: question.questionId, answerItems },
          ]);
        } catch (error) {
          console.error('Error fetching answers:', error);
        }
      }
    };

    fetchAnswerData();
  }, [questionData]);

  const handleUpdateQuestion = (questionId) => {
    setSelectedQuestionId(questionId);
    const selectedQuestion = questionData.find(
      (question) => question.questionId === questionId
    );
    setUpdatedQuestionData(selectedQuestion);
  };

  const handleQuestionUpdate = async (updatedQuestionData) => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };

      await axios.put(
        'https://vietnam-history.azurewebsites.net/api/Question/updateQuestion',
        updatedQuestionData,
        config
      );

      // Fetch updated question data
      const response = await axios.get(
        `https://vietnam-history.azurewebsites.net/api/Question/getQuestionsByEventId/${eventId}`,
        config
      );
      setQuestionData(response.data.data);

      setSelectedQuestionId(null); // Reset selected question ID after successful update
      setUpdatedQuestionData({}); // Reset updated question data
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <table className="table-user">
      <thead>
        <tr>
          <th className="th-user">Text câu hỏi</th>
          <th className="th-user">Độ khó</th>
          <th className="th-user">View Answer</th>
          <th className="th-user"></th>
        </tr>
      </thead>
      <tbody>
        {questionData.map((question) => {
          const answer = answerData.find(
            (answer) => answer.questionId === question.questionId
          );
          const isUpdating = question.questionId === selectedQuestionId;

          return (
            <React.Fragment key={question.questionId}>
              <tr>
                <td className="td-user">{question.questionText}</td>
                <td className="td-user">{question.difficultyLevel}</td>
                <td className="td-user">
                  <button className="btn-function">
                      <Link to={`/UpdateAnswer?questionId=${question.questionId}`}>
                        <VisibilityIcon/>
                      </Link>
                    </button>
                </td>
                <td className="td-user">
                  {/* {answer
                    ? answer.answerItems.map((answer) => answer.answerText).join(', ')
                    : ''} */}
                  

                  {isUpdating ? (
                    <UpdateQuestion
                      question={updatedQuestionData}
                      handleQuestionUpdate={handleQuestionUpdate}
                    />
                  ) : (
                    <button
                      className="btn-function"
                      onClick={() => handleUpdateQuestion(question.questionId)}
                    //   to={config.routes.UpdateQuestion}
                    >
                      <EditIcon/>
                    </button>
                  )}

                  <DeleteIcon />
                </td>
              </tr>
              {isUpdating && (
                <tr>
                  <td colSpan={4}>
                    {/* Render the update form */}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableCH;
