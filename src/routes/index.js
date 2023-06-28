import config from '~/config';
import DefaultLayout from '~/components/GlobalStyles/Layout/DefaultLayout';
import LoginLayout from '~/components/GlobalStyles/Layout/LoginLayout';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Detail from '~/pages/User/Detail/Detail';
import Achievements from '~/pages/User/Achievements/Achievements';
import SignIn from '~/pages/Login/SignIn/SignIn';
import Register from '~/pages/Login/SignIn/Register';
import UserManage from '~/pages/Admin/UserManage';
import CommonLayout from '~/components/GlobalStyles/Layout/CommonLayout';
import BaidangManage from '~/pages/Editor/BaidangManage/BaidangManage';
import EditorLayout from '~/components/GlobalStyles/Layout/EditorLayout';
import TheloaiManage from '~/pages/Editor/TheloaiManage/TheloaiManage';
import CauhoiManage from '~/pages/Editor/CauhoiManage/CauhoiManage';
import SukienManage from '~/pages/Editor/SukienManage/SukienManage';

const publicRoutes = [
    { path: config.routes.Home, component: Home, layout: DefaultLayout },
    { path: config.routes.Login, component: Login, layout: LoginLayout },
    { path: config.routes.signIn, component: SignIn, layout: null },
    { path: config.routes.register, component: Register, layout: null },

    //Admin
    { path: config.routes.UserManage, component: UserManage, layout: CommonLayout },

    //Editor
    { path: config.routes.BaidangMange, component: BaidangManage, layout: EditorLayout },
    { path: config.routes.TheloaiManage, component: TheloaiManage, layout: EditorLayout },
    { path: config.routes.CauhoiManage, component: CauhoiManage, layout: EditorLayout },
    { path: config.routes.SukienManage, component: SukienManage, layout: EditorLayout },

    { path: config.routes.Detail, component: Detail, layout: DefaultLayout },
    { path: config.routes.Achievements, component: Achievements, layout: DefaultLayout },
];

export { publicRoutes };
