import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLogin.module.scss';
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
                    <div className={cx('btn-login')}>
                        <Button small to={config.routes.signIn}>
                            Login
                        </Button>
                    </div>
                    {/* <div className={cx('btn-signup')}>
                        <Button small>Sign up</Button>
                    </div> */}
                </div>
            </div>
        </header>
    );
}

export default Header;
