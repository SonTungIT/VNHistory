import React, { useState } from 'react';
import './EditMetaModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { message } from 'antd';

function EditMetaModal({ closeModal, postmeta }) {
    const [postId, setPostId] = useState('');
    const [keys, setKeys] = useState('');
    const [contents, setContents] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
        });
    };

    const showError = () => {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật thất bại',
        });
    };

    const handleUpdate = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var raw = JSON.stringify({
            postId: postId,
            keys: keys,
            contents: contents,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch(`https://vietnam-history.azurewebsites.net/api/postmetas/${postmeta.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.message === 'PostMeta updated successfully') {
                    success();
                }
            })
            .catch((error) => {
                console.log('error', error);
                showError();
            });
    };

    return (
        <>
            {updateSuccess ? null : (
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="title">
                            <h1>Cập Nhật Thể Loại</h1>
                        </div>
                        <div className="form-input">
                            <div className="body">
                                <div>Cài Đặt</div>
                                <label className="label-input">
                                    <div className="input-detail">
                                        <p>postId: </p>
                                        <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} />
                                    </div>
                                    <div className="input-detail">
                                        <p>keys: </p>
                                        <input type="text" value={keys} onChange={(e) => setKeys(e.target.value)} />
                                    </div>
                                    <div className="input-detail">
                                        <p>contents: </p>
                                        <input
                                            type="text"
                                            value={contents}
                                            onChange={(e) => setContents(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="ant-divider" role="separator"></div>
                            <div className="footer">
                                {contextHolder}
                                <Button rounded onClick={handleUpdate}>
                                    Update
                                </Button>
                                <Button onClick={closeModal}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditMetaModal;
