import { render, screen } from '@testing-library/react';
import ItemArticle from './../../components/ItemArticle';

describe('<ItemArticle /> ItemArticle', () => {
    const article = {
        title: 'test de titulo',
        url: 'https://http2.mlstatic.com',
        imageUrl: '(https://http2.mlstatic.com/D_NQ_NP974268-MLA41149104135_032020-F.jpg'
    }
    
    it('Comprobación de que el titulo en el card', async() => {    
        render(<ItemArticle article={article}/>);    
        const titleCard = await screen.findByText('test de titulo');
        expect(titleCard).toHaveTextContent('test de titulo');
    });

    it('Comprobacion de boton de redirección', () => {
        render(<ItemArticle article={article}/>);
        const button = screen.getByText('Ir');
        expect(button).toHaveClass('btn-primary');
    });
});