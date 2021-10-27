import React, { useContext } from 'react';
import UserContext from '../../../../../context/users/UserContext';

//hook
const UserItem = ({ user, deleteUser, setCurrent, clearCurrent }) => {
  // eslint-disable-next-line

  // const definitionContext = useContext(DefinitionContext);

  // const { deleteDefinition, setCurrent } = definitionContext;
  const { name, pseudo, email, password } = user;

  const onDelete = () => {
    deleteUser(user._id);
    clearCurrent();
  };

  return (
    <div className='card view-data' style={{ width: '30rem' }}>
      <ul
        className='btn-card'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <li>
          <span style={{ fontWeight: 'bold' }}>id:</span> {user._id}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>name:</span> {name}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>rule:</span> {pseudo}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>rule:</span> {email}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>password:</span> {password}
        </li>
      </ul>

      <p style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button type='submit' onClick={() => setCurrent(user)}>
          edit
        </button>
        <button onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

export default UserItem;
