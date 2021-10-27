import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
  // je l'initialise
  const alertContext = useContext(AlertContext);
  //je check si y a des alert dans le tableau

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert, index) => (
      <div key={index} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'> {alert.msg}</i>
      </div>
    ))
  );
};

export default Alerts;
// className est dynamique
