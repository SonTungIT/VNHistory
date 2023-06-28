import React from 'react';
import './Table.scss';
import Menu from '~/components/Popper/Menu';
import {
    CancelIcon,
    DeleteIcon,
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
    return (
        <table>
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Ngày sinh</th>
                    <th>Tổng điểm</th>
                    <th>Tổng câu hỏi</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tung</td>
                    <td>tung@gmail.com</td>
                    <td>1/12/2001</td>
                    <td>100</td>
                    <td>20</td>
                    <td>Member</td>
                    <td>
                        <Menu items={MENU_ITEMS}>
                            <button className="btn-function">
                                <HorizontalIcon />
                            </button>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
