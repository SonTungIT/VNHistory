import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './PostMetaManage.scss';
import { Pagination } from 'antd';
import TableMeta from './TableMeta';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';
import PostMeta from '../BaidangManage/PostMeta/PostMeta';

const cx = classNames.bind(styles);

function PostMetaManage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>PostMeta</div>
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
                    <TableMeta />
                </div>
                <div className={cx('footer')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </LayoutAdmin>
            {openModal && <PostMeta closeModal={setOpenModal} />}
        </>
    );
}

export default PostMetaManage;
