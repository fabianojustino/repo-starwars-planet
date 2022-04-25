import React, { useState, useContext } from 'react';
import Context from '../Context/Context';
import Input from './Input';
import styles from '../styles/header.module.css';

export default function Header() {
  const [search, setSearch] = useState('');
  const { saveSearchName } = useContext(Context);

  function setSearchName({ target: { value } }) {
    // Local
    setSearch(value);
    // Global, no Provider.js
    saveSearchName(value);
  }
  return (
    <header>

      <h1 className={ styles.title__site }>Star Wars</h1>
      <Input
        placeholder="Digite o nome de um planeta"
        type="text"
        onChange={ (e) => setSearchName(e) }
        value={ search }
        name="search"
        id="name-filter"
        required
      />

    </header>

  );
}
