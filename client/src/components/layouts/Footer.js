import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <div className='Footer'>
        <Link to={'/register'}>inscription-connexion</Link>
        <Link to='manifesto'>Manifesto</Link>
        <Link to={'/Glossaire'}>Definitions</Link>
        <Link to={'/contact'}>Contact: descartes.sainval@gmail.com</Link>
      </div>
    );
  }
}
