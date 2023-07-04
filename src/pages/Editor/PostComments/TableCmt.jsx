import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { AddIcon, DeleteIcon, EditIcon } from '~/components/GlobalStyles/Layout/components/Icons';

function TableCmt() {
    const [postcmts, setPostcmts] = useState([]);

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

        fetch('https://vietnam-history.azurewebsites.net/api/postcomments', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setPostcmts(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    const handleDelete = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnam-history.azurewebsites.net/api/postcomments/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted postmeta from the postmetas state
                    setPostcmts(postcmts.filter((postcmt) => postcmt.id !== id));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">id</th>
                        <th className="th-user">postId</th>
                        <th className="th-user">parentId</th>
                        <th className="th-user">title</th>
                        <th className="th-user">published</th>
                        <th className="th-user">createdAt</th>
                        <th className="th-user">publishedAt</th>
                        <th className="th-user">contents</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {postcmts.map((postcmt) => (
                        <tr>
                            <td className="td-user">{postcmt.id}</td>
                            <td className="td-user">{postcmt.postId}</td>
                            <td className="td-user">{postcmt.parentId}</td>
                            <td className="td-user">{postcmt.title}</td>
                            <td className="td-user">{postcmt.published}</td>
                            <td className="td-user">{formatDate(postcmt.createdAt)}</td>
                            <td className="td-user">{formatDate(postcmt.publishedAt)}</td>
                            <td className="td-user">{postcmt.contents}</td>
                            <td className="td-user">
                                <button className="btn-function">
                                    <EditIcon />
                                </button>
                                <button className="btn-function" onClick={() => handleDelete(postcmt.id)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TableCmt;
