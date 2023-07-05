import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';

const cx = classNames.bind(styles);

function Login() {
    const data = [
        { No: 1, Tên: 'Tùng', Email: 'tu*****on@gmail.com', Score: 85 },
        { No: 2, Tên: 'Công', Email: 'nguy****ng@gmail.com', Score: 92 },
        { No: 3, Tên: 'Trung', Email: 'trun****yen@gmail.com', Score: 78 },
        { No: 4, Tên: 'Văn', Email: 'van****yen@gmail.com', Score: 89 },
    ];

    const [posts, setPosts] = useState([]);

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

        fetch('https://vietnam-history.azurewebsites.net/api/posts', requestOptions)
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
        window.location.href = `/post?postId=${postId}`;
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
                            <Button small> Tháng </Button>
                            <Button small> Tổng </Button>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr className={cx('table-tr')} key={item.No}>
                                        <td>{item.No}</td>
                                        <td>{item.Tên}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {posts.slice(1).map((post) => (
                <Button to={config.routes.Post} key={post.postId} onClick={() => handleButtonClick(posts[1].postId)}>
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
