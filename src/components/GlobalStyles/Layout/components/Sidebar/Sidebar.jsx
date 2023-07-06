import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { MenuCollapseIcon, IconWallet } from '../Icons';
import { Button, Divider, Popover, Segmented } from 'antd';

const cx = classNames.bind(styles);

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://vietnam-history.azurewebsites.net/api/Categories');
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <h4>Thể Loại</h4>
                {categories.map((category) => (
                    <div key={category.categoryId} className={cx('cate-name')}>
                        {category.categoryName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
