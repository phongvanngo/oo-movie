import IRoute from '../interfaces/Route';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import LoginPage from 'pages/login/Login';
import Plan from 'pages/plan/Plan';
import Theater from 'pages/theater';
import Profile from 'pages/profile/Profile';

const routes: IRoute[] = [
  {
    path: '/sign-in',
    exact: false,
    component: LoginPage,
    name: 'Login',
    protected: false,
  },

  {
    path: '/plan',
    exact: false,
    component: Plan,
    name: 'Plan',
    protected: false,
  },
  {
    path: '/profile',
    exact: false,
    component: Profile,
    name: 'Profile',
    protected: true,
  },
  {
    path: '/:category/search/:keyword',
    exact: false,
    component: Catalog,
    name: '',
    protected: true,
  },
  {
    path: '/:category/:id/watching',
    exact: false,
    component: Theater,
    name: 'Watching',
    protected: true,
  },
  {
    path: '/:category/:id',
    exact: false,
    component: Detail,
    name: 'Detail',
    protected: false,
  },
  {
    path: '/:category',
    exact: false,
    component: Catalog,
    name: 'Category',
    protected: false,
  },
  {
    path: '/',
    exact: true,
    component: Home,
    name: 'Home',
    protected: false,
  },
];
export default routes;
