import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AddProduto.css';

const AddProduto = ({ addProduto, produtos, updateProduto, deleteProduto }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o ID da URL se for modo de edição

    // Estados para os campos do formulário
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [genero, setGenero] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [condicao, setCondicao] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [fotos, setFotos] = useState([]); // Para armazenar os objetos File do input
    const [previewFotos, setPreviewFotos] = useState([]); // Para armazenar URLs de pré-visualização

    // Efeito para carregar dados do produto se for modo de edição (id existe)
    // Ou para resetar o formulário se não estiver em modo de edição (id não existe)
    useEffect(() => {
        // Limpa URLs de pré-visualização anteriores para evitar vazamento de memória
        // Isso é feito apenas no "cleanup" do useEffect, mas também pode ser feito
        // antes de criar novas URLs no handleFileChange.
        const currentPreviewFotos = previewFotos; // Captura o valor atual para o cleanup
        return () => {
            currentPreviewFotos.forEach(url => {
                if (url.startsWith('blob:')) { // Apenas revoga URLs criadas por URL.createObjectURL
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewFotos]); // Dependência em previewFotos para que o cleanup seja re-executado quando ele muda


    useEffect(() => {
        if (id && produtos) {
            const produtoParaEditar = produtos.find(p => String(p.id) === id); // Compare como string para segurança
            if (produtoParaEditar) {
                setTitulo(produtoParaEditar.titulo);
                setDescricao(produtoParaEditar.descricao);
                setCategoria(produtoParaEditar.categoria);
                setGenero(produtoParaEditar.genero);
                setTamanho(produtoParaEditar.tamanho);
                setCondicao(produtoParaEditar.condicao);
                setLocalizacao(produtoParaEditar.localizacao);
                // Ao editar, as fotos já são URLs permanentes (ou de public/img)
                setPreviewFotos(produtoParaEditar.fotos);
                setFotos([]); // O input de arquivo não pode ser pré-preenchido com File objects
            } else {
                alert("Produto não encontrado para edição. Redirecionando para Publicar Item.");
                navigate('/publicar');
            }
        } else {
            // Modo de adição: reseta todos os campos
            setTitulo('');
            setDescricao('');
            setCategoria('');
            setGenero('');
            setTamanho('');
            setCondicao('');
            setLocalizacao('');
            setFotos([]);
            setPreviewFotos([]);
        }
    }, [id, produtos, navigate]); // Dependências: id, produtos (para buscar), navigate (para redirecionar)


    // Função para lidar com a seleção de arquivos de imagem
    const handleFileChange = (e) => {
        // Revoga URLs antigas ANTES de criar novas, para evitar vazamento de memória IMEDIATO
        previewFotos.forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });

        const selectedFiles = Array.from(e.target.files);
        setFotos(selectedFiles); // Guarda os objetos File

        // Cria URLs temporárias para pré-visualização na UI
        const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewFotos(newPreviewUrls);
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica
        if (!titulo || !descricao || !categoria || !genero || !tamanho || !condicao || !localizacao || previewFotos.length === 0) {
            alert('Por favor, preencha todos os campos e adicione ao menos uma foto.');
            return;
        }

        const produtoData = {
            titulo,
            descricao,
            categoria,
            genero,
            tamanho,
            condicao,
            localizacao,
            fotos: previewFotos, // Armazena as URLs de pré-visualização (que podem ser blobs ou paths de public)
            // userId: user ? user.id : null, // Opcional: para associar ao usuário logado
        };

        if (id) {
            // Modo de edição
            updateProduto({ ...produtoData, id: parseInt(id) });
            alert('Produto atualizado com sucesso!');
        } else {
            // Modo de adição
            addProduto(produtoData);
            alert('Produto adicionado com sucesso!');
        }

        navigate('/'); // Redireciona para a Home após o cadastro/edição
    };

    // Função para lidar com a exclusão do anúncio (no modo de edição)
    const handleDeleteClick = () => {
        // Confirma com o usuário se ele realmente deseja excluir
        if (deleteProduto(parseInt(id))) { // deleteProduto já tem sua própria confirmação interna
            alert('Anúncio excluído com sucesso!');
            navigate('/'); // Redireciona para a Home após a exclusão
        }
    };


    return (
        <>
            <Header />
            <main className="main-publicar">
                <div className="container-publicar">
                    <h2 className="titulo-pagina">{id ? 'Editar Item' : 'Publicar um Item'}</h2>
                    <p className="subtitulo-pagina">Preencha os detalhes da sua roupa para doação.</p>

                    <form className="form-publicar" onSubmit={handleSubmit}>
                        <div className="form-grupo">
                            <label htmlFor="titulo">Título do Anúncio:</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={titulo} // <-- MUITO IMPORTANTE: CAMPO CONTROLADO COM 'value'
                                onChange={(e) => setTitulo(e.target.value)} // <-- ATUALIZA O ESTADO NO CHANGE
                                placeholder="Ex: Vestido de Verão Florido"
                                required
                            />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="fotos">Fotos do Produto (até 5):</label>
                            <div className="custom-file-input">
                                <input
                                    type="file"
                                    id="fotos"
                                    name="fotos[]"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange} // <-- ATUALIZA O ESTADO NO CHANGE
                                />
                                <label htmlFor="fotos" className="custom-file-button">Escolher Arquivos</label>
                                <span id="file-names" className="file-names-display">
                                    {previewFotos.length > 0 ? `${previewFotos.length} arquivo(s) selecionado(s)` : 'Nenhum arquivo escolhido'}
                                </span>
                            </div>
                            <small>Selecione imagens claras do seu item.</small>
                            <div className="foto-previews">
                                {previewFotos.map((url, index) => (
                                    // As URLs aqui podem ser "blob:" (para novos uploads) ou "/img/..." (para existentes)
                                    <img key={index} src={url} alt={`Pré-visualização ${index}`} className="preview-thumbnail" />
                                ))}
                            </div>
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={descricao} // <-- CAMPO CONTROLADO
                                onChange={(e) => setDescricao(e.target.value)} // <-- ATUALIZA O ESTADO
                                rows="5"
                                placeholder="Descreva a roupa, condição, material, etc."
                                required
                            ></textarea>
                        </div>

                        <div className="form-grupo-linha">
                            <div className="form-grupo">
                                <label htmlFor="categoria">Categoria:</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={categoria} // <-- CAMPO CONTROLADO
                                    onChange={(e) => setCategoria(e.target.value)} // <-- ATUALIZA O ESTADO
                                    required
                                >
                                    <option value="">Selecione a Categoria</option>
                                    <option value="camisetas">Camisetas</option>
                                    <option value="calcas">Calças</option>
                                    <option value="vestidos">Vestidos</option>
                                    <option value="saias">Saias</option>
                                    <option value="blusas">Blusas</option>
                                    <option value="casacos">Casacos</option>
                                    <option value="acessorios">Acessórios</option>
                                    <option value="calcados">Calçados</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            <div className="form-grupo">
                                <label htmlFor="genero">Gênero:</label>
                                <select
                                    id="genero"
                                    name="genero"
                                    value={genero} // <-- CAMPO CONTROLADO
                                    onChange={(e) => setGenero(e.target.value)} // <-- ATUALIZA O ESTADO
                                    required
                                >
                                    <option value="">Selecione o Gênero</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="infantil">Infantil</option>
                                    <option value="unissex">Unissex</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grupo-linha">
                            <div className="form-grupo">
                                <label htmlFor="tamanho">Tamanho:</label>
                                <select
                                    id="tamanho"
                                    name="tamanho"
                                    value={tamanho} // <-- CAMPO CONTROLADO
                                    onChange={(e) => setTamanho(e.target.value)} // <-- ATUALIZA O ESTADO
                                    required
                                >
                                    <option value="">Selecione o Tamanho</option>
                                    <option value="pp">PP</option>
                                    <option value="p">P</option>
                                    <option value="m">M</option>
                                    <option value="g">G</option>
                                    <option value="gg">GG</option>
                                    <option value="xg">XG</option>
                                    <option value="unico">Único</option>
                                    <option value="34">34</option>
                                    <option value="36">36</option>
                                    <option value="38">38</option>
                                    <option value="40">40</option>
                                    <option value="42">42</option>
                                    <option value="44">44</option>
                                </select>
                            </div>

                            <div className="form-grupo">
                                <label htmlFor="condicao">Condição:</label>
                                <select
                                    id="condicao"
                                    name="condicao"
                                    value={condicao} // <-- CAMPO CONTROLADO
                                    onChange={(e) => setCondicao(e.target.value)} // <-- ATUALIZA O ESTADO
                                    required
                                >
                                    <option value="">Selecione a Condição</option>
                                    <option value="novo-etiqueta">Novo com Etiqueta</option>
                                    <option value="usado-perfeito">Usado - Perfeito Estado</option>
                                    <option value="usado-bom">Usado - Bom Estado</option>
                                    <option value="usado-detalhes">Usado - Com Pequenos Detalhes</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="localizacao">Localização para Retirada (Cidade/Estado):</label>
                            <input
                                type="text"
                                id="localizacao"
                                name="localizacao"
                                value={localizacao} // <-- CAMPO CONTROLADO
                                onChange={(e) => setLocalizacao(e.target.value)} // <-- ATUALIZA O ESTADO
                                placeholder="Ex: Florianópolis/SC"
                                required
                            />
                        </div>

                        <div className="form-actions-buttons">
                            <button type="submit" className="botao-publicar">{id ? 'Salvar Alterações' : 'Publicar Item'}</button>
                            {id && (
                                <button type="button" className="btn-excluir-form" onClick={handleDeleteClick}>
                                    Excluir Anúncio
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AddProduto;