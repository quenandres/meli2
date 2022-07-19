import { render, screen } from '@testing-library/react';
import ListArticles from './../../pages/ListArticles';
import userEvent from '@testing-library/user-event';

describe('<ListArticles /> Pagina principal de los articulos', () => {
    it('Titulo principal indicando que la pagina es la #1', async () => {
        render(<ListArticles />);
        const title = await screen.findByText('Articles - pagina #1');
        expect(title).toBeInTheDocument();
    });

    it('Comprobacion de cambio de pagina', async() => {
        render(<ListArticles />);
        const button = screen.getByRole('button', { name: /next/i });
        
        userEvent.click(button);

        const title = await screen.findByText('Articles - pagina #2');
        expect(title).toBeInTheDocument();
    });
});