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

const cx = classNames.bind(styles);

function ThemMoi() {
    const [parentId, setParentId] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [published, setPublished] = useState('');
    const [createdAt, setCreatedAt] = useState(null);
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
            content: 'Thêm mới thất bại',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const payload = {
            parentId: parentId ? Number(parentId) : null,
            metaTitle,
            slug,
            summary,
            published: Number(published),
            createdAt: createdAt ? createdAt.toISOString() : null,
            updatedAt: updatedAt ? updatedAt.toISOString() : null,
            publishedAt: publishedAt ? publishedAt.toISOString() : null,
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
                            <label className="label-input">
                                {/* parentId */}
                                <div className="input-detail-tm">
                                    <p>parentId: </p>
                                    <input
                                        type="text"
                                        placeholder="parentId"
                                        value={parentId}
                                        onChange={(e) => setParentId(e.target.value)}
                                    />
                                </div>
                                {/* metaTitle */}
                                <div className="input-detail-tm">
                                    <p>metaTitle: </p>
                                    <input
                                        type="text"
                                        placeholder="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
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
                                    />
                                </div>
                                {/* summary */}
                                <div className="input-detail-tm">
                                    <p>summary: </p>
                                    <input
                                        type="text"
                                        placeholder="summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                    />
                                </div>
                                {/* published */}
                                <div className="input-detail-tm">
                                    <p>published: </p>
                                    <input
                                        type="text"
                                        placeholder="published"
                                        value={published}
                                        onChange={(e) => setPublished(e.target.value)}
                                    />
                                </div>
                                {/* createdAt */}
                                <div className="selectDate">
                                    <div className="input-detail-tm">
                                        <p>createdAt: </p>
                                        <Space direction="vertical">
                                            <DatePicker
                                                className="inp-form"
                                                placeholder="createdAt"
                                                value={createdAt}
                                                onChange={(date) => setCreatedAt(date)}
                                            />
                                        </Space>
                                    </div>
                                    {/* updatedAt */}
                                    <div className="input-detail-tm">
                                        <p>updatedAt: </p>
                                        <Space direction="vertical">
                                            <DatePicker
                                                className="inp-form"
                                                placeholder="updatedAt"
                                                value={updatedAt}
                                                onChange={(date) => setUpdatedAt(date)}
                                            />
                                        </Space>
                                    </div>
                                    {/* publishedAt */}
                                    <div className="input-detail-tm">
                                        <p>publishedAt: </p>
                                        <Space direction="vertical">
                                            <DatePicker
                                                className="inp-form"
                                                placeholder="publishedAt"
                                                value={publishedAt}
                                                onChange={(date) => setPublishedAt(date)}
                                            />
                                        </Space>
                                    </div>
                                </div>
                                {/* content */}
                                <div className="input-detail-tm">
                                    <p>content: </p>
                                    <input
                                        type="text"
                                        placeholder="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                {/* category */}
                                <div className="input-detail-tm">
                                    <p>category: </p>
                                    <input
                                        type="text"
                                        placeholder="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
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
