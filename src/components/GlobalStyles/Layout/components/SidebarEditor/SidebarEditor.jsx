import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../SidebarCommon/SidebarCommon.module.scss';
import { MenuCollapseIcon, MenuOpenIcon } from '../Icons';
import SubMenu from '../SidebarCommon/SubMenu';
import { SidebarDataEditor } from '~/assets/data/SidebarDataEditor';

const cx = classNames.bind(styles);

function SidebarEditor() {
    const [openNavigation, setOPenNavigation] = useState(false);
    const toggleNavigation = () => setOPenNavigation(!openNavigation);

    return (
        <div className={openNavigation ? cx('sidebar', 'sidebar-respon') : cx('sidebar')}>
            <div className={cx('top-bar')}>
                {openNavigation ? (
                    <span onClick={toggleNavigation}>
                        <MenuCollapseIcon />
                    </span>
                ) : (
                    <span onClick={toggleNavigation}>
                        <MenuOpenIcon />
                    </span>
                )}
            </div>
            {SidebarDataEditor.map((item, index) => (
                <SubMenu key={index} item={item} openNavigation={openNavigation} />
            ))}
        </div>
    );
}

export default SidebarEditor;
