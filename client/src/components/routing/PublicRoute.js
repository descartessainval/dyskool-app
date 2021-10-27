import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthentificated, user } = authContext;

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? <Component {...props} /> : null)}
    />
  );
};

export default AdminRoute;
