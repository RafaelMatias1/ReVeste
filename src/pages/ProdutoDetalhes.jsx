import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProdutoCard from '../components/ProdutoCard';
import ContactModal from '../components/ContactModal';
import FavoriteButton from '../components/FavoriteButton'; // NOVO IMPORT
import { useAuth } from '../context/AuthContext';
import '../styles/ProdutoDetalhes.css';
import '../styles/ProdutoCard.css';

// Importar imagens que você tem para os exemplos da seção "Outras Roupas"
// ATENÇÃO: Essas imagens devem estar em public/img/ e os caminhos aqui são diretos.
const RELATED_IMAGES = {
    vestidofem: "/img/vestidofem.jpeg",
    blusabranca: "/img/blusabranca.jpeg",
    VansMasc: "/img/VansMasc.jpeg",
    tenisallstart: "/img/tenisallstart.jpeg",
    vestidoverde: "/img/vestidoverde.jpeg",
    placeholder: "/img/placeholder.png" // Adicionado o placeholder aqui também
};

const ProdutoDetalhes = ({ produtos, deleteProduto }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    
    // NOVO STATE PARA O MODAL
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    // Estado do carrossel (deve ficar ANTES de qualquer return condicional)
    const [carouselIndex, setCarouselIndex] = useState(0);
    
    const produto = produtos.find(p => p.id === parseInt(id));

    // Se o produto não for encontrado, redireciona ou mostra mensagem
    if (!produto) {
        return (
            <>
                <Header />
                <main className="principal-produto container">
                    <p className="no-products-message">Produto não encontrado.</p>
                    <div className="detalhes-actions">
                        <Link to="/" className="btn-secondary">Voltar para a Home</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data Indisponível';
        return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const displayDataPublicacao = formatDate(produto.dataPublicacao);

    // NOVA FUNÇÃO PARA ABRIR O MODAL
    const handleContactClick = () => {
        setIsContactModalOpen(true);
    };

    // NOVA FUNÇÃO PARA FECHAR O MODAL
    const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
    };

    // Função para lidar com a exclusão do produto
    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir o anúncio "${produto.titulo}"?`)) {
            // A função deleteProduto já faz a exclusão no App.jsx
            deleteProduto(produto.id); // Esta função deve retornar true/false se confirmou
            alert('Anúncio excluído com sucesso!');
            navigate('/'); // Redireciona para a Home
        }
    };

    // Lógica para determinar se o usuário logado é o dono do anúncio
    // Isso é um placeholder, `user.id` e `produto.userId` precisam ser os IDs reais de usuário
    const isOwner = isAuthenticated && user && produto.userId === user.id;

    // Seleciona até 4 produtos quaisquer (exceto o atual)
    const outrasRoupas = produtos.filter(p => p.id !== produto.id).slice(0, 4);


    return (
        <>
            <Header />
            <main className="principal-produto">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Caminho de navegação">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            {/* Ajuste do breadcrumb para categoria/localização */}
                            {produto.localizacao && <li><Link to={`/categorias/${produto.localizacao.split('/')[0].toLowerCase()}`}>{produto.localizacao.split('/')[0]}</Link></li>}
                            {produto.categoria && <li><Link to={`/categorias/${produto.categoria.toLowerCase()}`}>{produto.categoria}</Link></li>}
                            <li><span>{produto.titulo}</span></li>
                        </ul>
                    </nav>

                    <section className="detalhes-produto">
                        <div className="imagem-produto-grande">
                            {/* Exibe a primeira foto do produto ou um placeholder */}
                            <img src={produto.fotos[0] || RELATED_IMAGES.placeholder} alt={produto.titulo} />
                            {/* BOTÃO DE FAVORITO ADICIONADO NA IMAGEM GRANDE */}
                            <FavoriteButton produto={produto} size="large" className="produto-detalhes-favorite" />
                        </div>
                        <div className="info-produto-detalhes">
                            <h2 className="titulo-produto-detalhes">{produto.titulo}</h2>
                            <div className="botoes-acao">
                                {/* BOTÃO ATUALIZADO COM A NOVA FUNÇÃO */}
                                <button 
                                    className="botao-solicitar"
                                    onClick={handleContactClick}
                                >
                                    Fazer Proposta de Encontro
                                </button>
                                <Link to="/chat" className="botao-chat">Chat</Link>
                            </div>
                            <ul className="lista-detalhes">
                                <li><strong>Descrição:</strong> {produto.descricao}</li>
                                <li><strong>Categoria:</strong> {produto.categoria}</li>
                                <li><strong>Gênero:</strong> {produto.genero}</li>
                                <li><strong>Tamanho:</strong> {String(produto.tamanho).toUpperCase()}</li>
                                <li><strong>Condição:</strong> {produto.condicao}</li>
                                <li><strong>Localização:</strong> {produto.localizacao}</li>
                                <li><strong>Publicado em:</strong> {displayDataPublicacao}</li> {/* Variável usada aqui */}
                            </ul>

                            {/* Botões de Edição e Exclusão, visíveis APENAS para o dono do anúncio */}
                            {isOwner && (
                                <div className="owner-actions">
                                    <Link to={`/editar-anuncio/${produto.id}`} className="btn-editar-produto">
                                        Editar Anúncio
                                    </Link>
                                    <button onClick={handleDelete} className="btn-excluir-produto">
                                        Excluir Anúncio
                                    </button>
                                </div>
                            )}

                        </div>
                    </section>

                    <section className="secao_outras_roupas">
                        <h2>Outras Roupas</h2>
                        {outrasRoupas.length === 0 ? (
                            <p className="no-products-message">Nenhuma roupa encontrada.</p>
                        ) : (
                            <div className="lista_itens" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '1.5rem',
                                justifyItems: 'center',
                                alignItems: 'stretch',
                                margin: '0 auto',
                                width: '100%'
                            }}>
                                {outrasRoupas.map((prod) => (
                                    <Link to={`/produto/${prod.id}`} className="item-link" key={prod.id} style={{ width: '100%', maxWidth: 280 }}>
                                        <ProdutoCard produto={prod} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <div style={{ height: '40px' }} />
            <Footer />
        </>
    );
};

export default ProdutoDetalhes;