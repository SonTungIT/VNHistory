import React, { useEffect, useState } from 'react';
import './Table.scss';
import Menu from '~/components/Popper/Menu';
import {
    CancelIcon,
    DeleteIcon,
    EditIcon,
    HorizontalIcon,
    VisibilityIcon,
    VisibilityOffIcon,
} from '~/components/GlobalStyles/Layout/components/Icons';

const MENU_ITEMS = [
    {
        icon: <VisibilityIcon />,
        title: 'Active User',
    },
    {
        icon: <VisibilityOffIcon />,
        title: 'Inactive User',
    },
    {
        icon: <CancelIcon />,
        title: 'Block User',
    },
    {
        icon: <DeleteIcon />,
        title: 'Delete User',
    },
];

function Table(props) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        fetch('https://vietnamhistory.azurewebsites.net/api/User', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data);
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    };

    const handleDelete = (userId) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/User/deleteUser?id=${userId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // If the deletion was successful, update the userData state
                setUserData(userData.filter((user) => user.userId !== userId));
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <table className="table-user">
            <thead>
                <tr>
                    <th className="th-user">Tên</th>
                    <th className="th-user">Email</th>
                    <th className="th-user">Ngày sinh</th>
                    <th className="th-user">Tổng điểm</th>
                    <th className="th-user">Tổng câu hỏi</th>
                    <th className="th-user">Role</th>
                    <th className="th-user"></th>
                </tr>
            </thead>
            <tbody>
                {userData.length > 0 ? (
                    userData.map((user) => (
                        <tr key={user.userId}>
                            <td className="td-user">{user.name}</td>
                            <td className="td-user">{user.email}</td>
                            <td className="td-user">{new Date(user.birthday).toLocaleDateString()}</td>
                            <td className="td-user">{user.totalScore}</td>
                            <td className="td-user">{user.totalQuestion}</td>
                            <td className="td-user">{user.role}</td>
                            <td className="td-user">
                                <button className="btn-function" onClick={() => handleDelete(user.userId)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">Loading...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;
