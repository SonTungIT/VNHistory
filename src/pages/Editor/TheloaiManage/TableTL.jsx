import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { DeleteIcon, EditIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditCateModal from './CateModal/EditCateModal';

function TableTL(props) {
    const [categorys, setCategorys] = useState([]);
    const [editCateModal, setEditCateModal] = useState(false);
    const [selectedCate, setSelectedCate] = useState(null);

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

        fetch('https://vietnamhistory.azurewebsites.net/api/Categories', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setCategorys(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    const handleDelete = (categoryId) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/Categories/deleteCategory?id=${categoryId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted event from the events state
                    setCategorys(categorys.filter((category) => category.categoryId !== categoryId));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (category) => {
        setSelectedCate(category);
        setEditCateModal(true);
    };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">Tên Thể Loại</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category) => (
                        <tr>
                            <td className="td-user">{category.categoryName}</td>
                            <td className="td-user">
                                <button className="btn-function" onClick={() => handleEdit(category)}>
                                    <EditIcon />
                                </button>
                                <button className="btn-function" onClick={() => handleDelete(category.categoryId)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editCateModal && (
                <EditCateModal
                    closeModal={() => setEditCateModal(false)}
                    category={selectedCate}
                    fetchData={fetchData} // Truyền hàm fetchData vào EditCateModal
                />
            )}
        </>
    );
}

export default TableTL;
