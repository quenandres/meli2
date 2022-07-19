import { render, screen, fireEvent } from '@testing-library/react';
import ListArticles from './../../pages/ListArticles';


describe('<ListArticles /> Pagina principal de los articulos', () => {
    it('Titulo principal indicando que la pagina es la #1', () => {
        render(<ListArticles />);
        screen.getByText('Articles - pagina #1', {exact: true});
    });

    it('cantidad de cards en la pantalla', async () => {
        render(<ListArticles />);
        
        const cards = await screen.findAllByText(/button/i);
        expect(cards.length).toBe(10);
    });




    /*it('Click en el boton de cambio de pagina', () => {
        render(<ListArticles />);
        fireEvent.click(screen.getByText(/next/i));

        
        // renderApp();
        // fireEvent.click(screen.getByTestId("button-target"));
        // expect(screen.getByTestId("on-click-span")).toHaveTextContent(onClickValue);
        // expect(screen.getByTestId("on-hover-span")).toHaveTextContent(onHoverValue);
        
    });*/
});