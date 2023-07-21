import React, { useState, useEffect } from 'react';
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

    console.log(views);

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const location = useLocation();

    useEffect(() => {
        // Lấy dữ liệu views từ state của react-router
        if (location.state && location.state.views) {
            setViews(location.state.views);
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
                    window.location.reload();
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
    };

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
                                    <p>keys: </p>
                                    <input
                                        type="text"
                                        placeholder="keys"
                                        value={keys}
                                        onChange={(e) => setKeys(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-detail">
                                    <p>contents: </p>
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
