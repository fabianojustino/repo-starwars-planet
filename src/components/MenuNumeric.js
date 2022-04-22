import React, { useState, useContext } from 'react';
import Context from '../Context/Context';
import Select from './Select';
import Button from './Button';
import Input from './Input';
import MenuOrder from './MenuOrder';

export default function MenuNumeric() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const {
    columns,
    isNumericDisabled,
    saveFilterColumn,
    removeAllFilters,
  } = useContext(Context);

  const saveFilterNumeric = () => {
    const filterOne = {
      column,
      comparison,
      value,
    };
    saveFilterColumn(filterOne);
  };

  return (
    <section>
      <Select
        label="Coluna"
        onChange={ (e) => setColumn(e.target.value) }
        value={ column }
        name="column-filter"
        id="column-filter"
        defaultValue={ column }
        options={ columns }
      />
      <Select
        label="Operador"
        onChange={ (e) => setComparison(e.target.value) }
        value={ comparison }
        name="operator"
        id="comparison-filter"
        options={ ['maior que', 'menor que', 'igual a'] }
      />
      <Input
        placeholder=""
        type="number"
        onChange={ (e) => setValue(e.target.value) }
        value={ value === '' ? '0' : value }
        name="number"
        id="value-filter"
      />
      <Button
        label="Filtrar"
        type="button"
        onClick={ () => saveFilterNumeric() }
        disabled={ isNumericDisabled }
        id="button-filter"
        value=""
        className=""
        img=""
      />
      <Button
        label="REMOVER FILTROS"
        type="button"
        onClick={ () => removeAllFilters() }
        disabled={ isNumericDisabled }
        id="button-remove-filters"
        value=""
        className=""
        img=""
      />
      <MenuOrder />
    </section>
    // ---------------____FILTERS
  );
}
