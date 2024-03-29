import React, { useState } from 'react';
import ItemArticle from '../components/ItemArticle';
import Paginator from '../components/Paginator';
import { useFetchHook } from '../hooks/useFetchHook';
import usePagination from '@mui/material/usePagination';
import { MDBRow } from 'mdb-react-ui-kit';

function ListArticles() {

    const { articles } = useFetchHook();
    const [pageSelect, setPageSelect] = useState(1);

    const { items } = usePagination({
      count: 10,
    });

    // title, url, imageUrl
    return ( 
    <>
            <h4>Articles - pagina #{pageSelect}</h4>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                {articles.length && articles.map((article, index) => {
                    if(article.page === pageSelect) return <ItemArticle key={index + 1} article={article} />
                    return '';
                })}
            </MDBRow>
                
        <Paginator items={items} setPageSelect={setPageSelect} />
    </>
    );
}

export default ListArticles;