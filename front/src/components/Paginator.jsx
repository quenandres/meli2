import * as React from 'react';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 10,
  margin: 10,
  display: 'flex',
});

export default function UsePagination({ items, pageSelect, setPageSelect }) {
  
  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let func_page = null;
          if( page > 0 && page <= 10 ) {
            func_page = setPageSelect(page);
          }

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
                onClick={func_page}
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
                onClick={func_page}
              >
               {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}