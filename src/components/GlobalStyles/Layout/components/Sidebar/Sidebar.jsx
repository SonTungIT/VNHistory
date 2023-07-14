import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { MenuCollapseIcon, IconWallet } from '../Icons';
import { Button, Divider, Popover, Segmented } from 'antd';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// Sidebar.js

function Sidebar({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://vietnamhistory.azurewebsites.net/api/Categories');
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const handleCategoryClick = async (categoryName) => {
        try {
            const encodedCategoryName = encodeURIComponent(categoryName);
            const response = await fetch(
                `https://vietnamhistory.azurewebsites.net/api/posts/search?categoryName=${encodedCategoryName}`,
            );
            const data = await response.json();

            // Pass the retrieved data to the parent component
            onCategoryClick(data);
        } catch (error) {
            console.log('Error fetching posts:', error);
        }
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-container')}>
                <h4>Thể Loại</h4>
                {categories.map((category) => (
                    <Link
                        key={category.categoryId}
                        to={`/postdetail?category=${encodeURIComponent(category.categoryName)}`}
                        className={cx('cate-name')}
                        onClick={() => handleCategoryClick(category.categoryName)}
                    >
                        {category.categoryName}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
