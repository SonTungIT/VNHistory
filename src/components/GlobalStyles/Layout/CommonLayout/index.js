import classNames from 'classnames/bind';
import styles from './CommonLayout.module.scss';
import SidebarCommon from '../components/SidebarCommon/SidebarCommon';
import HeaderLogin from '../components/Header/HeaderLogin';

const cx = classNames.bind(styles);

function CommonLayout({ children }) {
    return (
        <div className={cx('wapper')}>
            <HeaderLogin />
            <div className={cx('container')}>
                <SidebarCommon />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default CommonLayout;
