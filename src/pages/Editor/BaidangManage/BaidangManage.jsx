import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './BaidangManage.scss';
import { Pagination } from 'antd';
import TableBD from './TableBD';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import BDModal from './BDModal/BDModal';
import config from '~/config';
import { Input, Space } from 'antd';

const { Search } = Input;

const cx = classNames.bind(styles);

function BaidangManage() {
    const [openModal, setOpenModal] = useState(false);
    const [searchResults, setSearchResults] = useState(null); // State to store search results

    const handleSearch = (value) => {
        const encodedKeyword = encodeURIComponent(value);
        const apiUrl = `https://vietnamhistory.azurewebsites.net/api/posts/search/metaTitle?keyword=${encodedKeyword}`;

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const encodedResults = encodeURIComponent(JSON.stringify(result));
                window.location.href = `/baidangDetails?searchResults=${encodedResults}`;
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <Space direction="vertical">
                            <Search placeholder="Tìm kiếm" onSearch={handleSearch} style={{ width: 200 }} />
                        </Space>
                    </div>
                    <Button primary leftIcon={<AddIcon />} to={config.routes.ThemMoi}>
                        THÊM MỚI
                    </Button>
                </div>
                <div className={cx('container')}>
                    {/* Pass the posts data and searchResults to TableBD */}
                    <TableBD />
                </div>
                <div className={cx('footer')}>
                    {/* <Pagination defaultCurrent={1} total={50} /> */}
                </div>
            </LayoutAdmin>
            {openModal && <BDModal closeModal={setOpenModal} />}
        </>
    );
}

export default BaidangManage;
