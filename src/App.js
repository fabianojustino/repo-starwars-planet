import React from 'react';
import MenuNumeric from './components/MenuNumeric';
import Header from './components/Header';
import Table from './components/Table';
import Provider from './Context/Provider';
import Filters from './components/Filters';
import MenuOrder from './components/MenuOrder';

function App() {
  return (
    <Provider>
      <Header />
      <MenuNumeric />
      <MenuOrder />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
