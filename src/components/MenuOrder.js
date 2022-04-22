import React, { useState, useContext } from 'react';
import Context from '../Context/Context';
import Select from './Select';
import Button from './Button';

export default function MenuOrder() {
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const {
    columns,
    saveOrder,
  } = useContext(Context);

  const saveFilterOrder = () => {
    const filterOrder = {
      column,
      sort,
    };
    saveOrder(filterOrder);
  };

  return (
    <section>
      <Select
        label="Ordenar"
        onChange={ (e) => setColumn(e.target.value) }
        value={ column }
        name="column-sort"
        id="column-sort"
        defaultValue=""
        options={ columns }
      />
      <label htmlFor="asc">
        <input
          type="radio"
          value="ASC"
          name="order"
          data-testid="column-sort-input-asc"
          onChange={ (e) => setSort(e.target.value) }
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          type="radio"
          value="DESC"
          name="order"
          data-testid="column-sort-input-desc"
          onChange={ (e) => setSort(e.target.value) }
        />
        Descendente
      </label>
      <Button
        label="Filtrar"
        type="button"
        onClick={ () => saveFilterOrder() }
        disabled={ false }
        id="column-sort-button"
        value=""
        className=""
        img=""
      />
    </section>
    // ---------------____FILTERS ORDERS
  );
}
