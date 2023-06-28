import { AccountUserIcon, ArrowDownIcon, ArrowLeftIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';

export const SidebarData = [
    {
        title: 'TÀI KHOẢN USER',
        path: config.routes.userManagement,
        icon: <AccountUserIcon />,
        iconClosed: <ArrowDownIcon />,
        iconOpened: <ArrowLeftIcon />,
    },
];
