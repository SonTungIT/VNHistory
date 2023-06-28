import classNames from 'classnames/bind';
import HeaderLogin from '../components/Header/HeaderLogin';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './LoginLayout.module.scss';

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
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

export default LoginLayout;
