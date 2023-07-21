import React, { useState } from 'react';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import axios from 'axios';
function AddImage({ setCreatedImageData, closeModal, post }) {
    // const [image, setImage] = useState();
    const [Name, setName] = useState();
    const [Type, setType] = useState();
    const [imageFile, setImageFile] = useState();

    const handleAddImage = (e) => {
        // const file = e.target.files[0]

        // file.preview = URL.createObjectURL(file)

        setImageFile(e.target.files[0]);
    };

    const handleCreateQuestion = async () => {
        try {
            const formData = new FormData();
            formData.append('Name', Name);
            formData.append('Type', Type);
            formData.append('imageFile', imageFile);

            // Use the access token to send API request with Editor permission
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data', // Set the correct Content-Type
                },
            };

            const response = await axios.post(
                `https://vietnamhistory.azurewebsites.net/api/images/posts/${post}`,
                formData,
                config,
            );

            if (localStorage.getItem('role') === 'Editor') {
                console.log('Add Image:', response.data);
                setCreatedImageData((prevData) => [...prevData, response.data]);
                window.location.reload();
            }
            // Update the created question data
        } catch (error) {
            console.error('Error creating question:', error);
            // Handle the error
        }
    };
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm ảnh bài đăng</h1>
                </div>
                <div className="form-input">
                    <div className="body">
                        <label className="label-input">
                            <div className="input-detail">
                                <p>Tên ảnh: </p>
                                <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-detail">
                                <p>Loại: </p>
                                <select
                                    className="selecte-options"
                                    value={Type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="jpg">jpg</option>
                                    <option value="png">png</option>
                                </select>
                            </div>
                            <div className="input-detail">
                                <input
                                    type="file"
                                    // value={imageFile}
                                    onChange={handleAddImage}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={closeModal}>Close</Button>
                        <Button rounded onClick={handleCreateQuestion}>
                            Thêm ảnh
                        </Button>
                    </div>
                </div>
                {/* {image && (
                    <img src={image.preview} alt="" width="80%"/>
                )} */}
            </div>
        </div>
    );
}
export default AddImage;
