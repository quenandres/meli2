import React, { useState } from 'react';
import { Button, Pagination } from '@mui/material';


function Paginator() {

    const [pageSelect, setPageSelect] = useState(1);

    return ( 
        <>
            <h1> {pageSelect} </h1>
            <Pagination count={10} color="primary" />
        </>
    );
}

export default Paginator;