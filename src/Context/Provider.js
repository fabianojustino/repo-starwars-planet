import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getPlanetsApi from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [labels, setLabel] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  useEffect(() => {
    getPlanetsApi()
      .then(({ results }) => {
        results.forEach((e) => {
          // Deleta a chave residentes dos retorno da API
          delete e.residents;
        });
        setData(results);
        // Salva apenas os rótulos do primeiro objeto, para ser usado na <Table>
        const marks = Object.keys(results[0]);
        setLabel(marks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveSearchName = (name) => {
    setFilterByName({ name });
  };

  const context = {
    data,
    labels,
    filterByName,
    saveSearchName,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
