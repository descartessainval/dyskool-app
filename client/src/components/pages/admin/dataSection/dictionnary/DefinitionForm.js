import React, { useState, useContext, useEffect } from 'react';
import DefinitionContext from '../../../../../context/definitions/DefinitionContext';
// import './css/dataGlossary.css';

const DefinitionForm = () => {
  const definitionContext = useContext(DefinitionContext);

  const { addDefinition, updateDefinition, clearCurrent, current } =
    definitionContext;

  // mes state:
  useEffect(() => {
    if (current !== null) {
      setDefinition(current);
    } else {
      setDefinition({
        title: '',
        content: '',
        picture: '',
        link: '',
      });
    }
  }, [definitionContext, current]);

  const [definition, setDefinition] = useState({
    title: '',
    content: '',
    picture: '',
    link: '',
  });

  const { title, content, picture, link } = definition;

  const onChange = (e) =>
    setDefinition({ ...definition, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addDefinition(definition);
    } else {
      updateDefinition(definition);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit} className='form-dashboard'>
      <h2
        id='title-dashboard'
        style={{ color: 'black', textAlign: 'center' }}
        // className='text-primary'
      >
        {current ? 'Edit Definition' : 'Add Definition'}
      </h2>
      <input
        type='text'
        placeholder='title'
        name='title'
        value={title}
        onChange={onChange}
      />{' '}
      <input
        type='text'
        placeholder='content'
        name='content'
        value={content}
        onChange={onChange}
      />{' '}
      <input
        type='text'
        placeholder='picture'
        name='picture'
        value={picture}
        onChange={onChange}
      />{' '}
      <input
        type='text'
        placeholder='link'
        name='link'
        value={link}
        onChange={onChange}
      />
      <div style={{ margin: '1rem' }}>
        <input
          type='submit'
          value={current ? 'Update definition' : 'Add definition'}
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

export default DefinitionForm;
