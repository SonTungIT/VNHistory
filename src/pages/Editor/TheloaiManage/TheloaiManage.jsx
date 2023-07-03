import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './TheloaiManage.scss';
import { Pagination } from 'antd';
import TableTL from './TableTL';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import CateModal from './CateModal/CateModal';

const cx = classNames.bind(styles);

function TheloaiManage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>Thể loại</div>
                    <Button
                        primary
                        leftIcon={<AddIcon />}
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        THÊM MỚI
                    </Button>
                </div>
                <div className={cx('container')}>
                    <TableTL />
                </div>
                <div className={cx('footer')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </LayoutAdmin>
            {openModal && <CateModal closeModal={setOpenModal} />}
        </>
    );
}

export default TheloaiManage;
