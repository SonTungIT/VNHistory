import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './BaidangManage.scss';
import { Pagination } from 'antd';
import TableDB from './TableBD';

const cx = classNames.bind(styles);

function BaidangManage() {
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Bài Đăng</div>
            </div>
            <div className={cx('container')}>
                <TableDB />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default BaidangManage;
