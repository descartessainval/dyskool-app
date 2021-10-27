import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../../../../context/users/UserContext';
// import './css/dataGlossary.css';

const UserForm = () => {
  const userContext = useContext(UserContext);

  const { addUser, updateUser, clearCurrent, current } = userContext;

  // mes state:
  useEffect(() => {
    if (current !== null) {
      setUser(current);
    } else {
      setUser({});
    }
  }, []);

  const [user, setUser] = useState({});

  const { name, pseudo, email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addUser(user);
    } else {
      updateUser(user);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  // const addProposition = (e) => {
  //   e.preventDefault();

  //   const proposition = propositions.map((proposition) => {
  //     return (
  //       <div key={proposition}>
  //         {' propositions'}
  //         <input
  //           type='text'
  //           name='proposition'
  //           placeholder='proposition'
  //           value={proposition.proposition}
  //           onChange={onChange}
  //         />
  //       </div>
  //     );
  //   });
  //   propositions.push(proposition);
  // };

  // const addTheResponse = () => {
  //   if(){
  //     validAnswers.map((validAnswer) => {
  //       return (
  //         <div key={validAnswer}>
  //           <input type='text' />
  //         </div>
  //       );
  //     });
  //   }
  // }
  // const proposition = propositions.map((proposition) => {
  //   console.log(proposition);

  //   return (
  //     <ul key={proposition}>
  //       <li>{proposition.proposition}</li>
  //       <li>{proposition.correct}</li>
  //     </ul>
  //   );
  // });

  //J EN SUIS LAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  return (
    <form onSubmit={onSubmit} className='form-dashboard'>
      <h2
        id='title-dashboard'
        style={{ color: 'black', textAlign: 'center' }}
        // className='text-primary'
      >
        {current ? 'Edit User Exos' : 'Add User Exos'}
      </h2>
      {'Name'}
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />{' '}
      {'Pseudo'}
      <input
        type='text'
        placeholder='pseudo'
        name='pseudo'
        value={pseudo}
        onChange={onChange}
      />{' '}
      {'Email'}
      <input
        type='text'
        placeholder='email'
        name='email'
        value={email}
        onChange={onChange}
      />
      {'password'}
      <input
        type='text'
        placeholder='password'
        name='password'
        value={password}
        onChange={onChange}
      />
      {/* <button type='button'>add Good answer</button>
      <br />
      <button type='button'>add Propositions</button> */}
      <div style={{ margin: '1rem' }}>
        <input
          type='submit'
          value={current ? 'Update french exercices' : 'Add french exercices'}
          className='btn btn-primary btn-block'
          onClick={onSubmit}
        />
      </div>
      {current && (
        <div style={{ margin: '1rem' }}>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default UserForm;
