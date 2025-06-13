import React from 'react';
import PageLayout from '../components/PageLayout';

const Favoritos = () => {
    return (
        <PageLayout 
            title="Meus Favoritos" 
            subtitle="Itens que você salvou para ver depois"
            className="favoritos-page"
        >
            <div className="favoritos-content">
                <div className="empty-state">
                    <div className="empty-icon">❤️</div>
                    <h3>Nenhum favorito ainda</h3>
                    <p>Quando você favoritar itens, eles aparecerão aqui para você acessar facilmente.</p>
                    <a href="/" className="btn btn-primary">
                        Explorar Itens
                    </a>
                </div>
            </div>
        </PageLayout>
    );
};

export default Favoritos;