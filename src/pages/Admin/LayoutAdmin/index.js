import React from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
    return (
        <div className={cx('content')}>
            <div className={cx('inner')}>{children}</div>
        </div>
    );
}

export default LayoutAdmin;
