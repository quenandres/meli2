import * as React from 'react';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 10,
  margin: 10,
  display: 'flex',
});

export default function UsePagination({ items, setPageSelect }) {
  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                className='btn btn-success btn-sm'
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button 
                className='btn btn-success btn-sm'
                type="button" {...item}
              >
                {type}
              </button>
            );
          }

          // Si la paginación es diferente a los valores, no se cambiara el valor de la pagina.
          if( page > 0 && page <=10 ) { 
            return <li key={index} onClick={() => setPageSelect(page)}>{children}</li>;
          } else {
            return <li key={index}>{children}</li>;
          }

        })}
      </List>
    </nav>
  );
}