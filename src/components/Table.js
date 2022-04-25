import React, { useContext } from 'react';
import Context from '../Context/Context';
import styles from '../styles/planets.module.css';

const compareValue = {
  'maior que': (a, b) => Number(a) > Number(b),
  'menor que': (a, b) => Number(a) < Number(b),
  'igual a': (a, b) => Number(a) === Number(b),
  default: true,
};

function Table() {
  const { labels,
    data,
    filterByName,
    filterByNumericValues: filterN,
    order,
    orderIsActive,
  } = useContext(Context);
  const { name: searchName } = filterByName;

  // campos usados na ordenacao
  const fieldOrder = order.column;
  const orderFilter = order.sort;

  function compare(a, b) {
    // ordem ascendente
    if (orderFilter === 'ASC') {
      return (Number(a[fieldOrder]) - Number(b[fieldOrder]));
    }
    // ordem descendente
    return (Number(b[fieldOrder]) - Number(a[fieldOrder]));
  }

  let dataPlanet;
  if (orderIsActive) {
    // por filtro numerico
    // array sem os campos com o valor unknwon
    const outUnknown = data.filter((e) => e[fieldOrder] !== 'unknown');
    // Dados somente com campos de valor unknwon
    const unknowns = data.filter((e) => e[fieldOrder] === 'unknown');
    // Coloca em ordem os numeros e une com os campos que possuem unknowns
    dataPlanet = [...outUnknown.sort(compare), ...unknowns];
  } else {
    // ordem ascendente por nome do planeta
    dataPlanet = data.sort((a, b) => {
      const meno1 = -1;
      if (a.name < b.name) {
        return meno1;
      }
      return true;
    });
  }

  // Refatorado, com ajuda do Eduardo Santos (Instrutor)
  const filterItems = (planet) => {
    const results = filterN.every(({ column, comparison, value }) => (
      compareValue[comparison](planet[column], value)
    ));
    return results;
  };

  const filterData = dataPlanet
    .filter((planet) => planet.name.toLowerCase().includes((searchName).toLowerCase())
      && filterItems(planet));

  return (
    <table className={ styles.table__planets }>
      <thead>
        <tr>
          { labels.map((e, index) => (
            <th key={ index }>{ e }</th>
          )) }

        </tr>
      </thead>
      <tbody>
        {
          filterData.map((
            { name,
              rotation_period: rotation,
              orbital_period: orbital,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surface,
              population,
              films,
              created,
              edited,
              url,
            }, index,
          ) => (
            <tr key={ index }>
              <td data-testid="planet-name">
                { name }
              </td>
              <td>
                { rotation }
              </td>
              <td>
                { orbital }
              </td>
              <td>
                { diameter }
              </td>
              <td>
                { /* parseFloat(value).toFixed(2) */ climate }
              </td>
              <td>
                { gravity }
              </td>
              <td>
                { terrain }
              </td>
              <td>
                { surface }
              </td>
              <td>
                { population }
              </td>
              <td>
                { films[0] }
              </td>
              <td>
                { created }
              </td>
              <td>
                { edited }
              </td>
              <td>
                { url }
              </td>
            </tr>
          ))
        }

      </tbody>
    </table>
  );
}

export default Table;
