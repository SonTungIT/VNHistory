import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const userName = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
            };

            const response = await fetch('https://vietnam-history.azurewebsites.net/api/Auth/logout', requestOptions);
            const result = await response.text();

            if (result === 'Logout successfully.') {
                // Xóa thông tin người dùng khỏi localStorage
                localStorage.clear();
                // Chuyển hướng đến trang đăng nhập
                navigate('/signIn');
            }
        } catch (error) {
            console.log('error', error);
            setError('Logout failed');
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-details')} src={require('../../../../../images/logo.png')} alt="logo" />
                    <div className={cx('right-logo')}>VNHistory</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('icon-items')}></div>
                    <div className={cx('btn-user-avatar')}>
                        <img
                            className={cx('user-avatar')}
                            src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg"
                            alt="avatar"
                        />
                        <div className={cx('name')}>
                            <span className={cx('user-name')}>{userName}</span>
                            <button className={cx('logout')} onClick={handleLogout}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
