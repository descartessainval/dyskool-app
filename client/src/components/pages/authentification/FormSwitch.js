import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FormSwitch extends Component {
  render() {
    return (
      <div className='Form form__form formTitle'>
        <Link
          to='/register'
          className='formTitle__link formTitle__link--active'
        >
          Je m'enregistre
        </Link>
        <Link to='/login' className='formTitle__link formTitle__link--active'>
          Je me connecte
        </Link>
      </div>
    );
  }
}
export default FormSwitch;
