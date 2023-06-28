import config from '~/config';
import DefaultLayout from '~/components/GlobalStyles/Layout/DefaultLayout';
import Home from '~/pages/Home/Home';
import UserManage from '~/pages/Admin/UserManage';
import CommonLayout from '~/components/GlobalStyles/Layout/CommonLayout';

const publicRoutes = [{ path: config.routes.UserManage, component: UserManage, layout: CommonLayout }];

export { publicRoutes };
