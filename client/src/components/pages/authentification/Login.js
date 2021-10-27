import React, { Fragment, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import AlertContext from '../../../context/alert/AlertContext';
import AuthContext from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import Alerts from '../../layouts/Alerts';

import FormSwitch from './FormSwitch';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, isAuthentificated, error, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthentificated) {
      let token = localStorage.getItem('token');
      if (!token) {
        props.history.push('/');
      } else {
        let decoded = jwt_decode(token);
        //console.log(decoded);
        if (decoded.admin) {
          props.history.push('/super-admin');
        } else {
          props.history.push('/categories');
        }
      }
    }

    if (error === 'Unauthorized') {
      setAlert(error, 'danger');
      console.log(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthentificated, error]);

  // actions:
  //je vais utiliser les useState hooks je peux remonter les states
  //ici, je vais récupérer l'utilisateur,  à l'useState je lui passe un objet avec les champs
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    // on veut lui envoyer la valeur ...
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // ici on veut appeler une méthode
    // console.log('Login submit');
    if (email === '' || password === '') {
      setAlert('Veuillez remplir les champs vides', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <Fragment>
      <form className='formCenter' onSubmit={onSubmit}>
        <Alerts />
        <FormSwitch />
        <fieldset className='formField'>
          <label className='formField__label' htmlFor='email'>
            E-mail Address
          </label>
          <input
            type='email'
            id='email'
            className='formField__input'
            placeholder='entre ton email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </fieldset>

        <fieldset className='formField'>
          <label className='formField__label'>Password</label>
          <input
            type='password'
            id='password'
            className='formField__input'
            placeholder='entre ton password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className='formField'>
          <button className='formField__button mr-20'>je me connecte</button>
          <br />
          <Link className='formField__link' to='/register'>
            Créer un compte
          </Link>
        </fieldset>
      </form>
    </Fragment>
  );
};

export default Login;
