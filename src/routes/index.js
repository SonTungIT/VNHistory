import config from '~/config';
import DefaultLayout from '~/components/GlobalStyles/Layout/DefaultLayout';
import LoginLayout from '~/components/GlobalStyles/Layout/LoginLayout';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Detail from '~/pages/User/Detail/Detail';
import Achievements from '~/pages/User/Achievements/Achievements';

const publicRoutes = [
    { path: config.routes.Home, component: Home, layout: DefaultLayout },
    { path: config.routes.Login, component: Login, layout: LoginLayout },
    { path: config.routes.Detail, component: Detail, layout: DefaultLayout },
    { path: config.routes.Achievements, component: Achievements, layout: DefaultLayout },
];

export { publicRoutes };
