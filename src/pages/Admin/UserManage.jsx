import LayoutAdmin from './LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './UserManage.scss';
import Table from './Table';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

function UserManage() {
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>User</div>
            </div>
            <div className={cx('container')}>
                <Table />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default UserManage;
