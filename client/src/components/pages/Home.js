import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import Dys_explications from '../layouts/Dys_explications';
import AuthContext from '../../context/auth/AuthContext';

import './css/home.css';

const Home = () => {
  return (
    <Fragment>
      <section className='Home'>
        {/* illustration et button */}
        <article className='photo-titre'>
          <h1 className='slogan'>
            Viens apprendre autrement <br />
            avec DYSKOOL!!!
          </h1>
          <img
            src={`images/illustration_accueil.png`}
            className='img-dessin'
            alt='Dyslexie-illustration'
          />
          <button className='btn-register'>
            <Link to={'/register'}>inscris-toi</Link>
          </button>
          <i className='fas fa-chevron-down'></i>
        </article>
        {/* Manifeste de dyskool */}
        <article className='dys_definition'>
          <h2 className='title_script'>C'est quoi être Dys ?</h2>
          <p className='def_dys'>
            Les troubles “dys” correspondent à une déficience d’une ou plusieurs
            fonctions cognitives sans déficience intellectuelle globale. Ils
            apparaissent au cours de l’enfance et persistent à l’âge adulte. Ils
            peuvent affecter le langage, le geste ou encore pe rturber
            l’apprentissage scolaire.
          </p>
          <br />
          <div className='container-explain'></div>
          <img
            // src={`images/illustration-explicatif.png`}
            src={`images/dys_explications.png`}
            className='dyskool-illustration_explicatif'
            alt=''
          />
          {/* <Dys_explications /> */}
          <div className='chevron-def'>
            <i className='fas fa-chevron-down chevron-white'></i>
          </div>
        </article>
        {/* présentation des catégories */}
        <section className='ExplainCategorie'>
          <h3 className='categorie-explain'>Comment ça se présente ? </h3>
          <article className='container-circle francais'>
            <h3 className='espFrancais'>
              espace
              <br />
              français
            </h3>
            <p
              className='presentation-francais'
              // style={{ display: 'block' }}
            >
              Exercices utilisant la méthodes syllabique
            </p>
            {/* <p className="line-move"></p> */}
          </article>
          <article className='container-circle math'>
            <p className='presentation-math'>
              Exercices autour de la perception et l’alignement du nombre
            </p>
            <h3 className='espMath'>
              espace
              <br />
              math
            </h3>
            {/* <p className="line-move2"></p> */}
          </article>
          <article className='container-circle  detente'>
            <h3 className='espDetente'>
              {' '}
              espace
              <br />
              détente
            </h3>
            {/* <p className="line-move"></p> */}
            <p className='presentation-detente'>
              Proposition de 3 minis jeux:tétris, le memory, le pendu
            </p>
          </article>
          <article className='container-circle monCompte'>
            <p className='presentation-monCompte'>
              Consulter son compte personnel possibilité de prendre des notes
            </p>
            <h3 className='espCompte'>
              Mon compte <br />
              block-note
            </h3>
            {/* <p className="line-move2"></p> */}
          </article>
        </section>
        <button className='btn-register' style={{ marginBottom: '2rem' }}>
          <Link to='/register'>inscris-toi</Link>
        </button>
      </section>
    </Fragment>
  );
};

export default Home;
