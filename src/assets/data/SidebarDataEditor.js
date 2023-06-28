import {
    AccountUserIcon,
    ArrowDownIcon,
    ArrowLeftIcon,
    BookOpenIcon,
    GradeIcon,
    RollAltIcon,
} from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';

export const SidebarDataEditor = [
    {
        title: 'QUẢN LÝ BÀI ĐĂNG',
        path: config.routes.BaidangMange,
        icon: <AccountUserIcon />,
        iconClosed: <ArrowDownIcon />,
        iconOpened: <ArrowLeftIcon />,
    },
    {
        title: 'QUẢN LÝ THỂ LOẠI',
        path: config.routes.TheloaiManage,
        icon: <BookOpenIcon />,
        iconClosed: <ArrowDownIcon />,
        iconOpened: <ArrowLeftIcon />,
    },
    {
        title: 'QUẢN LÝ CÂU HỎI',
        path: config.routes.CauhoiManage,
        icon: <GradeIcon />,
        iconClosed: <ArrowDownIcon />,
        iconOpened: <ArrowLeftIcon />,
    },
    {
        title: 'QUẢN LÝ SỰ KIỆN',
        path: config.routes.SukienManage,
        icon: <RollAltIcon />,
        iconClosed: <ArrowDownIcon />,
        iconOpened: <ArrowLeftIcon />,
    },
];
