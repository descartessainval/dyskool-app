import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const AdminRoute = ({ props, component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    // if (user && user.admin === true) {
    // props.history.push('/super-admin');
    // }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.admin === true ? (
          <Redirect to='/super-admin' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
