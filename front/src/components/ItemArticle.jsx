import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';


function ItemArticle({article}) {
    
        return (
            <>    
               <Card style={{ width: '18rem', heigth: '400px' }}>
                    <LazyLoadImage
                    width="200"
                    height="200"
                    src={article.imageUrl}
                    />
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                            <a href={article.url}>
                                <Button variant="primary">Ir</Button>
                            </a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>          
        );
    
}

export default ItemArticle;
