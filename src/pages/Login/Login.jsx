import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Input, Space } from 'antd';

const { Search } = Input;

const cx = classNames.bind(styles);

function Login() {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [imagesData, setImagesData] = useState();

    useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);

    const fetchData = () => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch('https://vietnamhistory.azurewebsites.net/api/posts', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setPosts(result.data);
                console.log(result);
                const allImages = result.data.map((datas) => datas.images.map((image) => image.url));
                // console.error('Két quả 222:', result.data.map((datas) => datas.images.map((image) => image.url)));
                setImagesData(allImages);
            })
            .catch((error) => console.log('error', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    const handleButtonClick = (postId) => {
        setSelectedPostId(postId);
        window.location.href = `/post?postId=${postId}`;
    };

    const [topTenUsers, setTopTenUsers] = useState([]);
    const [selectedData, setSelectedData] = useState('getTopTenUser');

    useEffect(() => {
        fetchRank();
    }, [selectedData]);

    const fetchRank = () => {
        let url =
            selectedData === 'getTopTenUser'
                ? 'https://vietnamhistory.azurewebsites.net/api/User/getTopTenUser'
                : 'https://vietnamhistory.azurewebsites.net/api/User/getTopTenUsersByMonth';

        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setTopTenUsers(result.data);
            })
            .catch((error) => console.log('Error fetching data:', error));
    };

    const handleButtonClickRank = (data) => {
        setSelectedData(data);
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
            <div className={cx('inner')}>
                {posts.length > 0 && (
                    <Button
                        className={cx('content')}
                        key={posts[0].postId}
                        onClick={() => handleButtonClick(posts[0].postId)}
                    >
                        <div className={cx('title')}>{posts[0].metaTitle}</div>
                        <div className={cx('poster')}>
                            {imagesData[0].map((imageUrl, index) => (
                                <img key={index} src={imageUrl} alt={`img-${index}`} />
                            ))}
                            <div className={cx('details')}>
                                <span>{posts[0].summary}</span>
                                <p>{formatDate(posts[0].createdAt)}</p>
                            </div>
                        </div>
                    </Button>
                )}
                <div className={cx('rank')}>
                    <div className={cx('header')}>
                        <span className={cx('title')}>BXH</span>
                        <div className={cx('button')}>
                            <Button small onClick={() => handleButtonClickRank('getTopTenUsersByMonth')}>
                                Tháng
                            </Button>
                            <Button small onClick={() => handleButtonClickRank('getTopTenUser')}>
                                Tổng
                            </Button>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <table className={cx('table-home')}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topTenUsers.map((user, index) => (
                                    <tr className={cx('table-tr')} key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email.replace(/(?<=.{3}).(?=[^@]*?@)/g, '*')}</td>
                                        <td>{user.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {posts.slice(1).map((post) => (
                <Button key={post.postId} onClick={() => handleButtonClick(post.postId)}>
                    <div className={cx('list-event')}>
                        {post.images.map((image, index) => (
                            <img key={index} src={image.url} alt={`img-${index}`} />
                        ))}
                        <div className={cx('details-event')}>
                            <span>{post.metaTitle}</span>
                            <p>{post.summary}</p>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
}

export default Login;
