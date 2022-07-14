import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const pages = [1,2,3,4,5,6,7,8,9];

function Paginator() {

    const [pageSelect, setPageSelect] = useState(1);

    return ( 
        <>
            <h1> {pageSelect} </h1>
            {pages.map(page => {
                if( page === pageSelect ) {
                    //return ( <Button className="btn btn-primary" onClick={() => setPageSelect(page)}> {page} </Button> );                    
                    return ( <Button key={page} variant="primary"> {page} </Button> );
                } else {
                    //return ( <Button className="btn btn-info" >  </Button> );
                    return ( <Button key={page} variant="success" onClick={() => setPageSelect(page)}> {page} </Button> );
                }
            })}
        </>
    );
}

export default Paginator;