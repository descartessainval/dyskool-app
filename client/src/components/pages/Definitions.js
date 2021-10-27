import React, { useContext, useEffect } from 'react';
import DefinitionContext from '../../context/definitions/DefinitionContext';

const Definitions = () => {
  // initialisation du definitionContext
  const definitionContext = useContext(DefinitionContext);

  const { getDefinitions, definitions } = definitionContext;

  useEffect(() => {
    getDefinitions();
    // eslint-disable-next-line
  }, []);

  // const data = definitions.definition;
  // console.log(data);
  return (
    <section className='Definition'>
      <h1 className='manifest-title'>Définitions</h1>
      <div className='definition-container'>
        {definitions &&
          definitions.map((item) => {
            return (
              <ul className='view-data' key={item._id}>
                <li className='card-definition'>
                  <h2>{item.title} :</h2>
                  <p>{item.content}</p>
                </li>
              </ul>
            );
          })}
      </div>
    </section>
  );
};

export default Definitions;
