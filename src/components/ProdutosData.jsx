export const initialProdutosData = [
    {
        id: 1,
        titulo: "Vestido Floral Vintage",
        descricao: "Lindo vestido floral em excelente estado. Perfeito para ocasiões especiais ou uso casual. Tecido leve e confortável.",
        categoria: "vestidos",
        genero: "feminino",
        tamanho: "M",
        condicao: "usado-perfeito",
        localizacao: "São Paulo/SP",
        fotos: ["/img/vestidofem.jpeg"],
        dataPublicacao: "2024-01-15T10:30:00.000Z",
        userEmail: "maria@exemplo.com",
        userId: 1,
        autorEmail: "maria@exemplo.com",
        ativo: true
    },
    {
        id: 2,
        titulo: "Blusa Branca Elegante",
        descricao: "Blusa social branca, ideal para trabalho ou eventos. Tecido de alta qualidade, muito bem conservada.",
        categoria: "blusas",
        genero: "feminino",
        tamanho: "P",
        condicao: "usado-bom",
        localizacao: "Rio de Janeiro/RJ",
        fotos: ["/img/blusabranca.jpeg"],
        dataPublicacao: "2024-01-14T08:45:00.000Z",
        userEmail: "ana@exemplo.com",
        userId: 2,
        autorEmail: "ana@exemplo.com",
        ativo: true
    },
    {
        id: 3,
        titulo: "Tênis Vans Masculino",
        descricao: "Tênis Vans clássico, pouco uso. Tamanho 42, cor preta. Muito confortável para o dia a dia.",
        categoria: "calcados",
        genero: "masculino",
        tamanho: "42",
        condicao: "usado-perfeito",
        localizacao: "Belo Horizonte/MG",
        fotos: ["/img/VansMasc.jpeg"],
        dataPublicacao: "2024-01-13T16:20:00.000Z",
        userEmail: "joao@exemplo.com",
        userId: 3,
        autorEmail: "joao@exemplo.com",
        ativo: true
    },
    {
        id: 4,
        titulo: "All Star Converse Original",
        descricao: "Tênis All Star Converse em ótimo estado. Cor vermelha, tamanho 39. Usado poucas vezes.",
        categoria: "calcados",
        genero: "unissex",
        tamanho: "39",
        condicao: "usado-bom",
        localizacao: "Florianópolis/SC",
        fotos: ["/img/tenisallstart.jpeg"],
        dataPublicacao: "2024-01-12T14:15:00.000Z",
        userEmail: "carlos@exemplo.com",
        userId: 4,
        autorEmail: "carlos@exemplo.com",
        ativo: true
    },
    {
        id: 5,
        titulo: "Vestido Verde Esmeralda",
        descricao: "Vestido verde longo, muito elegante. Usado apenas uma vez em festa. Tamanho G, tecido fluido.",
        categoria: "vestidos",
        genero: "feminino",
        tamanho: "G",
        condicao: "novo-sem-etiqueta",
        localizacao: "Porto Alegre/RS",
        fotos: ["/img/vestidoverde.jpeg"],
        dataPublicacao: "2024-01-11T19:30:00.000Z",
        userEmail: "lucia@exemplo.com",
        userId: 5,
        autorEmail: "lucia@exemplo.com",
        ativo: true
    },
    {
        id: 6,
        titulo: "Jaqueta Jeans Vintage",
        descricao: "Jaqueta jeans estilo vintage dos anos 90. Tamanho M, cor azul clássico. Perfeita para look casual.",
        categoria: "jaquetas",
        genero: "unissex",
        tamanho: "M",
        condicao: "usado-bom",
        localizacao: "Curitiba/PR",
        fotos: ["/img/placeholder.jpg"],
        dataPublicacao: "2024-01-10T11:00:00.000Z",
        userEmail: "pedro@exemplo.com",
        userId: 6,
        autorEmail: "pedro@exemplo.com",
        ativo: true
    },
    {
        id: 7,
        titulo: "Camiseta Básica Preta",
        descricao: "Camiseta básica preta, 100% algodão. Tamanho P, nova com etiqueta. Perfeita para compor looks.",
        categoria: "camisetas",
        genero: "unissex",
        tamanho: "P",
        condicao: "novo-etiqueta",
        localizacao: "Brasília/DF",
        fotos: ["/img/placeholder.jpg"],
        dataPublicacao: "2024-01-09T09:45:00.000Z",
        userEmail: "rafael@exemplo.com",
        userId: 7,
        autorEmail: "rafael@exemplo.com",
        ativo: true
    },
    {
        id: 8,
        titulo: "Calça Jeans Skinny",
        descricao: "Calça jeans skinny feminina, cor azul escuro. Tamanho 38, cintura alta. Muito confortável.",
        categoria: "calcas",
        genero: "feminino",
        tamanho: "38",
        condicao: "usado-perfeito",
        localizacao: "Salvador/BA",
        fotos: ["/img/placeholder.jpg"],
        dataPublicacao: "2024-01-08T15:20:00.000Z",
        userEmail: "beatriz@exemplo.com",
        userId: 8,
        autorEmail: "beatriz@exemplo.com",
        ativo: true
    }
];

// Função para obter produtos do localStorage ou retornar dados iniciais
export const getProdutos = () => {
    if (typeof window === 'undefined') {
        return initialProdutosData;
    }
    
    try {
        const produtosSalvos = localStorage.getItem('reveste_produtos');
        if (produtosSalvos) {
            const produtos = JSON.parse(produtosSalvos);
            return Array.isArray(produtos) ? produtos : initialProdutosData;
        }
        return initialProdutosData;
    } catch (error) {
        console.error('Erro ao carregar produtos do localStorage:', error);
        return initialProdutosData;
    }
};

// Função para salvar produtos no localStorage
export const saveProdutos = (produtos) => {
    if (typeof window === 'undefined') {
        return false;
    }
    
    try {
        localStorage.setItem('reveste_produtos', JSON.stringify(produtos));
        return true;
    } catch (error) {
        console.error('Erro ao salvar produtos no localStorage:', error);
        return false;
    }
};

// Função para adicionar um novo produto
export const addProdutoToData = (novoProduto) => {
    const produtos = getProdutos();
    const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
    const produtoComId = {
        ...novoProduto,
        id: novoId,
        dataPublicacao: new Date().toISOString(),
        ativo: true
    };
    
    const novosProdutos = [...produtos, produtoComId];
    saveProdutos(novosProdutos);
    return novosProdutos;
};

// Função para atualizar um produto existente
export const updateProdutoInData = (produtoAtualizado) => {
    const produtos = getProdutos();
    const novosProdutos = produtos.map(produto => 
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    saveProdutos(novosProdutos);
    return novosProdutos;
};

// Função para deletar um produto
export const deleteProdutoFromData = (produtoId) => {
    const produtos = getProdutos();
    const novosProdutos = produtos.filter(produto => produto.id !== produtoId);
    saveProdutos(novosProdutos);
    return novosProdutos;
};

// Função para inicializar dados se não existirem
export const initializeProdutosData = () => {
    if (typeof window === 'undefined') {
        return initialProdutosData;
    }
    
    const produtosExistentes = localStorage.getItem('reveste_produtos');
    if (!produtosExistentes) {
        saveProdutos(initialProdutosData);
        return initialProdutosData;
    }
    return getProdutos();
};
