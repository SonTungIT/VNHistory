import React, { useState } from 'react';
import './BDModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space, message } from 'antd';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function EditBDModal({ closeModal, post, posts }) {
    const [authorId, setAuthorId] = useState(post.authorId);
    const [parentId, setParentId] = useState(post.parentId);
    const [metaTitle, setMetaTitle] = useState(post.metaTitle);
    const [slug, setSlug] = useState(post.slug);
    const [summary, setSummary] = useState(post.summary);
    const [published, setPublished] = useState(post.published);
    const [startDate, setStartDate] = useState(post.createdAt ? moment(post.createdAt) : null);
    const [updateDate, setUpdateDate] = useState(null);
    const [publishedDate, setPublishedDate] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [content, setContent] = useState(post.content);
    const navigate = useNavigate();
    const [modeChangedToPublic, setModeChangedToPublic] = useState(false);

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

    console.log(posts);

    const handleUpdate = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const currentDateTime = new Date();
        setUpdateDate(currentDateTime);

        const isModeChangedToPublic =
            published === '1' && (!post.published || !publishedDate || publishedDate !== post.publishedAt);

        const updatedPost = {
            // authorId,
            parentId: parentId ? parentId : null,
            metaTitle,
            slug,
            summary,
            published,
            createdAt: startDate ? startDate.toISOString() : null,
            updatedAt: currentDateTime.toISOString(),
            publishedAt: isModeChangedToPublic ? currentDateTime.toISOString() : post.publishedAt,
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
                if (result.message === 'Post updated successfully') {
                    success();
                    console.log(result); // Handle the response as needed
                    setUpdateSuccess(true); // Set updateSuccess state to true to close the modal or show a success message
                    navigate('/BaidangMange');
                    window.location.reload();
                } else {
                    showError(); // Call showError here if the API response is not successful
                }
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

    const handlePublishedChange = (value) => {
        setPublished(value);
        if (value === '1') {
            setModeChangedToPublic(true);
        }
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
                                        {/* <div className="input-detail-bd">
                                            <p>authorId: </p>
                                            <input
                                                type="text"
                                                value={authorId}
                                                onChange={(e) => setAuthorId(e.target.value)}
                                            />
                                        </div> */}
                                        <div className="input-detail-bd">
                                            <p>Bài đăng trước: </p>
                                            <select
                                                className="selecte-options"
                                                value={parentId}
                                                onChange={(e) => setParentId(e.target.value)}
                                            >
                                                <option value="">Chọn bài đăng trước</option>
                                                {posts.map((post) => (
                                                    <option key={post.postId} value={post.postId}>
                                                        {post.metaTitle} - {post.postId}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>Tiêu đề: </p>
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
                                            <p>Tóm tắt: </p>
                                            <input
                                                type="text"
                                                value={summary}
                                                onChange={(e) => setSummary(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>Chế độ: </p>
                                            <select
                                                className="selecte-options"
                                                value={published}
                                                onChange={(e) => handlePublishedChange(e.target.value)}
                                                required
                                            >
                                                <option value="1">Công khai</option>
                                                <option value="0">Riêng tư</option>
                                            </select>
                                        </div>
                                        <div className="selectDate">
                                            {/* <div className="input-detail-bd">
                                                <p>Ngày tạo: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={startDate}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Space>
                                            </div> */}
                                            {/* <div className="input-detail-bd">
                                                <p>updatedAt: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={updateDate}
                                                        onChange={handleUpdateDateChange}
                                                    />
                                                </Space>
                                            </div> */}
                                            {/* <div className="input-detail-bd">
                                                <p>Ngày công khai: </p>
                                                <Space direction="vertical">
                                                    <DatePicker
                                                        className="inp-form"
                                                        value={publishedDate}
                                                        onChange={handlePublishedDateChange}
                                                    />
                                                </Space>
                                            </div> */}
                                        </div>
                                        <div className="input-detail-bd">
                                            <p>Nội dung: </p>
                                            <input
                                                type="text"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                required
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
                                    {contextHolder}
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
