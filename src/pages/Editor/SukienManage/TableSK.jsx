import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { DeleteIcon, EditIcon, VisibilityIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditModal from './ImportModal/EditModal';
import { Link } from 'react-router-dom';

function TableSK(props) {
    const [events, setEvents] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        // Fetch data from the API
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

        fetch('https://vietnamhistory.azurewebsites.net/api/events', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setEvents(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    const handleDelete = (eventId) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/events/${eventId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted event from the events state
                    setEvents(events.filter((event) => event.eventId !== eventId));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setEditModal(true);
    };
    const handleViewQuestion = (event) => {
        setSelectedEvent(event);
        console.log(event);
    };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">Tên sự kiện</th>
                        <th className="th-user">Ngày bắt đầu</th>
                        <th className="th-user">Ngày kết thúc</th>
                        <th className="th-user">Mô tả</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.eventId}>
                            <td className="td-user">{event.eventName}</td>
                            <td className="td-user">{formatDate(event.startDate)}</td>
                            <td className="td-user">{formatDate(event.endDate)}</td>
                            <td className="td-user">{event.description}</td>
                            <td className="td-user">
                                <button className="btn-function" onClick={() => handleEdit(event)}>
                                    <EditIcon />
                                </button>
                                <button className="btn-function" onClick={() => handleDelete(event.eventId)}>
                                    <DeleteIcon />
                                </button>
                                <button className="btn-function">
                                    <Link to={`/CauhoiManage?eventId=${event.eventId}`}>
                                        <VisibilityIcon />
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editModal && <EditModal closeModal={() => setEditModal(false)} event={selectedEvent} />}
        </>
    );
}

export default TableSK;
