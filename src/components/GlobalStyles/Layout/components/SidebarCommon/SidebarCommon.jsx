import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarCommon.module.scss';
import { SidebarData } from '~/assets/data/SidebarData';
import SubMenu from './SubMenu';
import { MenuCollapseIcon, MenuOpenIcon } from '../Icons';

const cx = classNames.bind(styles);

function SidebarCommon() {
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
            {SidebarData.map((item, index) => (
                <SubMenu key={index} item={item} openNavigation={openNavigation} />
            ))}
        </div>
    );
}

export default SidebarCommon;
