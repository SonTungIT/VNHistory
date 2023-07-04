import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './PostMetaManage.scss';
import { Pagination } from 'antd';
import TableMeta from './TableMeta';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';

const cx = classNames.bind(styles);

function PostMetaManage() {
    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>PostMeta</div>
                    <Button primary leftIcon={<AddIcon />} to={config.routes.ThemMoi}>
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
        </>
    );
}

export default PostMetaManage;
