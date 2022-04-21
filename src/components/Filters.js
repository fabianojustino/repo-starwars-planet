import React, { /* useState */ useContext } from 'react';
import Context from '../Context/Context';
import Button from './Button';

export default function Filters() {
  // const [column, setColumn] = useState('');
  const { filterByNumericValues } = useContext(Context);

  return (
    <section>
      { filterByNumericValues.length > 0 && (

        filterByNumericValues.map((e, index) => (

          <div key={ index } className="filter__container">
            <p>{(Object.values(e).join(' '))}</p>

            <Button
              label="Filtrar"
              type="button"
              onClick={ () => ({}) }
              disabled={ false }
              data-testid="button-filter"
              value=""
              className=""
              img=""
            />
          </div>

        ))

      ) }

    </section>
    // ---------------____FILTERS
  );
}
