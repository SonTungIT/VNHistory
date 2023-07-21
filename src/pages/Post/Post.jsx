import React, { useState, useEffect, useRef } from 'react';
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
    const contentsRef = useRef(null);
    const [imagesData, setImagesData] = useState();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`https://vietnamhistory.azurewebsites.net/api/posts/${postId}`);
                const result = await response.json();
                setPostData(result);
                // console.error('Két quả:', result.data.images[0].url);
                const allImages = result.data.images.map((image) => image.url);
                // console.error('Két quả 222:', allImages);
                setImagesData(allImages);
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
                    `https://vietnamhistory.azurewebsites.net/api/postmetas/post/${postId}/meta`,
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

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(0);

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

    const handleQuizSelection = async (numberQuestion, time) => {
        setSelectedNumberQuestion(numberQuestion);
        setSelectedTime(time);

        try {
            // Sử dụng mã thông báo truy cập để gửi yêu cầu API với phân quyền Editor
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            };

            const answerData = {
                eventId: eventId,
                numberQuestion: numberQuestion,
                time: time,
            };
            // Make the API request to create a quiz
            const response = await axios.post(
                `https://vietnamhistory.azurewebsites.net/api/Quizees/createQuiz?eventId=${answerData.eventId}`,
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
                                {imagesData.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`img-${index}`} />
                                ))}
                            </div>
                            <div className={cx('detail-post')}>{postData.data.summary}</div>
                            <div className={cx('postmeta')}>
                                <div className={cx('postmeta-title')}>Mục Lục: </div>
                                <div className={cx('postmeta-child')}>
                                    {Array.isArray(metaContent?.data) &&
                                        metaContent.data.map((item, index) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    contentsRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
                                                }}
                                            >
                                                <p className={cx('postmeta-keys')}>
                                                    {index + 1}. {item.keys}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className={cx('postmeta-contents')} ref={contentsRef}>
                                {Array.isArray(metaContent?.data) &&
                                    metaContent.data.map((item, index) => (
                                        <div key={item.id} className={cx('postmeta-keys-contents')}>
                                            <h4 className={cx('postmeta-keys-title')}>
                                                {index + 1}. {item.keys}
                                            </h4>
                                            <p className={cx('postmeta-keys-childs')}>{item.contents}</p>
                                        </div>
                                    ))}
                            </div>
                            <div className={cx('dropdown')}>
                                <button className={cx('btn')} type="button" onClick={handleDropdownToggle}>
                                    Quiz
                                </button>
                                {isDropdownOpen && (
                                    <ul className={cx('dropdown-menu')}>
                                        <div className={cx('quiz')}>
                                            <div className={cx('title-quiz')}>
                                                <select
                                                    value={eventId}
                                                    onChange={(e) => setEventId(parseInt(e.target.value))}
                                                >
                                                    <option value={0}>Select an event</option>
                                                    {events.map((event) => (
                                                        <option key={event.eventId} value={event.eventId}>
                                                            {event.eventName}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                <Link to={`/Quiz20?quizId=${quizId}`}>
                                                    <button
                                                        className={cx('btn-quiz20')}
                                                        onClick={() => handleQuizSelection('20', 270)}
                                                    >
                                                        20 câu - 270 giây
                                                    </button>
                                                </Link>
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
