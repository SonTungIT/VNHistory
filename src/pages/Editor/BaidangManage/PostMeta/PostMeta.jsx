import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostMeta.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { message } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function PostMeta({ closeModal }) {
    const [postId, setPostId] = useState('');
    const [keys, setKeys] = useState('');
    const [contents, setContents] = useState('');
    const [views, setViews] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    console.log(views);

    useEffect(() => {
        if (location.state && location.state.views) {
            setViews(location.state.views);
            if (location.state.views.length > 0) {
                setPostId(location.state.views[0].postId); // Set postId from views.postId
            }
        }
    }, [location]);

    useEffect(() => {
        // Lấy dữ liệu views từ state của react-router
        if (location.state && location.state.postId) {
            setPostId(location.state.postId);
        }
    }, [location]);

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

        fetch('https://vietnamhistory.azurewebsites.net/api/postmetas', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.message === 'PostMeta Created successfully') {
                    success();
                    closeModal(false);
                    navigate('/BaidangMange');
                } else {
                    showError(); // Call showError here if the API response is not successful
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

    console.log(postId);

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>Thêm Mới PostMeta</h2>
                    </div>
                    <form className="form-input" onSubmit={handleSubmit}>
                        <div className="body">
                            <label className="label-input">
                                <div className="input-detail">
                                    <p>Từ khóa: </p>
                                    <input
                                        type="text"
                                        placeholder="keys"
                                        value={keys}
                                        onChange={(e) => setKeys(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-detail">
                                    <p>Nội dung: </p>
                                    <input
                                        type="text"
                                        placeholder="contents"
                                        value={contents}
                                        onChange={(e) => setContents(e.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="footer">
                            <Button onClick={() => closeModal(false)}>Hủy bỏ</Button>
                            {contextHolder}
                            <Button type="submit" rounded>
                                Thêm
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostMeta;
