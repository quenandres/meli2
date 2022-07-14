import React, { useEffect } from 'react';
import ItemArticle from '../components/ItemArticle';
import Paginator from '../components/Paginator';
import { useFetchHook } from '../hooks/useFetchHook';

function ListArticles() {

    //const [loading, setLoading] = useState(false);
    const { articles } = useFetchHook();
    
    useEffect(() => {

    }, []);

    // title, url, imageUrl

    return ( 
    <>
        <h1>Principal</h1>
        {articles.length && articles.map((article, index) => {
                return <ItemArticle key={index} article={article} />
            })
        }
        <Paginator />
    </>
    );
}

export default ListArticles;