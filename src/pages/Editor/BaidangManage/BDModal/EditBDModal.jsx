import React, { useState } from 'react';
import './BDModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space } from 'antd';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';

function EditBDModal({ closeModal, post }) {
    const [authorId, setAuthorId] = useState(post.authorId);
    const [parentId, setParentId] = useState(post.parentId);
    const [metaTitle, setMetaTitle] = useState(post.metaTitle);
    const [slug, setSlug] = useState(post.slug);
    const [summary, setSummary] = useState(post.summary);
    const [published, setPublished] = useState(post.published);
    const [startDate, setStartDate] = useState(null);
    const [updateDate, setUpdateDate] = useState(null);
    const [publishedDate, setPublishedDate] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [content, setContent] = useState(post.content);

    const handleUpdate = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const updatedPost = {
            authorId,
            parentId: parentId ? parentId : null,
            metaTitle,
            slug,
            summary,
            published,
            createdAt: startDate ? startDate.toISOString() : null,
            updatedAt: updateDate ? updateDate.toISOString() : null,
            publishedAt: publishedDate ? publishedDate.toISOString() : null,
            content,
        };

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(updatedPost),
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/posts/${post.postId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result); // Handle the response as needed
                setUpdateSuccess(true); // Set updateSuccess state to true to close the modal or show a success message
            })
            .catch((error) => console.log('error', error));
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleUpdateDateChange = (date) => {
        setUpdateDate(date);
    };

    const handlePublishedDateChange = (date) => {
        setPublishedDate(date);
    };

    return (
        <>
            <LayoutAdmin>
                {updateSuccess ? null : (
                    <div className="modalBackground">
                        <div className="modalContainer-bd">
                            <div className="title-tm">
                                <h1>Cập Nhật Bài Đăng</h1>
                            </div>
                            <div className="form-input-bd">
                                <div className="body">
                                    <label className="label-input">
                                        <div className="input-detail-bd">
                                            <p>authorId: </p>
                                            <input
                                                type="text"
                                                value={authorId}
                                                onChange={(e) => setAuthorId(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>parentId: </p>
                                            <input
                                                type="text"
                                                value={parentId}
                                                onChange={(e) => setParentId(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>metaTitle: </p>
                                            <input
                                                type="text"
                                                value={metaTitle}
                                                onChange={(e) => setMetaTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>slug: </p>
                                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>summary: </p>
                                            <input
                                                type="text"
                                                value={summary}
                                                onChange={(e) => setSummary(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>published: </p>
                                            <input
                                                type="text"
                                                value={published}
                                                onChange={(e) => setPublished(e.target.value)}
                                            />
                                        </div>
                                        <div className="selectDate">
                                            <div className="input-detail-bd">
                                                <p>createdAt: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={startDate}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Space>
                                            </div>
                                            <div className="input-detail-bd">
                                                <p>updatedAt: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={updateDate}
                                                        onChange={handleUpdateDateChange}
                                                    />
                                                </Space>
                                            </div>
                                            <div className="input-detail-bd">
                                                <p>publishedAt: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={publishedDate}
                                                        onChange={handlePublishedDateChange}
                                                    />
                                                </Space>
                                            </div>
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>content: </p>
                                            <input
                                                type="text"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="ant-divider" role="separator"></div>
                                <div className="footer">
                                    <Button onClick={closeModal}>Close</Button>
                                    <Button rounded onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </LayoutAdmin>
        </>
    );
}

export default EditBDModal;
