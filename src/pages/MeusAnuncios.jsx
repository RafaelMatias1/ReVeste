import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const MeusAnuncios = () => {
    return (
        <PageLayout 
            title="Meus Anúncios" 
            subtitle="Gerencie seus itens publicados"
            className="meus-anuncios-page"
        >
            <div className="meus-anuncios-content">
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>Nenhum anúncio publicado</h3>
                    <p>Você ainda não publicou nenhum item para troca. Que tal começar agora?</p>
                    <Link to="/publicar" className="btn btn-primary">
                        Publicar Primeiro Item
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
};

export default MeusAnuncios;