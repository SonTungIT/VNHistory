import classNames from 'classnames/bind';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import HeaderLogin from '../components/Header/HeaderLogin';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wapper')}>
            <HeaderLogin />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayout;
