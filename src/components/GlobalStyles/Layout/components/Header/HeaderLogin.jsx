import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import Button from '../Button';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-details')} src={require('../../../../../images/logo.png')} alt="logo" />
                    <div className={cx('right-logo')}>VNHistory</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('icon-items')}></div>
                    {/* <div className={cx('btn-user-avatar')}>
                        <img
                            className={cx('user-avatar')}
                            src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg"
                            alt="avatar"
                        />
                        <div className={cx('name')}>
                            <span className={cx('user-name')}>Tung</span>
                            <span className={cx('logout')}>Log out</span>
                        </div>
                    </div> */}
                    <div className={cx('btn-login')}>
                        <Button small>Login</Button>
                    </div>
                    <div className={cx('btn-signup')}>
                        <Button small>Sign up</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
