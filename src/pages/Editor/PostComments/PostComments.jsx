import React, { useState } from 'react';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './PostComments.scss';
import { Pagination } from 'antd';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';
import TableCmt from './TableCmt';

const cx = classNames.bind(styles);

function PostComments() {
    return (
        <>
            <LayoutAdmin>
                <div className={cx('header')}>
                    <div>PostComments</div>
                    <Button primary leftIcon={<AddIcon />} to={config.routes.ThemMoi}>
                        THÊM MỚI
                    </Button>
                </div>
                <div className={cx('container')}>
                    <TableCmt />
                </div>
                <div className={cx('footer')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </LayoutAdmin>
        </>
    );
}

export default PostComments;
