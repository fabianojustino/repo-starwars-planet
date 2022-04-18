import React, { useState } from 'react';
import Input from './Input';

export default function Header() {
  const [search, setSearch] = useState('');
  return (
    <section>

      <h1>Projeto Star Wars - Trybe</h1>
      <Input
        placeholder="search"
        type="text"
        onChange={ (e) => setSearch(e.target.value) }
        value={ search }
        name="search"
        id="search"
        required
      />

    </section>

  );
}
