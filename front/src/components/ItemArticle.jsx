import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';

function ItemArticle({article, pageSelect}) {
    if(article.page === pageSelect) {
        return (
            <>            
                <MDBCard className='h-100'>
                    <MDBCardImage width="50" src='https://mdbootstrap.com/img/new/standard/city/041.webp' alt='...' position='top' />
                    <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <MDBCardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                    </MDBCardText>
                    <MDBCardText>
                        <small className='text-muted'>Last updated 3 mins ago</small>
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>                
            </>          
        );
    }
}

export default ItemArticle;
