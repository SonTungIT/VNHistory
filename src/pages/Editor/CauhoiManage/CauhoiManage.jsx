import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './CauhoiManage.scss';
import { Pagination } from 'antd';
import TableCH from './TableCH';

const cx = classNames.bind(styles);

function CauhoiManage() {
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Câu hỏi</div>
            </div>
            <div className={cx('container')}>
                <TableCH />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default CauhoiManage;
