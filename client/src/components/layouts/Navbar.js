import { header } from 'express-validator';
import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../context/auth/AuthContext';
import PropTypes from 'prop-types';

const Navbar = ({ title, image }) => {
  const authContext = useContext(AuthContext);

  const { isAuthentificated, user, logout } = authContext;

  useEffect(() => {
    const adminLink = (
      <Fragment>
        <li>
          <Link to='/super-admin'>Admin</Link>
        </li>
      </Fragment>
    );
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li onClick={onLogout}>
        <Link to='/'>Déconnexion</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Connexion</Link>
      </li>
    </Fragment>
  );

  return (
    <header className='navbar'>
      <div className='container-logo_title'>
        <img src={image} id='navBar-icon' alt='icon-dyskool' />
        <h1 id='dyskool-title'>
          <Link to={'/'}>{title}</Link>
        </h1>
      </div>
      <ul className='main'>
        <li className='link__manifesto'>
          <Link to='/manifesto'>Manifesto</Link>
        </li>
        <li>
          <Link to='/categories'>Catégories</Link>
        </li>
        <li>
          <Link to='/les_definitions'>Définitions</Link>
        </li>
        {isAuthentificated ? authLinks : guestLinks}
      </ul>
    </header>
  );
};

Navbar.propType = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'DYSKOOL',
  image: `images/icon-dyskool.png`,
};

export default Navbar;
