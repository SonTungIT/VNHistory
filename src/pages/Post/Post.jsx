import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Post() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedNumberQuestion, setSelectedNumberQuestion] = useState('');
    const [selectedTime, setSelectedTime] = useState(0);
    const [quizId, setQuizId] = useState('');

    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('postId');
    const [postData, setPostData] = useState(null);
    const [metaContent, setMetaContent] = useState([]);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`https://vietnam-history.azurewebsites.net/api/posts/${postId}`);
                const result = await response.json();
                setPostData(result);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    useEffect(() => {
        const fetchPostMeta = async () => {
            try {
                const response = await fetch(
                    `https://vietnam-history.azurewebsites.net/api/postmetas/post/${postId}/meta`,
                );
                const result = await response.json();
                setMetaContent(result);
            } catch (error) {
                console.error('Error fetching post meta:', error);
            }
        };

        fetchPostMeta();
    }, [postId]);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleQuizSelection = async (numberQuestion, time) => {
        setSelectedNumberQuestion(numberQuestion);
        setSelectedTime(time);

        try {
            const loginResponse = await axios.post('https://vietnam-history.azurewebsites.net/api/Auth/login', {
                email: 'cong123@gmail.com',
                password: '123456',
            });
            const accessToken = loginResponse.data.accessToken;

            // Sử dụng mã thông báo truy cập để gửi yêu cầu API với phân quyền Editor
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const answerData = {
                eventId: '1',
                numberQuestion: numberQuestion,
                time: time,
            };
            // Make the API request to create a quiz
            const response = await axios.post(
                `https://vietnam-history.azurewebsites.net/api/Quizees/createQuiz?eventId=${answerData.eventId}`,
                answerData,
                config,
            );

            const createdQuizId = response.data.data.quizId; // Get the quizId from the response data

            console.log('Quiz created:', response);
            console.log('Quiz ID:', createdQuizId);

            // Chuyển hướng đến trang Quiz10 và truyền quizId vào URL
            window.location.href = `/Quiz10?quizId=${encodeURIComponent(createdQuizId)}`;
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    {postData ? (
                        <>
                            <div className={cx('title')}>
                                <div className={cx('title-post')}>{postData.data.metaTitle}</div>
                                <p className={cx('title-date')}>{formatDate(postData.data.createdAt)}</p>
                            </div>
                            <div className={cx('poster')}>
                                <img
                                    src="https://giasuviet.com.vn/wp-content/uploads/2015/09/phuong-phap-hoc-mon-lich-su-lop-12-hieu-qua-va-nho-lau.jpg"
                                    alt="img"
                                />
                            </div>
                            <div className={cx('detail-post')}>{postData.data.summary}</div>
                            <div className={cx('postmeta')}>
                                <div className={cx('postmeta-title')}>Nội dung bài viết: </div>
                                <div className={cx('postmeta-child')}>
                                    {Array.isArray(metaContent?.data) &&
                                        metaContent.data.map((item) => (
                                            <p key={item.id}>
                                                <p className={cx('postmeta-keys')}>
                                                    {item.id}. {item.keys}
                                                </p>
                                            </p>
                                        ))}
                                </div>
                            </div>
                            {Array.isArray(metaContent?.data) &&
                                metaContent.data.map((item) => (
                                    <div className={cx('postmeta-contents')}>{item.contents}</div>
                                ))}
                            <div className={cx('dropdown')}>
                                <button className={cx('btn')} type="button" onClick={handleDropdownToggle}>
                                    Quiz
                                </button>
                                {isDropdownOpen && (
                                    <ul className={cx('dropdown-menu')}>
                                        <div className={cx('quiz')}>
                                            <div className={cx('title-quiz')}>
                                                Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt
                                            </div>
                                            <div className={cx('establish-quiz')}>Thiết lập bài kiểm tra</div>
                                            <div className={cx('number-quiz')}>Câu hỏi (tối đa) - Thời gian</div>
                                            <div className={cx('btn-quiz')}>
                                                <Link to={`/Quiz10?quizId=${quizId}`}>
                                                    <button
                                                        className={cx('btn-quiz10')}
                                                        onClick={() => handleQuizSelection('10', 135)}
                                                    >
                                                        10 câu - 135 giây
                                                    </button>
                                                </Link>
                                                <button
                                                    className={cx('btn-quiz20')}
                                                    onClick={() => handleQuizSelection('20', 270)}
                                                >
                                                    20 câu - 270 giây
                                                </button>
                                            </div>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>Loading post data...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;
