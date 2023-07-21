import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { DatePicker, Space } from 'antd';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

function EditModal({ closeModal, event }) {
    const [eventName, setEventName] = useState(event.eventName);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState(event.description);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleUpdate = () => {
        const accessToken = localStorage.getItem('accessToken');
        const url = `https://vietnamhistory.azurewebsites.net/api/events/${event.eventId}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                eventName,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                description,
            }),
        };

        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setUpdateSuccess(true);
            })
            .catch((error) => {
                console.log('Error', error);
                // Handle error
            });
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <>
            {updateSuccess ? null : (
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="title">
                            <h1>Cập Nhật Sự Kiện</h1>
                        </div>
                        <div className="form-input">
                            <div className="body">
                                <label className="label-input">
                                    <div className="input-detail">
                                        <p>Tên sự kiện: </p>
                                        <input
                                            type="text"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-detail">
                                        <p>Ngày bắt đầu: </p>
                                        <Space direction="vertical">
                                            <DatePicker
                                                className="inp-form"
                                                defaultValue={startDate}
                                                onChange={handleStartDateChange}
                                            />
                                        </Space>
                                    </div>

                                    <div className="input-detail">
                                        <p>Ngày kết thúc: </p>
                                        <Space direction="vertical">
                                            <DatePicker
                                                className="inp-form"
                                                defaultValue={endDate}
                                                onChange={handleEndDateChange}
                                            />
                                        </Space>
                                    </div>

                                    <div className="input-detail">
                                        <p>Mô tả: </p>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
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

export default EditModal;
