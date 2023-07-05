import classNames from 'classnames/bind';
import styles from './EditorLayout.scss';
import SidebarEditor from '../components/SidebarEditor/SidebarEditor';
import HeaderLogin from '../components/Header/HeaderLogin';

const cx = classNames.bind(styles);

function EditorLayout({ children }) {
    return (
        <div className={cx('wapper')}>
            <HeaderLogin />
            <div className={cx('container')}>
                <SidebarEditor />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default EditorLayout;
