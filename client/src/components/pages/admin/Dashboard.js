import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AlertContext from '../../../context/alert/AlertContext';
import AuthContext from '../../../context/auth/AuthContext';

const Dashboard = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { user } = authContext;

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/');
    } else {
      //console.log(decoded);
      let decoded = jwt_decode(token);
      if (!decoded.admin) {
        authContext.loadUser();
        props.history.push('/categories');
      } else {
        authContext.loadUser();
        props.history.push('/super-admin');
      }
    }
  }, []);
  return (
    <div className='Dashboard-container'>
      <h1>Bonjour {user && user.pseudo}</h1>
      <ul id='list-menu'>
        <li className='link-control'>
          <Link to='/users'>Liste des users</Link>
        </li>
        <li className='link-control'>
          <Link to='/francais'>Liste des ex de frnaçais</Link>
        </li>
        <li className='link-control'>
          <Link to='/users'>Liste des ex de maths</Link>
        </li>
        <li className='link-control'>
          <Link to='/games'>Liste des games</Link>
        </li>
        <li className='link-control'>
          <Link to='/definition'>Liste des définitions</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
