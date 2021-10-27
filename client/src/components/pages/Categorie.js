import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import './css/categorie.css';

const Categorie = (props) => {
  const authContext = useContext(AuthContext);

  const { user, isAuthentificated } = authContext;
  // const alertContext = useContext(AlertContext);

  useEffect(() => {
    if (!isAuthentificated) {
      props.history.push('/');
    } else {
      authContext.loadUser();
    }
  }, []);

  return (
    <Fragment>
      <div className='Categorie'>
        <div className='head'>
          <h2
            className='user-name'
            // style={{ border: 'solid 2px black' }}
          >
            Bonjour {user && user.name}
          </h2>

          <i className='fas fa-chevron-down'></i>
        </div>
        <div className='container-categorie'>
          <div className='container-admin'>
            <Link to='/super-admin'>retour au dashbloard</Link>
          </div>

          <ul className='unlist-categorie'>
            <li>
              <div className='form-categorie btn-french'>
                <Link to='/excercices-de-francais'>
                  <img src='images/icons/alphaB.png' alt='' />
                  <h3 id='title-size'>Espace Français</h3>
                  <img src='images/icons/rectangle.png' alt='' />
                </Link>
              </div>
            </li>
            <li>
              <div className='form-categorie btn-math'>
                <Link to='/excercices-de-maths'>
                  <img src='images/icons/rectangle_maths.png' alt='' />
                  <h3 id='title-size'>Espace Maths</h3>
                  <img src='images/icons/maths.png' alt='' />
                </Link>
              </div>
            </li>
            <li>
              <div className='form-categorie btn-game'>
                <Link to='/les-games'>
                  <img src='images/icons/de-game.png' alt='' />
                  <h3 id='title-size'>Espace Détente</h3>
                  <img src='images/icons/manette-game.png' alt='' />
                </Link>
              </div>
            </li>
            <li>
              <div className='form-categorie compte-user'>
                <Link to='/userAccount'>
                  <img src='images/icons/carnet.png' alt='' />
                  <h3 id='title-size'>Mon Compte</h3>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Categorie;
