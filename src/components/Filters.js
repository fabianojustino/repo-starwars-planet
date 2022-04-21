import React, { /* useState */ useContext } from 'react';
import Context from '../Context/Context';
import Button from './Button';

export default function Filters() {
  // const [column, setColumn] = useState('');
  const { filterByNumericValues, removeOneFilter } = useContext(Context);

  return (
    <section>
      { filterByNumericValues.length > 0 && (

        filterByNumericValues.map((e, index) => (

          <div key={ index } className="filter__container">
            <span
              aria-hidden="true"
              data-testid="filter"
              onClick={ () => removeOneFilter(e.column) }
            >
              { (Object.values(e).join(' ')) }
              <Button
                label="x"
                type="button"
                onClick={ () => { } }
                disabled={ false }
                id=""
                value=""
                className=""
                img=""
              />
            </span>
          </div>

        ))

      ) }

    </section>
    // ---------------____FILTERS
  );
}
