import React, { useState } from 'react';
import './CateModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';

function CateModal({ closeModal }) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var raw = JSON.stringify({
            categoryName: categoryName,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://vietnamhistory.azurewebsites.net/api/Categories/createCategory', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setCategoryName('');
                closeModal(false);

                // Reload the TableTL page after successfully adding a new category
                window.location.reload();
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm Mới Thể Loại</h1>
                </div>
                <form className="form-input" onSubmit={handleSubmit}>
                    <div className="body">
                        <div>Cài Đặt</div>
                        <label className="label-input">
                            <div className="input-detail">
                                <p>Tên thể loại: </p>
                                <input
                                    type="text"
                                    placeholder="Tên thể loại"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={() => closeModal(false)}>Cancel</Button>
                        <Button type="submit" rounded>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CateModal;
