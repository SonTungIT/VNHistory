import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space } from 'antd';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

function ImportModal({ closeModal }) {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const eventData = {
            eventName,
            startDate,
            endDate,
            description,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(eventData),
            redirect: 'follow',
        };

        fetch('https://vietnam-history.azurewebsites.net/api/events', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                closeModal(false);
            })
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
                    <h1>Thêm Mới Sự Kiện</h1>
                </div>
                <form className="form-input" onSubmit={handleSubmit}>
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
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ImportModal;
