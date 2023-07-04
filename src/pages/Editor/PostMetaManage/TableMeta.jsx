import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { AddIcon, DeleteIcon, EditIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditMetaModal from './EditMetaModal/EditMetaModal';

function TableMeta() {
    const [postmetas, setPostmetas] = useState([]);
    const [editPostMeta, setPostMeta] = useState(false);
    const [selectedMeta, setSelectedMeta] = useState(null);

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

        fetch('https://vietnam-history.azurewebsites.net/api/postmetas', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setPostmetas(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    const handleDelete = (postId, id) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnam-history.azurewebsites.net/api/postmetas/${postId}/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted postmeta from the postmetas state
                    setPostmetas(postmetas.filter((postmeta) => postmeta.id !== id));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (postmeta) => {
        setSelectedMeta(postmeta);
        setPostMeta(true);
    };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">id</th>
                        <th className="th-user">postId</th>
                        <th className="th-user">keys</th>
                        <th className="th-user">contents</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {postmetas.map((postmeta) => (
                        <tr>
                            <td className="td-user">{postmeta.id}</td>
                            <td className="td-user">{postmeta.postId}</td>
                            <td className="td-user">{postmeta.keys}</td>
                            <td className="td-user">{postmeta.contents}</td>
                            <td className="td-user">
                                <button className="btn-function" onClick={() => handleEdit(postmeta)}>
                                    <EditIcon />
                                </button>
                                <button
                                    className="btn-function"
                                    onClick={() => handleDelete(postmeta.postId, postmeta.id)}
                                >
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editPostMeta && <EditMetaModal closeModal={() => setPostMeta(false)} postmeta={selectedMeta} />}
        </>
    );
}

export default TableMeta;
