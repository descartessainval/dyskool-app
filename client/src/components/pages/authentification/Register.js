import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertContext from '../../../context/alert/AlertContext';
import AuthContext from '../../../context/auth/AuthContext';
// import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import Alerts from '../../layouts/Alerts';
import FormSwitch from './FormSwitch';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authtContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, isAuthentificated, error, clearErrors } = authtContext;

  // actions:
  //je vais utiliser les useState hooks je peux remonter les states
  //ici, je vais récupérer l'utilisateur,  àl'useState je lui passe un objet avec les champs
  const [user, setUser] = useState({
    name: '',
    pseudo: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, pseudo, email, password, password2 } = user;

  // REDIRECTION => activate useHistory from react-router-dom for/with hook
  // let history = useHistory();

  useEffect(() => {
    //redirection after success registration
    if (isAuthentificated) {
      props.history.push('/categories');

      // ou props.history.push('chemin') si ce choix => annoncer le props dans le paramètre de la hook
    }
    if (error === 'User is already exist') {
      setAlert(error, 'danger');
      console.log(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthentificated, error, props.history]);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    // on veut lui envoyer la valeur ...
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // ici on veut appeler une méthode

    if (name === '' || email === '' || password === '') {
      let t = setAlert('Veuillez remplir les champs vides', 'danger');
    } else if (password !== password2) {
      setAlert('Ton password ne corespond pas', 'danger');
    } else {
      register({ name, pseudo, email, password });
      // eslint-disable-next-line
    }
  };

  return (
    <Fragment>
      <div className='formCenter'>
        <Alerts />
        <FormSwitch />
        <form className='formFields' onSubmit={onSubmit}>
          {/* TON NOM */}
          <fieldset className='formField'>
            <label className='formField__label' htmlFor='name'>
              Ton nom et/ou prénom
            </label>
            <input
              type='text'
              id='name'
              className='formField__input'
              placeholder='entre ton nom'
              name='name'
              value={name}
              onChange={onChange}
            />
          </fieldset>{' '}
          {/* TON PSEUDO */}
          <fieldset className='formField'>
            <label className='formField__label' htmlFor='pseudo'>
              ton pseudo
            </label>
            <input
              type='text'
              id='pseudo'
              className='formField__input'
              placeholder='ton pseudo'
              name='pseudo'
              value={pseudo}
              onChange={onChange}
            />
          </fieldset>{' '}
          {/* L'EMAIL */}
          <fieldset className='formField'>
            <label className='formField__label' htmlFor='email'>
              Ton e-mail
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
          </fieldset>{' '}
          {/* PASSWORD */}
          <fieldset className='formField'>
            <label className='formField__label' htmlFor='password'>
              Ton mot-de-passe
            </label>

            <input
              type='password'
              id='password'
              className='formField__input'
              placeholder='Ton mot-de-passe'
              name='password'
              value={password}
              onChange={onChange}
            />
          </fieldset>{' '}
          {/* PASSWORD 2*/}
          <fieldset className='formField'>
            <label className='formField__label' htmlFor='password'>
              Confirme ton mot-de-passe
            </label>
            <input
              type='password'
              id='password2'
              className='formField__input'
              placeholder='Ton mot-de-passe'
              name='password2'
              value={password2}
              onChange={onChange}
            />
          </fieldset>
          <fieldset className='formField'>
            <button className='formField__button mr-20'>je m'enregistre</button>
            <br />
            <Link className='formField__link' to='/login'>
              Je suis déjà membre{' '}
            </Link>
          </fieldset>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
