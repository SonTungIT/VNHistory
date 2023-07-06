import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostDetail() {
    const location = useLocation();
    const searchResults = new URLSearchParams(location.search).get('searchResults');
    const parsedResults = JSON.parse(searchResults);

    return (
        <div className={cx('wapper')}>
            <span className={cx('title')}>Kết quả tìm kiếm</span>

            {Array.isArray(parsedResults?.data) &&
                parsedResults.data.map((item, index) => (
                    <div className={cx('list-event')}>
                        <img
                            src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                            alt="img"
                        />

                        <div className={cx('details-event')} key={index}>
                            <span>{item.metaTitle}</span>
                            <p>{item.summary}</p>
                            <p>{item.createdAt}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default PostDetail;
