import ProfileLayout from 'layout/profile/ProfileLayout';
import PrivateRoute from 'module/auth/PrivateRoute';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCurrentUser } from 'redux/reducer/authenticateSlice';
import { selectorLoader, setLoading } from 'redux/reducer/loader';
import { updateUserHistory } from 'redux/reducer/userHistory';
import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { auth } from './config/firebase';
import routes from './config/routes';
import LoadingOverlay from 'react-loading-overlay-ts';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loading = useAppSelector(selectorLoader);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userParsed = user.toJSON();
        dispatch(setCurrentUser(userParsed));
        console.log(userParsed);
        //Truong hop reload lai page thi update state local storage (truong hop sign in roi)
        const userLocalStorage = localStorage.getItem(`${userParsed.email}`);
        if (userLocalStorage) {
          dispatch(updateUserHistory(JSON.parse(userLocalStorage)));
        }
      } else {
        console.log('No user detected');
      }
      //   dispatch(setLoading(false));
    });
  }, []);

  return (
    <Router>
      <LoadingOverlay active={loading} spinner text="Please wait...">
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
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            );
          })}
          ;
        </Switch>
        <MessengerCustomerChat
          pageId="112104784691331"
          appId="256677786440177"
          //   themeColor=""
        />

        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </LoadingOverlay>
    </Router>
  );
}

export default App;
