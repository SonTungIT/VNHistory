import React, { useState } from 'react';
import Button from '~/components/GlobalStyles/Layout/components/Button';

function AddImage(closeModal) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm ảnh bài đăng</h1>
                </div>
            </div>
        </div>
    );
}

export default AddImage;
