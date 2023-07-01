import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';

const cx = classNames.bind(styles);

function Detail() {
    const userInfo = JSON.parse(localStorage.getItem('infoUser'));

    const [user, setUser] = useState({
        userId: 2,
        email: userInfo.email,
        name: userInfo.name,
        birthday: userInfo.birthday.substring(0, 10),
    });

    const [updatedUser, setUpdatedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(updatedUser),
            redirect: 'follow',
        };

        fetch('https://vietnam-history.azurewebsites.net/api/User/updateInfo', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setUser(updatedUser);
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={cx('wapper-detail')}>
            <div className={cx('inner-detail')}>
                <div className={cx('title-detail')}>
                    <nav className="">
                        <div>
                            <h2 className="nav_title c1">Trung tâm cá nhân</h2>
                            <ul>
                                <li className="selected ">
                                    <a className="title-content" href="/detail">
                                        <span>Thông tin của tôi</span>
                                    </a>
                                </li>
                                <li className="unselected ">
                                    <a className="title-content" href="/achievements">
                                        <span>Thành tích của tôi</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className={cx('content-detail')}>
                    <div className={cx('info-detail')}>
                        <img src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg" alt="img" />
                        <div className={cx('body-detail')}>
                            <form onSubmit={handleSubmit}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>Tên :</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={cx('table-tr')}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={updatedUser.name}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>Ngày sinh :</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={cx('table-tr')}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="birthday"
                                                    value={updatedUser.birthday}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>Email :</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={cx('table-tr')}>
                                            <td>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={updatedUser.email}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button primary type="submit">
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
