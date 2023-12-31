import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.scss';
import { useLocation } from 'react-router-dom';
import { Input, Space } from 'antd';

const { Search } = Input;

const cx = classNames.bind(styles);

function PostDetail() {
    const location = useLocation();
    const searchResults = new URLSearchParams(location.search).get('searchResults');
    const parsedResults = JSON.parse(searchResults);
    const [imagesData, setImagesData] = useState();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://vietnamhistory.azurewebsites.net/api/posts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                setPosts(result.data);
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleButtonClick = (postId) => {
        window.location.href = `/post?postId=${postId}`;
    };

    const handleSearch = (value) => {
        const encodedKeyword = encodeURIComponent(value);
        const apiUrl = `https://vietnamhistory.azurewebsites.net/api/posts/search/metaTitle?keyword=${encodedKeyword}`;

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const encodedResults = encodeURIComponent(JSON.stringify(result));
                const allImages = result.data.map((datas) => datas.images.map((image) => image.url));
                setImagesData(allImages);
                // console.log(result.data.map((datas) => datas.images.map((image) => image.url)));
                window.location.href = `/PostDetail?searchResults=${encodedResults}`;
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={cx('wapper')}>
            <div className={cx('search')}>
                <Space direction="vertical">
                    <Search placeholder="Tìm kiếm" onSearch={handleSearch} style={{ width: 200 }} />
                </Space>
            </div>
            <span className={cx('title')}>Kết quả tìm kiếm</span>

            {Array.isArray(parsedResults?.data) && parsedResults.data.length > 0 ? (
                parsedResults.data.map((item, index) => {
                    const post = posts.find((post) => post.postId === item.postId);

                    if (post) {
                        return (
                            <div className={cx('list-event')} key={index}>
                                {post.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`img-${index}`} />
                                ))}
                                <div className={cx('details-event')}>
                                    <span>{post.metaTitle}</span>
                                    <p>{post.summary}</p>
                                    <div className={cx('createAt')}>
                                        <p>{formatDate(post.createdAt)}</p>
                                        <p>{post.categoryNames}</p>
                                    </div>
                                    <button
                                        className={cx('btn-viewpost')}
                                        onClick={() => handleButtonClick(post.postId)}
                                    >
                                        Xem bài đăng
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    return null;
                })
            ) : (
                <p>Không tìm thấy kết quả tìm kiếm.</p>
            )}
        </div>
    );
}

export default PostDetail;
