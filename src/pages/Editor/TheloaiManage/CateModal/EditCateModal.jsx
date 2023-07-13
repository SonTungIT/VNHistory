import React, { useState } from 'react';
import './CateModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';

function EditCateModal({ closeModal, category }) {
    const [cateName, setCateName] = useState(category.categoryName);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleUpdate = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var raw = JSON.stringify({
            categoryId: category.categoryId,
            categoryName: cateName,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://vietnamhistory.azurewebsites.net/api/Categories/updateCategory', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setUpdateSuccess(true); // Update success flag
            })
            .catch((error) => console.log('error', error));
    };

    const handleInputChange = (e) => {
        setCateName(e.target.value); // Update cateName state with input value
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
                                        <p>Tên thể loại: </p>
                                        <input type="text" value={cateName} onChange={handleInputChange} />
                                    </div>
                                </label>
                            </div>
                            <div className="ant-divider" role="separator"></div>
                            <div className="footer">
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

export default EditCateModal;
