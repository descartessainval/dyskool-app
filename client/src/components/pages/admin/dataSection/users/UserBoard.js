import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserItem from './UserItem';
import UserContext from '../../../../../context/users/UserContext';

const UserBoard = () => {
  const userContext = useContext(UserContext);
  const { getUsers, users, deleteUser, setCurrent, clearCurrent } = userContext;
  useEffect(() => {
    getUsers();
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
      <h3>La liste des users</h3>

      <div>
        <Link to='/UserForm'>créer un nouvel utilisateur</Link>
      </div>
      <div>
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            deleteUser={deleteUser}
            setCurrent={setCurrent}
            clearCurrent={clearCurrent}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBoard;
