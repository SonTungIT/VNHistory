import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './SukienManage.scss';
import { Pagination } from 'antd';
import TableSK from './TableSK';

const cx = classNames.bind(styles);

function SukienManage() {
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Sự Kiện</div>
            </div>
            <div className={cx('container')}>
                <TableSK />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default SukienManage;
