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
import Post from '~/pages/Post/Post';
import Quiz10 from '~/pages/Post/Quiz10/Quiz10';
import Quiz20 from '~/pages/Post/Quiz20/Quiz20';
import ThemMoi from '~/pages/Editor/ThemMoi/ThemMoi';
import PostMetaManage from '~/pages/Editor/PostMetaManage/PostMetaManage';
import PostComments from '~/pages/Editor/PostComments/PostComments';
import CreateQuestion from '~/pages/Editor/CauhoiManage/CreateQuestion';
import CreateAnswer from '~/pages/Editor/CauhoiManage/CreateAnswer';
import UpdateQuestion from '~/pages/Editor/CauhoiManage/UpdateQuestion';
import PostDetail from '~/pages/Post/PostDetail';
import UpdateAnswer from '~/pages/Editor/CauhoiManage/UpdateAnswer';
import BaidangDetails from '~/pages/Editor/BaidangManage/BaidangDetails';

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
    { path: config.routes.CreateQuestion, component: CreateQuestion, layout: EditorLayout },
    { path: config.routes.CreateAnswer, component: CreateAnswer, layout: EditorLayout },
    { path: config.routes.UpdateQuestion, component: UpdateQuestion, layout: EditorLayout },
    { path: config.routes.UpdateAnswer, component: UpdateAnswer, layout: EditorLayout },

    //User
    { path: config.routes.Detail, component: Detail, layout: DefaultLayout },
    { path: config.routes.Achievements, component: Achievements, layout: DefaultLayout },
    { path: config.routes.Post, component: Post, layout: LoginLayout },

    //quiz
    { path: config.routes.Quiz10, component: Quiz10, layout: DefaultLayout },
    { path: config.routes.Quiz20, component: Quiz20, layout: DefaultLayout },

    //Them Moi
    { path: config.routes.ThemMoi, component: ThemMoi, layout: DefaultLayout },

    //postmeta
    { path: config.routes.postmeta, component: PostMetaManage, layout: EditorLayout },
    { path: config.routes.postcmt, component: PostComments, layout: EditorLayout },
    { path: config.routes.postdetail, component: PostDetail, layout: LoginLayout },

    //search Bai Danng
    { path: config.routes.baidangDetails, component: BaidangDetails, layout: EditorLayout },
];

export { publicRoutes };
