import React from 'react';
import MenuFilter from './components/MenuFilter';
import Header from './components/Header';
import Table from './components/Table';
import Provider from './Context/Provider';
import Filters from './components/Filters';

function App() {
  return (
    <Provider>
      <Header />
      <MenuFilter />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
