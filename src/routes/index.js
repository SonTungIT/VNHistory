import config from '~/config';
import DefaultLayout from '~/components/GlobalStyles/Layout/DefaultLayout';
import Home from '~/pages/Home/Home';

const publicRoutes = [{ path: config.routes.Home, component: Home, layout: DefaultLayout }];

export { publicRoutes };
