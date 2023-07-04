import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './BaidangManage.scss';
import { Pagination } from 'antd';
import TableDB from './TableBD';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import BDModal from './BDModal/BDModal';
import TableBD from './TableBD';
import config from '~/config';

const cx = classNames.bind(styles);

function BaidangManage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>Bài Đăng</div>
                    <Button primary leftIcon={<AddIcon />} to={config.routes.ThemMoi}>
                        THÊM MỚI
                    </Button>
                </div>
                <div className={cx('container')}>
                    <TableBD />
                </div>
                <div className={cx('footer')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </LayoutAdmin>
            {openModal && <BDModal closeModal={setOpenModal} />}
        </>
    );
}

export default BaidangManage;
