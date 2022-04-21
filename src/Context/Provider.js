import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getPlanetsApi from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [labels, setLabel] = useState([]);
  const [isNumericDisabled, setNumericDisabled] = useState(false);
  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([

  ]);
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

  // useEffect(() => filter(), [filterByNumericValues]);

  const saveSearchName = (name) => {
    setFilterByName({ name });
  };

  // Remove o item selecionado do dropdown column e adiciona o item na tabela de filtros
  const saveFilterColumn = (result) => {
    if (columns.length === 1) {
      // Desabilita o botao de filtrar numerico
      setNumericDisabled(true);
    } else {
      // habilita o botao de filtrar numerico
      setNumericDisabled(false);
    }

    if (result.value === '') {
      result.value = 0;
    }

    const resultFilterColumn = columns.filter((e) => e !== result.column);
    setColumns(resultFilterColumn);
    setFilterByNumericValues((prev) => [...prev, result]);
  };

  const context = {
    data,
    labels,
    filterByName,
    isNumericDisabled,
    filterByNumericValues,
    saveSearchName,
    columns,
    saveFilterColumn,
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
