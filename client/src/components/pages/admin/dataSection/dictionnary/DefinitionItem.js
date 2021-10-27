import React, { useContext } from 'react';
import DefinitionContext from '../../../../../context/definitions/DefinitionContext';

//hook
const DefinitionItem = ({
  definition,
  deleteDefinition,
  setCurrent,
  clearCurrent,
}) => {
  // eslint-disable-next-line

  //const definitionContext = useContext(DefinitionContext);

  // const { deleteDefinition, setCurrent } = definitionContext;
  const { title, content, picture, link } = definition;

  const onDelete = () => {
    deleteDefinition(definition._id);
    clearCurrent();
  };

  return (
    <div className='card view-data' key={definition._id}>
      <ul
        className='btn-card'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <li>
          <span style={{ fontWeight: 'bold' }}>id:</span> {definition._id}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>titre:</span> {title}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>content:</span> {content}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>picture:</span> {picture}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>link:</span> {link}
        </li>
      </ul>

      <p style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button type='submit' onClick={() => setCurrent(definition)}>
          edit
        </button>
        <button onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

export default DefinitionItem;
