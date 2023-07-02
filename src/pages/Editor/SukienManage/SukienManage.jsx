import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './SukienManage.scss';
import { Pagination } from 'antd';
import TableSK from './TableSK';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import ImportModal from './ImportModal/ImportModal';

const cx = classNames.bind(styles);

function SukienManage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>Sự Kiện</div>
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
                    <TableSK />
                </div>
                <div className={cx('footer')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </LayoutAdmin>
            {openModal && <ImportModal closeModal={setOpenModal} />}
        </>
    );
}

export default SukienManage;
