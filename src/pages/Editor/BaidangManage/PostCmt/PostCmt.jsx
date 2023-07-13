import React, { useState } from 'react';
import './PostCmt.scss';
import { message, DatePicker, Space } from 'antd';
import Button from '~/components/GlobalStyles/Layout/components/Button';

function PostCmt() {
    const [postId, setPostId] = useState('');
    const [parentId, setParentId] = useState(null);
    const [title, setTitle] = useState('');
    const [published, setPublished] = useState('');
    const [createdAt, setCreatedAt] = useState(null);
    const [publishedAt, setPublishedAt] = useState(null);
    const [contents, setContents] = useState('');

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

        const data = {
            postId,
            parentId,
            title,
            published,
            createdAt: createdAt ? createdAt.toISOString() : null,
            publishedAt: publishedAt ? publishedAt.toISOString() : null,
            contents,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow',
        };

        fetch('https://vietnamhistory.azurewebsites.net/api/postcomments', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.message === 'Post comment created successfully') {
                    success();
                    // Reset the form inputs after successful submission
                    setPostId('');
                    setParentId(null);
                    setTitle('');
                    setPublished('');
                    setCreatedAt(null);
                    setPublishedAt(null);
                    setContents('');
                }
            })
            .catch((error) => {
                console.log('error', error);
                showError();
            });
    };

    const handleCancel = () => {
        // Reset the form inputs
        setPostId('');
        setParentId(null);
        setTitle('');
        setPublished('');
        setCreatedAt(null);
        setPublishedAt(null);
        setContents('');
    };

    return (
        <>
            <div className="title-tm">
                <h2>Thêm Mới PostComments</h2>
            </div>
            <form className="form-input" onSubmit={handleSubmit}>
                <div className="body-tm">
                    <label className="label-input">
                        <div className="input-detail-tm">
                            <p>postId: </p>
                            <input
                                type="text"
                                placeholder="postId"
                                value={postId}
                                onChange={(e) => setPostId(e.target.value)}
                            />
                        </div>
                        <div className="input-detail-tm">
                            <p>parentId: </p>
                            <input
                                type="text"
                                placeholder="parentId"
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                            />
                        </div>
                        <div className="input-detail-tm">
                            <p>title: </p>
                            <input
                                type="text"
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-detail-tm">
                            <p>published: </p>
                            <input
                                type="text"
                                placeholder="published"
                                value={published}
                                onChange={(e) => setPublished(e.target.value)}
                            />
                        </div>
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
                        <div className="input-detail-tm">
                            <p>contents: </p>
                            <input
                                type="text"
                                placeholder="contents"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className="footer">
                    <Button onClick={handleCancel}>Hủy bỏ</Button>
                    {contextHolder}
                    <Button type="submit" rounded>
                        Thêm
                    </Button>
                </div>
            </form>
        </>
    );
}

export default PostCmt;
