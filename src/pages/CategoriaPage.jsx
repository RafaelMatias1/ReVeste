import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProdutoCard from '../components/ProdutoCard'; // Usar o ProdutoCard aqui também
import '../styles/CategoriaPage.css'; // Crie este CSS no próximo passo
import '../styles/ProdutoCard.css'; // Importe os estilos do ProdutoCard

const CategoriaPage = ({ produtos }) => {
    const { categoriaId } = useParams(); // Pega o ID da categoria da URL

    // Filtra os produtos com base na categoria
    const produtosDaCategoria = produtos.filter(prod =>
        prod.categoria && prod.categoria.toLowerCase() === categoriaId.toLowerCase()
    );

    return (
        <>
            <Header />
            <main className="main-categoria-page">
                <div className="container">
                    <h2 className="categoria-titulo">Itens da Categoria: {categoriaId.replace(/-/g, ' ').toUpperCase()}</h2>
                    <p className="categoria-descricao">Explore todos os produtos disponíveis na categoria {categoriaId.replace(/-/g, ' ')}.</p>

                    {produtosDaCategoria.length === 0 ? (
                        <p className="no-products-message">Nenhum produto encontrado nesta categoria no momento.</p>
                    ) : (
                        <div className="lista_itens grid-categoria"> {/* Reutiliza lista_itens e adiciona grid-categoria */}
                            {produtosDaCategoria.map(produto => (
                                <Link to={`/produto/${produto.id}`} className="item-link" key={produto.id}>
                                    <ProdutoCard produto={produto} />
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="categoria-actions">
                        <Link to="/" className="btn-secondary">Voltar para Home</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CategoriaPage;