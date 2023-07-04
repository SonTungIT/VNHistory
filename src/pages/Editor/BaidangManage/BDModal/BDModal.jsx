import React, { useState } from 'react';
import './BDModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space } from 'antd';

function BDModal({ closeModal }) {
    const [authorId, setAuthorId] = useState('');
    const [parentId, setParentId] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [published, setPublished] = useState('');
    const [createdAt, setCreatedAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const [publishedAt, setPublishedAt] = useState(null);
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const payload = {
            authorId: Number(authorId),
            parentId: parentId ? Number(parentId) : null,
            metaTitle,
            slug,
            summary,
            published: Number(published),
            createdAt: createdAt ? createdAt.toISOString() : null,
            updatedAt: updatedAt ? updatedAt.toISOString() : null,
            publishedAt: publishedAt ? publishedAt.toISOString() : null,
            content,
        };

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload),
            redirect: 'follow',
        };

        fetch('https://vietnam-history.azurewebsites.net/api/posts', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                closeModal(false);
            })
            .catch((error) => console.log('error', error));
    };

    const handleCancel = () => {
        closeModal(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm Mới Bài Đăng</h1>
                </div>
                <form className="form-input" onSubmit={handleSubmit}>
                    <div className="body">
                        <div>Cài Đặt</div>
                        <label className="label-input">
                            {/* authorId */}
                            <div className="input-detail">
                                <p>authorId: </p>
                                <input
                                    type="text"
                                    placeholder="authorId"
                                    value={authorId}
                                    onChange={(e) => setAuthorId(e.target.value)}
                                />
                            </div>
                            {/* parentId */}
                            <div className="input-detail">
                                <p>parentId: </p>
                                <input
                                    type="text"
                                    placeholder="parentId"
                                    value={parentId}
                                    onChange={(e) => setParentId(e.target.value)}
                                />
                            </div>
                            {/* metaTitle */}
                            <div className="input-detail">
                                <p>metaTitle: </p>
                                <input
                                    type="text"
                                    placeholder="metaTitle"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                />
                            </div>
                            {/* slug */}
                            <div className="input-detail">
                                <p>slug: </p>
                                <input
                                    type="text"
                                    placeholder="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div>
                            {/* summary */}
                            <div className="input-detail">
                                <p>summary: </p>
                                <input
                                    type="text"
                                    placeholder="summary"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>
                            {/* published */}
                            <div className="input-detail">
                                <p>published: </p>
                                <input
                                    type="text"
                                    placeholder="published"
                                    value={published}
                                    onChange={(e) => setPublished(e.target.value)}
                                />
                            </div>
                            {/* createdAt */}
                            <div className="input-detail">
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
                            <div className="input-detail">
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
                            <div className="input-detail">
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
                            {/* content */}
                            <div className="input-detail">
                                <p>content: </p>
                                <input
                                    type="text"
                                    placeholder="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" rounded>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BDModal;
