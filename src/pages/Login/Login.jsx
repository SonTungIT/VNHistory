import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';

const cx = classNames.bind(styles);

function Login() {

    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

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
        let url = selectedData === 'getTopTenUser' ? 'https://vietnamhistory.azurewebsites.net/api/User/getTopTenUser' : 'https://vietnamhistory.azurewebsites.net/api/User/getTopTenUsersByMonth';

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

    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                {posts.length > 0 && (
                    <Button
                        to={config.routes.Post}
                        className={cx('content')}
                        key={posts[0].postId}
                        onClick={() => handleButtonClick(posts[0].postId)}
                    >
                        <div className={cx('title')}>{posts[0].metaTitle}</div>
                        <div className={cx('poster')}>
                            <img
                                src="https://giasuviet.com.vn/wp-content/uploads/2015/09/phuong-phap-hoc-mon-lich-su-lop-12-hieu-qua-va-nho-lau.jpg"
                                alt="img"
                            />
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
                <Button to={config.routes.Post} key={post.postId} onClick={() => handleButtonClick(post.postId)}>
                    <div className={cx('list-event')}>
                        <img
                            src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                            alt="img"
                        />
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
