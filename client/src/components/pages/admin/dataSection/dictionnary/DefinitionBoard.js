import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefinitionItem from '../dictionnary/DefinitionItem';
import DefinitionContext from '../../../../../context/definitions/DefinitionContext';
import DefinitionForm from '../dictionnary/DefinitionForm';

const DefinitionBoard = () => {
  const definitionContext = useContext(DefinitionContext);
  const {
    getDefinitions,
    definitions,
    deleteDefinition,
    setCurrent,
    clearCurrent,
  } = definitionContext;
  useEffect(() => {
    getDefinitions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div className='container-link'>
        <i className='fas fa-long-arrow-alt-left'></i>
        <Link
          to='/super-admin'
          className='link-backHome'
          style={{ color: 'black' }}
        >
          Retour vers Dashboard
        </Link>
      </div>
      <div>
        <DefinitionForm />
      </div>
      <div>
        <h3>La liste des definitions</h3>
        <div className='items-board'>
          {definitions.map((definition) => (
            <DefinitionItem
              key={definition._id}
              definition={definition}
              deleteDefinition={deleteDefinition}
              setCurrent={setCurrent}
              clearCurrent={clearCurrent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefinitionBoard;
