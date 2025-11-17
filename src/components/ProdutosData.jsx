// Produtos iniciais vazios - produtos serão carregados da API
export const initialProdutosData = [];

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
