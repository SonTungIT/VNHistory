import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './CommonLayout.module.scss';
import SidebarCommon from '../components/SidebarCommon/SidebarCommon';

const cx = classNames.bind(styles);

function CommonLayout({ children }) {
    return (
        <div className={cx('wapper')}>
            <Header />
            <div className={cx('container')}>
                <SidebarCommon />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default CommonLayout;
