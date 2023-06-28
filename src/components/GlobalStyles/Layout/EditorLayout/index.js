import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './EditorLayout.scss';
import SidebarEditor from '../components/SidebarEditor/SidebarEditor';

const cx = classNames.bind(styles);

function EditorLayout({ children }) {
    return (
        <div className={cx('wapper')}>
            <Header />
            <div className={cx('container')}>
                <SidebarEditor />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default EditorLayout;
