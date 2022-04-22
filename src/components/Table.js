import React, { useContext } from 'react';
import Context from '../Context/Context';

function Table() {
  const { labels,
    data,
    filterByName,
    filterByNumericValues: filterN,
    order,
    orderIsActive,
  } = useContext(Context);
  const { name: searchName } = filterByName;

  // campos usados na ordenacao de campos numericos
  const fieldOrder = order.column;
  const orderFilter = order.sort;

  function compare(a, b) {
    if (orderFilter === 'ASC') {
      return (Number(a[fieldOrder]) - Number(b[fieldOrder]));
    }
    return (Number(b[fieldOrder]) - Number(a[fieldOrder]));
  }

  let dataPlanet;
  if (orderIsActive) {
    // por filtro numerico
    // array sem os objetos com o campo unknwon
    const outUnknown = data.filter((e) => e[fieldOrder] !== 'unknown');
    // Dados somente com objetos que possuem o campo unknwon
    const unknowns = data.filter((e) => e[fieldOrder] === 'unknown');
    // Coloca em ordem os numeros e une com os objetos que possuem unknowns
    dataPlanet = [...outUnknown.sort(compare), ...unknowns];
  } else {
    // filtro por nome
    dataPlanet = data.sort((a, b) => {
      const meno1 = -1;
      if (a.name < b.name) {
        return meno1;
      }
      return true;
    });
  }

  // reference: https://dev.to/lukyhenson/substitua-sua-instrucao-switch-e-varios-if-and-else-usando-object-literals-pt-br-4po9
  function filterSome(type, coluna, value) {
    const filter = {
      'maior que': () => Number(coluna) > Number(value),
      'menor que': () => Number(coluna) < Number(value),
      'igual a': () => Number(coluna) === Number(value),
      default: true,
    };
    return (filter[type] || filter.default)();
  }

  const filterItems = (planet) => {
    const results = filterN.map(({ column, comparison, value }) => {
      const result = filterSome(comparison, planet[column], value);
      return result;
    });
    return results.every((e) => e === true);
  };

  /*   const filterAll = (planet) => {
      const results = filterN.map(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
      // Se passar por todos os filtros e retornar true, renderiza
      return results.every((e) => e === true);
    };
   */
  const filterData = dataPlanet
    .filter((planet) => planet.name.toLowerCase().includes((searchName).toLowerCase())
      && filterItems(planet));

  return (
    <table style={ { border: '1px solid black' } }>
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
