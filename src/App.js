import ProfileLayout from 'layout/profile/ProfileLayout';
import PrivateRoute from 'module/auth/PrivateRoute';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCurrentUser } from 'redux/reducer/authenticateSlice';
import { selectorLoader, setLoading } from 'redux/reducer/loader';
import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { auth } from './config/firebase';
import routes from './config/routes';

function App() {
  const [loading, setLoading] = useState(true);
  //   const loading = useAppSelector(selectorLoader);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User signed in');
        dispatch(setCurrentUser(user.toJSON()));
      } else {
        console.log('No user detected');
      }
      //   dispatch(setLoading(false));
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
          return (
            <Route key={index} path={route.path} component={route.component} />
          );
        })}
        ;
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
