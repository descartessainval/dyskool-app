import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const UserRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthentificated, user } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthentificated ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default UserRoute;
