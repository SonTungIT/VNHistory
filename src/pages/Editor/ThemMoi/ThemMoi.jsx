import React, { useState } from 'react';
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
    const [category, setCategory] = useState([]);

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
            category,
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
        setCategory('');
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
                                        <p>parentId: </p>
                                        <input
                                            type="text"
                                            placeholder="parentId"
                                            value={parentId}
                                            onChange={(e) => setParentId(e.target.value)}
                                            required
                                        />
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
                                    <input
                                        type="text"
                                        placeholder="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
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
                <div className={cx('container-tm')}>
                    <PostMeta />
                </div>
                {/* <div className={cx('container-tm')}>
                    <PostCmt />
                </div> */}

                <div className={cx('footer')}></div>
            </LayoutAdmin>
        </>
    );
}

export default ThemMoi;
