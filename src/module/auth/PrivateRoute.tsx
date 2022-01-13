import { auth } from 'config/firebase';
import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router';

interface PrivateRouteProps {
  // rest: RouteProps;
  component: FixMeLater;
  layout?: FixMeLater;
}

export default function PrivateRoute({
  component: Component,
  layout: Layout,
  ...rest
}: PrivateRouteProps): ReactElement {
  const user_id = JSON.parse(localStorage.getItem('user') as FixMeLater);
  if (!auth.currentUser && !user_id) {
    return <Redirect to="/sign-in" />;
  }
  if (Layout) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );
  }
  return <Route component={Component} {...rest} />;
}
