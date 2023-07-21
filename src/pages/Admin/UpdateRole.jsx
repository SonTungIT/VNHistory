import React, { useState } from 'react';
import './UpdateRole.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { message } from 'antd';

function UpdateRole({ closeModal, user }) {
    const [role, setRole] = useState(''); // State to hold the input value for role
    const [updateSuccess, setUpdateSuccess] = useState(false); // State to track if the update was successful

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

    console.log(user);
    const handleUpdate = () => {
        const accessToken = localStorage.getItem('accessToken');
        const url = `https://vietnamhistory.azurewebsites.net/api/User/UpdateRole`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                userId: user.userId,
                role: role,
            }),
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                if (result.message === 'Update role successfully') {
                    success();
                    setUpdateSuccess(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    showError(); // Call showError here if the API response is not successful
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
    };

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h1>Cập Nhật Chức Vụ</h1>
                    </div>
                    <div className="form-input">
                        <div className="body">
                            <label className="label-input">
                                <div className="input-detail">
                                    <p>role: </p>
                                    <select
                                        className="selecte-options"
                                        value={role}
                                        onChange={(event) => setRole(event.target.value)}
                                        placeholder="Select a role"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Member">Member</option>
                                        <option value="Editor">Editor</option>
                                    </select>
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
        </>
    );
}

export default UpdateRole;
