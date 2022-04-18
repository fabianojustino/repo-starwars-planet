import React, { useState, useContext } from 'react';
import Context from '../Context/Context';
import Input from './Input';

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
    <section>

      <h1>Projeto Star Wars - Trybe</h1>
      <Input
        placeholder="search"
        type="text"
        onChange={ (e) => setSearchName(e) }
        value={ search }
        name="search"
        id="name-filter"
        required
      />

    </section>

  );
}
