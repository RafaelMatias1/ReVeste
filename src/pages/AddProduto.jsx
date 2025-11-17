import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { produtoAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SafeImage from '../components/SafeImage';
import '../styles/AddProduto.css';
import '../styles/SafeImage.css';

const AddProduto = ({ addProduto, produtos, updateProduto, deleteProduto }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        categoria: '',
        genero: '',
        tamanho: '',
        condicao: '',
        localizacao: '',
        fotos: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditing && produtos) {
            const produto = produtos.find(p => p.id === parseInt(id));
            if (produto) {
                setFormData({
                    titulo: produto.titulo || '',
                    descricao: produto.descricao || '',
                    categoria: produto.categoria || '',
                    genero: produto.genero || '',
                    tamanho: produto.tamanho || '',
                    condicao: produto.condicao || '',
                    localizacao: produto.localizacao || '',
                    fotos: produto.fotos || []
                });
            }
        }
    }, [isEditing, id, produtos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageDataUrl = event.target.result;
                    setFormData(prev => ({
                        ...prev,
                        fotos: [...prev.fotos, imageDataUrl]
                    }));
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            fotos: prev.fotos.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.titulo.trim()) newErrors.titulo = 'Título é obrigatório';
        if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
        if (!formData.categoria) newErrors.categoria = 'Categoria é obrigatória';
        if (!formData.genero) newErrors.genero = 'Gênero é obrigatório';
        if (!formData.tamanho.trim()) newErrors.tamanho = 'Tamanho é obrigatório';
        if (!formData.condicao) newErrors.condicao = 'Condição é obrigatória';
        if (!formData.localizacao.trim()) newErrors.localizacao = 'Localização é obrigatória';
        if (formData.fotos.length === 0) newErrors.fotos = 'Pelo menos uma foto é obrigatória';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const produtoData = {
                titulo: formData.titulo,
                descricao: formData.descricao,
                categoria: formData.categoria,
                genero: formData.genero,
                tamanho: formData.tamanho,
                condicao: formData.condicao,
                localizacao: formData.localizacao,
                fotos: formData.fotos || []
            };

            if (isEditing) {
                // Atualizar produto via API
                await produtoAPI.update(id, produtoData);
                alert('Produto atualizado com sucesso!');
            } else {
                // Criar novo produto via API
                await produtoAPI.create(produtoData);
                alert('Produto publicado com sucesso!');
            }

            navigate('/meus-anuncios');
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert(error.response?.data?.message || 'Erro ao salvar produto. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await produtoAPI.delete(id);
                alert('Produto excluído com sucesso!');
                navigate('/meus-anuncios');
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto. Tente novamente.');
            }
        }
    };

    return (
        <>
            <Header />
            <main className="main-add-produto">
                <div className="container-add-produto">
                    <div className="form-header">
                        <h1>{isEditing ? 'Editar Anúncio' : 'Publicar Novo Item'}</h1>
                        <p>{isEditing ? 'Atualize as informações do seu item' : 'Preencha os dados do item que deseja trocar'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="form-add-produto">
                        {/* Título */}
                        <div className="form-group">
                            <label htmlFor="titulo">Título do anúncio *</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                placeholder="Ex: Vestido floral tamanho M"
                                className={errors.titulo ? 'error' : ''}
                            />
                            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
                        </div>

                        {/* Descrição */}
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição *</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                placeholder="Descreva o item, estado de conservação, marca, etc."
                                rows="4"
                                className={errors.descricao ? 'error' : ''}
                            />
                            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
                        </div>

                        {/* Fotos */}
                        <div className="form-group">
                            <label>Fotos do item *</label>
                            <div className="fotos-container">
                                {formData.fotos.map((foto, index) => (
                                    <div key={index} className="foto-preview">
                                        <SafeImage
                                            src={foto}
                                            alt={`Foto ${index + 1}`}
                                            className="preview-image"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="remove-foto"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <label className="upload-foto">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <div className="upload-placeholder">
                                        <span>+</span>
                                        <small>Adicionar foto</small>
                                    </div>
                                </label>
                            </div>
                            {errors.fotos && <span className="error-message">{errors.fotos}</span>}
                        </div>

                        {/* Categoria e Gênero */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="categoria">Categoria *</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    className={errors.categoria ? 'error' : ''}
                                >
                                    <option value="">Selecione</option>
                                    <option value="vestidos">Vestidos</option>
                                    <option value="calcas">Calças</option>
                                    <option value="camisetas">Camisetas</option>
                                    <option value="casacos">Casacos</option>
                                    <option value="calcados">Calçados</option>
                                    <option value="acessorios">Acessórios</option>
                                </select>
                                {errors.categoria && <span className="error-message">{errors.categoria}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="genero">Gênero *</label>
                                <select
                                    id="genero"
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleInputChange}
                                    className={errors.genero ? 'error' : ''}
                                >
                                    <option value="">Selecione</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="unissex">Unissex</option>
                                </select>
                                {errors.genero && <span className="error-message">{errors.genero}</span>}
                            </div>
                        </div>

                        {/* Tamanho e Condição */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tamanho">Tamanho *</label>
                                <input
                                    type="text"
                                    id="tamanho"
                                    name="tamanho"
                                    value={formData.tamanho}
                                    onChange={handleInputChange}
                                    placeholder="Ex: M, 38, 42"
                                    className={errors.tamanho ? 'error' : ''}
                                />
                                {errors.tamanho && <span className="error-message">{errors.tamanho}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="condicao">Condição *</label>
                                <select
                                    id="condicao"
                                    name="condicao"
                                    value={formData.condicao}
                                    onChange={handleInputChange}
                                    className={errors.condicao ? 'error' : ''}
                                >
                                    <option value="">Selecione</option>
                                    <option value="novo-etiqueta">Novo com etiqueta</option>
                                    <option value="novo-sem-etiqueta">Novo sem etiqueta</option>
                                    <option value="usado-perfeito">Usado - Perfeito estado</option>
                                    <option value="usado-bom">Usado - Bom estado</option>
                                    <option value="usado-regular">Usado - Estado regular</option>
                                </select>
                                {errors.condicao && <span className="error-message">{errors.condicao}</span>}
                            </div>
                        </div>

                        {/* Localização */}
                        <div className="form-group">
                            <label htmlFor="localizacao">Localização *</label>
                            <input
                                type="text"
                                id="localizacao"
                                name="localizacao"
                                value={formData.localizacao}
                                onChange={handleInputChange}
                                placeholder="Ex: São Paulo/SP"
                                className={errors.localizacao ? 'error' : ''}
                            />
                            {errors.localizacao && <span className="error-message">{errors.localizacao}</span>}
                        </div>

                        {/* Botões de ação */}
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn btn-cancel"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="btn btn-delete"
                                    disabled={isSubmitting}
                                >
                                    Excluir
                                </button>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting 
                                    ? 'Salvando...' 
                                    : isEditing 
                                        ? 'Atualizar Anúncio' 
                                        : 'Publicar Anúncio'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AddProduto;