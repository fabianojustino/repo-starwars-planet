import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
