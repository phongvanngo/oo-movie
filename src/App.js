import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { auth } from './config/firebase';
import AuthRoute from 'module/auth/AuthRouter';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import routes from './config/routes';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { setCurrentUser } from 'redux/reducer/authenticateSlice';
import ProfileLayout from 'layout/profile/ProfileLayout';
import Home from 'pages/Home';
import Profile from 'pages/profile/Profile';
import PaymentHistory from 'pages/payment-history/PaymentHistory';
import LoginPage from 'pages/login/Login';
import PrivateRoute from 'module/auth/PrivateRoute';
import Plan from 'pages/plan/Plan';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User signed in');
        dispatch(setCurrentUser(user.toJSON()));
      } else {
        console.log('No user detected');
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loding...</div>;

  return (
    <Router>
      <Header />
      <Switch>
        {routes.map((route, index) => {
          if (route.protected) {
            if (route.isProfile) {
              return (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  layout={ProfileLayout}
                  component={route.component}
                />
              );
            }
            return (
              <PrivateRoute
                key={index}
                path={route.path}
                component={route.component}
              />
            );
          }
          return <Route path={route.path} component={route.component} />;
        })}
        ;
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
