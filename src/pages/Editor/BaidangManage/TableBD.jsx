import React from 'react';
import '../../Admin/Table.scss';
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

function TableDB(props) {
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
                <tr>
                    <td className="td-user">Tung</td>
                    <td className="td-user">tung@gmail.com</td>
                    <td className="td-user">1/12/2001</td>
                    <td className="td-user">100</td>
                    <td className="td-user">20</td>
                    <td className="td-user">Member</td>
                    <td className="td-user">
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

export default TableDB;
