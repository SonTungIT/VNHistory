import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space } from 'antd';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

function EditModal({ eventId, closeModal }) {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleUpdate = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var raw = JSON.stringify({
            eventName: 'Trận đánh điện biên phủ',
            startDate: '1999-07-02T09:10:47.556Z',
            endDate: '1999-07-02T09:10:47.556Z',
            description: 'lesontung',
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://vietnam-history.azurewebsites.net/api/events/1', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Cập Nhật Sự Kiện</h1>
                </div>
                <form className="form-input" onSubmit={handleUpdate}>
                    <div className="body">
                        <div>Cài Đặt</div>
                        <label className="label-input">
                            <div className="input-detail">
                                <p>Tên sự kiện: </p>
                                <input
                                    type="text"
                                    placeholder="Tên sự kiện"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                            <div className="input-detail">
                                <p>Ngày bắt đầu: </p>
                                <Space direction="vertical">
                                    <DatePicker
                                        className="inp-form"
                                        placeholder="Ngày bắt đầu"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                    />
                                </Space>
                            </div>
                            <div className="input-detail">
                                <p>Ngày kết thúc: </p>
                                <Space direction="vertical">
                                    <DatePicker
                                        className="inp-form"
                                        placeholder="Ngày kết thúc"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                    />
                                </Space>
                            </div>
                            <div className="input-detail">
                                <p>Mô tả: </p>
                                <input
                                    type="text"
                                    placeholder="Mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={() => closeModal(false)}>Cancel</Button>
                        <Button type="submit" rounded>
                            Cập Nhật
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
