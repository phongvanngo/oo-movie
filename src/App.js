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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User sign in');
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
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(routeProps) => {
              if (route.protected)
                return (
                  <AuthRoute>
                    <route.component {...routeProps} />
                  </AuthRoute>
                );

              return <route.component {...routeProps} />;
            }}
          />
        ))}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
