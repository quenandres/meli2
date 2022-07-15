import React, { useEffect, useState } from 'react';
import ItemArticle from '../components/ItemArticle';
import Paginator from '../components/Paginator';
import { useFetchHook } from '../hooks/useFetchHook';
import usePagination from '@mui/material/usePagination';
import { MDBRow } from 'mdb-react-ui-kit';

function ListArticles() {

    //const [loading, setLoading] = useState(false);
    const { articles } = useFetchHook();
    const [pageSelect, setPageSelect] = useState(1);

    const { items } = usePagination({
      count: 10,
    });
      
    useEffect(() => {

    }, []);

    // title, url, imageUrl
    return ( 
    <>
        <h1>Principal</h1>
        <h3>{pageSelect}</h3>
                
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {articles.length && articles.map((article, index) => {
                        return <ItemArticle key={index} article={article} pageSelect={pageSelect} />
                    })}
                </MDBRow>
                
        <Paginator items={items} pageSelect={pageSelect} setPageSelect={setPageSelect} />
    </>
    );
}

export default ListArticles;