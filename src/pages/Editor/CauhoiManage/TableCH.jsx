import React, { useEffect, useState } from 'react';
import '../../Admin/Table.scss';
import Menu from '~/components/Popper/Menu';
import {
    CancelIcon,
    DeleteIcon,
    HorizontalIcon,
    VisibilityIcon,
    VisibilityOffIcon,
} from '~/components/GlobalStyles/Layout/components/Icons';
import axios from 'axios';

const MENU_ITEMS = [
    {
        icon: <VisibilityIcon />,
        title: 'Active User',
    },
    {
        icon: <VisibilityOffIcon />,
        title: 'Inactive User',
    },
    {
        icon: <CancelIcon />,
        title: 'Block User',
    },
    {
        icon: <DeleteIcon />,
        title: 'Delete User',
    },
];

function TableCH() {
    const [questionData, setQuestionData] = useState([]);
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        const login = async () => {
            try {
                // Đăng nhập vào tài khoản Editor và lấy mã thông báo truy cập
                const response = await axios.post('https://vietnam-history.azurewebsites.net/api/Auth/login', {
                    email: 'cong@gmail.com',
                    password: '123456',
                });
                const accessToken = response.data.accessToken;

                // Sử dụng mã thông báo truy cập để gửi các yêu cầu API khác
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                // Fetch question data
                axios
                    .get('https://vietnam-history.azurewebsites.net/api/Question/getAllQuestions', config)
                    .then((response) => {
                        setQuestionData(response.data.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching questions:', error);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
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
                        config,
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

    return (
        <table className="table-user">
            <thead>
                <tr>
                    <th className="th-user">Text câu hỏi</th>
                    <th className="th-user">Độ khó</th>
                    <th className="th-user">Câu trả lời</th>
                </tr>
            </thead>
            <tbody>
                {questionData.map((question) => {
                    const answer = answerData.find((answer) => answer.questionId === question.questionId);
                    return (
                        <tr key={question.questionId}>
                            <td className="td-user">{question.questionText}</td>
                            <td className="td-user">{question.difficultyLevel}</td>
                            <td className="td-user">
                                {answer ? answer.answerItems.map((answer) => answer.answerText).join(', ') : ''}
                            </td>
                            <td className="td-user">
                                <Menu items={MENU_ITEMS}>
                                    <button className="btn-function">
                                        <HorizontalIcon />
                                    </button>
                                </Menu>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TableCH;
