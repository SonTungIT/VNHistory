import React, { useState } from 'react';
import './PostMeta.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { message } from 'antd';

function PostMeta() {
    const [postId, setPostId] = useState('');
    const [keys, setKeys] = useState('');
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

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var raw = JSON.stringify({
            postId: postId,
            keys: keys,
            contents: contents,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://vietnam-history.azurewebsites.net/api/postmetas', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.message === 'PostMeta Created successfully') {
                    success();
                }
            })
            .catch((error) => {
                console.log('error', error);
                showError();
            });

        // Reset the form inputs after submission
        setPostId('');
        setKeys('');
        setContents('');
    };

    const handleCancel = () => {
        setPostId('');
        setKeys('');
        setContents('');
    };

    return (
        <>
            <div className="title-tm">
                <h2>Thêm Mới PostMeta</h2>
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
                            <p>keys: </p>
                            <input
                                type="text"
                                placeholder="keys"
                                value={keys}
                                onChange={(e) => setKeys(e.target.value)}
                            />
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

export default PostMeta;
