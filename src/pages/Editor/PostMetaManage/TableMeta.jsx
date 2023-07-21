import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { AddIcon, DeleteIcon, EditIcon, VisibilityIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditMetaModal from './EditMetaModal/EditMetaModal';
import { Link, useLocation } from 'react-router-dom';

function TableMeta() {
    const [views, setViews] = useState([]);
    const [selectedMeta, setSelectedMeta] = useState(null); // State to store the selected meta for editing
    const [editPostMeta, setEditPostMeta] = useState(false); // State to control the EditMetaModal visibility

    const location = useLocation();

    console.log(views);

    useEffect(() => {
        // Lấy dữ liệu views từ state của react-router
        if (location.state && location.state.views) {
            setViews(location.state.views);
        }
    }, [location]);

    const handleDelete = (postId, id) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/postmetas/${postId}/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted postmeta from the postmetas state
                    setViews(views.filter((view) => view.id !== id));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (id) => {
        // Find the selected view by id
        const selectedView = views.find((view) => view.id === id);
        setSelectedMeta(selectedView);
        setEditPostMeta(true);
    };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">Từ khóa</th>
                        <th className="th-user">Nội dung</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {views.map((view) => (
                        <tr key={view.id}>
                            <td className="td-user">{view.keys}</td>
                            <td className="td-user">{view.contents}</td>
                            <td className="td-user">
                                <button className="btn-function" onClick={() => handleEdit(view.id)}>
                                    <EditIcon />
                                </button>
                                <button className="btn-function" onClick={() => handleDelete(view.postId, view.id)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editPostMeta && (
                <EditMetaModal
                    postmeta={selectedMeta} // Pass the selected metadata to the modal component
                    closeModal={() => setEditPostMeta(false)}
                />
            )}
        </>
    );
}

export default TableMeta;
