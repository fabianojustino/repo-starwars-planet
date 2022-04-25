import React, { useState, useContext, useEffect } from 'react';
import Context from '../Context/Context';
import Select from './Select';
import Button from './Button';
import Input from './Input';
import styles from '../styles/filter.module.css';

export default function MenuNumeric() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const {
    columns,
    isNumericDisabled,
    saveFilterColumn,
    removeAllFilters,
    filterByNumericValues,
  } = useContext(Context);

  // seta o select de label coluna com o primeiro valor do array de busca
  useEffect(() => {
    if (columns.length > 0) {
      setColumn(columns[0]);
    }
  }, [filterByNumericValues, columns]);

  const saveFilterNumeric = () => {
    const filterOne = {
      column,
      comparison,
      value,
    };
    saveFilterColumn(filterOne);
  };

  return (
    <section className={ styles.numeric__container }>
      <Select
        label="Coluna"
        onChange={ (e) => setColumn(e.target.value) }
        value={ column }
        name="column-filter"
        id="column-filter"
        defaultValue={ column }
        options={ columns }
      />
      <div>
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
      </div>
      <Button
        label="Filtrar"
        type="button"
        onClick={ () => saveFilterNumeric() }
        disabled={ isNumericDisabled }
        id="button-filter"
        value=""
        className={ styles.btn__filter }
        img=""
      />
      <Button
        label="REMOVER FILTROS"
        type="button"
        onClick={ () => removeAllFilters() }
        disabled={ false }
        id="button-remove-filters"
        value=""
        className={ styles.btn__remover__filter }
        img=""
      />
    </section>
    // ---------------____FILTERS
  );
}
