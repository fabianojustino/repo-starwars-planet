import React, { useContext } from 'react';
import Context from '../Context/Context';

function Table() {
  const { labels, data, filterByName } = useContext(Context);
  const { name: searchName } = filterByName;

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
          data.filter((e) => {
            if (searchName === '') return true;
            return e.name.toLowerCase().includes((searchName).toLowerCase());
          })
            .map((
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
                <td>
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
