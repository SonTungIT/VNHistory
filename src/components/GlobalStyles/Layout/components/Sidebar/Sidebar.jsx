import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { MenuCollapseIcon, IconWallet } from '../Icons';
import { Button, Divider, Popover, Segmented } from 'antd';

const cx = classNames.bind(styles);

const text = <span>Thể loại</span>;
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
const buttonWidth = 70;

function Sidebar() {
    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);
    const mergedArrow = useMemo(() => {
        if (arrowAtCenter)
            return {
                pointAtCenter: true,
            };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <h4>Thể Loại</h4>
                <div className={cx('cate-name')}>Công nghệ mới</div>
                <div className={cx('cate-name')}>Công nghệ mới</div>
                <div className={cx('cate-name')}>Công nghệ mới</div>
                <div className={cx('cate-name')}>Công nghệ mới</div>
            </div>
        </div>
    );
}

export default Sidebar;
