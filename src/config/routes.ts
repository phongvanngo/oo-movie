import IRoute from '../interfaces/Route';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import LoginPage from 'pages/login/Login';
import Plan from 'pages/plan/Plan';
import Theater from 'pages/theater';
import Profile from 'pages/profile/Profile';
import PaymentHistory from 'pages/payment-history/PaymentHistory';
import MyMovies from 'pages/payed-movie/MyMovies';
import MyCollection from 'pages/my-collection/MyCollection';
import Checkout from 'pages/checkout/Checkout';

const routes: IRoute[] = [
  {
    path: '/sign-in',
    exact: false,
    component: LoginPage,
    isProfile: false,
    name: 'Login',
    protected: false,
  },

  {
    path: '/plan',
    exact: false,
    component: Plan,
    isProfile: false,
    name: 'Plan',
    protected: false,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    isProfile: true,
    name: 'Profile',
    protected: true,
  },
  {
    path: '/payment-history',
    exact: false,
    component: PaymentHistory,
    isProfile: true,
    name: 'PaymentHistory',
    protected: true,
  },
  {
    path: '/my-collection',
    exact: false,
    component: MyCollection,
    isProfile: true,
    name: 'MyCollection',
    protected: true,
  },
  {
    path: '/my-movies',
    exact: false,
    component: MyMovies,
    isProfile: true,
    name: 'PayedMovie',
    protected: true,
  },
  {
    path: '/checkout',
    exact: false,
    component: Checkout,
    isProfile: false,
    name: 'Checkout',
    protected: true,
  },
  {
    path: '/:category/search/:keyword',
    exact: false,
    component: Catalog,
    isProfile: false,
    name: '',
    protected: true,
  },
  {
    path: '/:category/:id/watching',
    exact: false,
    component: Theater,
    isProfile: false,
    name: 'Watching',
    protected: true,
  },
  {
    path: '/:category/:id',
    exact: false,
    component: Detail,
    isProfile: false,
    name: 'Detail',
    protected: false,
  },
  {
    path: '/:category',
    exact: false,
    component: Catalog,
    isProfile: false,
    name: 'Category',
    protected: false,
  },
  {
    path: '/',
    exact: true,
    isProfile: false,
    component: Home,
    name: 'Home',
    protected: false,
  },
];
export default routes;

//Header nav bar
export const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
  {
    display: 'Plan',
    path: '/plan',
  },
  {
    display: 'Sign In',
    path: '/sign-in',
  },
  {
    display: 'User',
    path: '/profile',
  },
];

export const linkDropDown = [
  {
    id: 1,
    name: 'Profile',
    path: '/profile',
  },
];
