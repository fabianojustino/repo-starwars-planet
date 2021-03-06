import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getPlanetsApi from '../services/requestApi';

const fields = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [labels, setLabel] = useState([]);
  const [isNumericDisabled, setNumericDisabled] = useState(false);
  const [columns, setColumns] = useState(fields);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'DESC' });
  const [orderIsActive, setOrderActive] = useState(false);

  useEffect(() => {
    getPlanetsApi()
      .then(({ results }) => {
        results.forEach((e) => {
          // Deleta a chave residentes dos retorno da API
          delete e.residents;
        });
        // Coloca em Ordem crescente ou descrecente
        setData(results);
        // Salva apenas os rótulos do primeiro objeto, para ser usado na <Table>
        const marks = Object.keys(results[0]);
        setLabel(marks); // referente ao thead da tabela em <Table>
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

    const resultFilterColumn = columns.filter((e) => e !== result.column);
    setColumns(resultFilterColumn);
    setFilterByNumericValues((prev) => [...prev, result]);
  };

  // Remove os filtros já aplicados, ao clicar na lixeira
  const removeOneFilter = (column) => {
    const resultFilterColumn = filterByNumericValues.filter((e) => e.column !== column);
    // devolve a opção removida ao dropDown de filtros
    setColumns((prev) => [...prev, column]);
    // atualiza o array de filtros com base no último filtro removido
    setFilterByNumericValues(resultFilterColumn);
  };

  // remove todos os filtros aplicados
  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumns(fields);
    setOrderActive(false);
    setNumericDisabled(false);
  };

  // salva a escolha de ordem (asc/desc) do usuário por coluna (population, etc)
  const saveOrder = (choice) => {
    setOrder(choice);
    setOrderActive(true);
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
    removeOneFilter,
    removeAllFilters,
    order,
    orderIsActive,
    setOrder,
    saveOrder,
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
