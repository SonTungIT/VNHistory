import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './TheloaiManage.scss';
import { Pagination } from 'antd';
import TableTL from './TableTL';

const cx = classNames.bind(styles);

function TheloaiManage() {
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Thể loại</div>
            </div>
            <div className={cx('container')}>
                <TableTL />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default TheloaiManage;
