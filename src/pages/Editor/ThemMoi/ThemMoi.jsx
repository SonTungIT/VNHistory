import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './ThemMoi.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { LeftArrowIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';
import { DatePicker, Space, message } from 'antd';
import PostMeta from '../BaidangManage/PostMeta/PostMeta';
import PostCmt from '../BaidangManage/PostCmt/PostCmt';
import moment from 'moment'; // Import moment here
import { Select } from 'antd';

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const cx = classNames.bind(styles);

function ThemMoi() {
    const [parentId, setParentId] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [published, setPublished] = useState('1');
    const [createdAt, setCreatedAt] = useState(moment());
    const [updatedAt, setUpdatedAt] = useState(null);
    const [publishedAt, setPublishedAt] = useState(null);
    const [content, setContent] = useState('');
    const [categoryNames, setCategoryNames] = useState([]);
    const [eventNames, setEventNames] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    const handleChange = (value) => {
        setCategoryNames(value);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm mới thành công',
        });
    };

    const showError = () => {
        messageApi.open({
            type: 'error',
            content: 'Somethings wrong !',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const currentDateTime = moment().toISOString();

        const eventNamesArray = eventNames.split(',').map((eventName) => eventName.trim());

        const payload = {
            parentId: parentId ? Number(parentId) : null,
            metaTitle,
            slug,
            summary,
            published: Number(published),
            createdAt: currentDateTime,
            updatedAt: currentDateTime,
            publishedAt: currentDateTime,
            content,
            categoryNames,
            eventNames: eventNamesArray,
        };

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
            redirect: 'follow',
        };
        fetch('https://vietnamhistory.azurewebsites.net/api/posts', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.message === 'Post created successfully') {
                    success();
                } else {
                    showError(); // Call showError here if the API response is not successful
                }
            })
            .catch((error) => {
                console.log('error', error);
                showError();
            });
    };

    const handleCancel = () => {
        setParentId('');
        setMetaTitle('');
        setSlug('');
        setSummary('');
        setPublished('');
        setCreatedAt(null);
        setUpdatedAt(null);
        setPublishedAt(null);
        setContent('');
        setCategoryNames('');
        setEventNames('');
    };

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

    useEffect(() => {
        // Fetch data from the API
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
            return;
        }
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

        fetch('https://vietnamhistory.azurewebsites.net/api/events', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setEvents(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header-tm')}>
                    <Button leftIcon={<LeftArrowIcon />} to={config.routes.BaidangMange}>
                        Quản lý bài đăng
                    </Button>
                    <h1 className="title-tm"> Thêm mới bài đăng</h1>
                </div>
                <div className={cx('container-tm')}>
                    <div className="title-tm">
                        <h2>Thông tin cơ bản</h2>
                    </div>
                    <form className="form-input" onSubmit={handleSubmit}>
                        <div className="body-tm">
                            <label className="label-input" required>
                                {/* parentId */}
                                {parentId !== null && (
                                    <div className="input-detail-tm">
                                        <p>Bài đăng trước: </p>
                                        <select
                                            className="selecte-options"
                                            value={parentId}
                                            onChange={(e) => setParentId(e.target.value)}
                                        >
                                            <option value="">Chọn bài đăng trước</option>
                                            <option value={null}>Không có</option>
                                            {posts.map((post) => (
                                                <option key={post.postId} value={post.postId}>
                                                    {post.metaTitle} - {post.postId}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {/* metaTitle */}
                                <div className="input-detail-tm">
                                    <p>Tiêu Đề:</p>
                                    <input
                                        type="text"
                                        placeholder="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* slug */}
                                <div className="input-detail-tm">
                                    <p>slug: </p>
                                    <input
                                        type="text"
                                        placeholder="slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* summary */}
                                <div className="input-detail-tm">
                                    <p>Tóm tắt: </p>
                                    <input
                                        type="text"
                                        placeholder="summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* published */}
                                <div className="input-detail-tm">
                                    <p>Chế độ: </p>
                                    <select
                                        className="selecte-options"
                                        value={published}
                                        onChange={(e) => setPublished(e.target.value)}
                                        required
                                    >
                                        <option value="1">Công khai</option>
                                        <option value="0">Riêng tư</option>
                                    </select>
                                </div>
                                {/* createdAt */}
                                {/* You can add the createdAt input here if it's required */}

                                {/* content */}
                                <div className="input-detail-tm">
                                    <p>Nội dung: </p>
                                    <input
                                        type="text"
                                        placeholder="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* category */}
                                <div className="input-detail-tm">
                                    <p>Thể loại: </p>
                                    <select
                                        className="selecte-options"
                                        value={categoryNames}
                                        onChange={(e) =>
                                            setCategoryNames(
                                                Array.from(e.target.selectedOptions, (option) => option.value),
                                            )
                                        }
                                        required
                                    >
                                        <option value="">Chọn thể loại</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* eventNames */}
                                <div className="input-detail-tm">
                                    <p>Sự kiện: </p>
                                    <select
                                        className="selecte-options"
                                        value={eventNames.split(',').join(', ')}
                                        onChange={(e) => setEventNames(e.target.value)}
                                    >
                                        <option value="">Chọn bài sự kiện</option>
                                        <option value={null}>Không có</option>
                                        {events.map((event) => (
                                            <option key={event.eventId} value={event.eventId}>
                                                {event.eventName} - {event.eventId}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                        </div>

                        <div className="footer">
                            <Button onClick={handleCancel}>Hủy bỏ</Button>
                            {contextHolder}
                            <Space>
                                <Button type="submit" rounded>
                                    Thêm
                                </Button>
                            </Space>
                        </div>
                    </form>
                </div>
                {/* <div className={cx('container-tm')}>
                    <PostMeta />
                </div> */}
                {/* <div className={cx('container-tm')}>
                    <PostCmt />
                </div> */}

                <div className={cx('footer')}></div>
            </LayoutAdmin>
        </>
    );
}

export default ThemMoi;
