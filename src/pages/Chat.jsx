import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../components/PageLayout';
import '../styles/Chat.css';

const chatResponses = {
    'duvidas-gerais': {
        title: 'Dúvidas Gerais',
        suggestions: [
            'Como funciona o ReVeste?',
            'Como posso trocar roupas?',
            'É seguro usar a plataforma?',
            'Preciso pagar alguma taxa?'
        ],
        responses: {
            'Como funciona o ReVeste?': 'O ReVeste é uma plataforma de troca de roupas! Você pode publicar peças que não usa mais e trocar por outras que te interessam. É sustentável, econômico e você renova seu guarda-roupa sem gastar muito! 🌱',
            'Como posso trocar roupas?': 'É simples: 1) Publique suas roupas com fotos e descrição, 2) Navegue pelos anúncios e encontre peças que te interessam, 3) Entre em contato com outros usuários, 4) Combinem o local de encontro para a troca! 👕↔️👗',
            'É seguro usar a plataforma?': 'Sim! Recomendamos sempre encontros em locais públicos e seguros. Você também pode avaliar outros usuários após as trocas. Nossa comunidade preza pela segurança e respeito mútuo! 🛡️',
            'Preciso pagar alguma taxa?': 'Não! O ReVeste é totalmente gratuito. Você só precisa se cadastrar e pode começar a trocar suas roupas imediatamente. Nossa missão é promover a sustentabilidade de forma acessível! 💚'
        }
    },
    'publicar-anuncio': {
        title: 'Publicar Anúncio',
        suggestions: [
            'Como publico uma roupa?',
            'Que fotos devo tirar?',
            'Como escrevo uma boa descrição?',
            'Posso editar meu anúncio depois?'
        ],
        responses: {
            'Como publico uma roupa?': 'Clique em "Publicar Item" no menu superior, preencha as informações da peça (título, descrição, categoria, tamanho, condição), adicione fotos e sua localização. É rápido e fácil! 📱',
            'Que fotos devo tirar?': 'Tire fotos bem iluminadas mostrando a peça completa, detalhes como estampas ou texturas, e possíveis defeitos (se houver). Fotos claras aumentam as chances de troca! 📸',
            'Como escrevo uma boa descrição?': 'Seja honesto sobre o estado da peça, mencione a marca se for conhecida, descreva o estilo e ocasião de uso. Quanto mais detalhes, melhor! Exemplo: "Vestido floral, usado 2x, perfeito para verão" 📝',
            'Posso editar meu anúncio depois?': 'Sim! Vá ao seu perfil, encontre o anúncio e clique em "Editar". Você pode alterar informações, trocar fotos ou até excluir o anúncio se não quiser mais trocar a peça. ✏️'
        }
    },
    'encontros-trocas': {
        title: 'Encontros e Trocas',
        suggestions: [
            'Onde posso fazer a troca?',
            'Como combinar um encontro?',
            'E se a roupa não servir?',
            'Posso trocar várias peças de uma vez?'
        ],
        responses: {
            'Onde posso fazer a troca?': 'Recomendamos locais públicos como shoppings, praças movimentadas, cafés ou estações de metrô. Sempre priorize sua segurança escolhendo lugares com movimento e boa iluminação! 🏢',
            'Como combinar um encontro?': 'Use nosso chat para conversar com a pessoa, definam local, data e horário. Confirmem os detalhes das peças que serão trocadas e levem documentos. A comunicação clara é essencial! 💬',
            'E se a roupa não servir?': 'Por isso recomendamos verificar bem as medidas na descrição! Se possível, experimentem as peças no momento do encontro. Caso não sirva, vocês podem combinar outras opções ou cancelar a troca. 📏',
            'Posso trocar várias peças de uma vez?': 'Claro! Muitos usuários fazem "pacotes" de troca. Combinem quantas peças cada um levará e se será 1x1 ou em quantidades diferentes. Flexibilidade é importante! 👚👖👕'
        }
    },
    'perfil-conta': {
        title: 'Perfil e Conta',
        suggestions: [
            'Como edito meu perfil?',
            'Posso ver meus anúncios ativos?',
            'Como excluo minha conta?',
            'Esqueci minha senha'
        ],
        responses: {
            'Como edito meu perfil?': 'Clique no seu nome/foto no canto superior direito e selecione "Perfil". Lá você pode alterar seus dados pessoais, foto e informações de contato. Mantenha sempre atualizado! 👤',
            'Posso ver meus anúncios ativos?': 'Sim! No seu perfil você encontra todos os seus anúncios publicados. Pode editá-los, pausá-los ou excluí-los quando quiser. É seu painel de controle pessoal! 📋',
            'Como excluo minha conta?': 'No seu perfil, role até o final e clique em "Apagar conta". Atenção: essa ação é irreversível e todos seus anúncios serão removidos permanentemente! ⚠️',
            'Esqueci minha senha': 'No momento, você pode criar uma nova conta ou tentar lembrar usando as informações que cadastrou. Estamos trabalhando numa funcionalidade de recuperação de senha! 🔑'
        }
    },
    'suporte': {
        title: 'Suporte',
        suggestions: [
            'Como reporto um problema?',
            'Encontrei um usuário suspeito',
            'Tive problemas numa troca',
            'Sugestões para melhorar'
        ],
        responses: {
            'Como reporto um problema?': 'Entre em contato conosco através do chat ou email reveste@contato.com. Descreva o problema detalhadamente e nossa equipe responderá em até 24h! 📧',
            'Encontrei um usuário suspeito': 'Sua segurança é prioridade! Nos informe imediatamente sobre comportamentos inadequados. Evite encontros com pessoas que parecem suspeitas e sempre priorize locais públicos. 🚨',
            'Tive problemas numa troca': 'Lamentamos que isso tenha acontecido. Entre em contato conosco relatando o ocorrido. Podemos mediar conflitos e, se necessário, tomar medidas contra usuários problemáticos. 🤝',
            'Sugestões para melhorar': 'Adoramos feedback! Nos conte suas ideias para melhorar o ReVeste. Estamos sempre evoluindo para oferecer a melhor experiência de troca de roupas sustentável! 💡'
        }
    }
};

// Função para gerar mensagens de boas-vindas baseadas na categoria
const getWelcomeMessages = (categoryId) => {
    const categoryTitle = chatResponses[categoryId].title;
    const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    return [
        {
            id: Date.now(),
            text: `Olá! Bem-vindo à seção "${categoryTitle}" do ReVeste! 👋`,
            sender: 'bot',
            time: currentTime
        },
        {
            id: Date.now() + 1,
            text: 'Escolha uma das perguntas sugeridas abaixo ou me diga como posso ajudar você! 😊',
            sender: 'bot',
            time: currentTime
        }
    ];
};

const Chat = () => {
    const [activeCategory, setActiveCategory] = useState('duvidas-gerais');
    const [messages, setMessages] = useState(() => getWelcomeMessages('duvidas-gerais'));
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const simulateTyping = (callback) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            callback();
        }, 1500);
    };

    const handleSuggestionClick = (suggestion) => {
        const userMessage = {
            id: Date.now(),
            text: suggestion,
            sender: 'user',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, userMessage]);

        simulateTyping(() => {
            const response = chatResponses[activeCategory].responses[suggestion];
            if (response) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: response,
                    sender: 'bot',
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMessage]);
            }
        });
    };

    const handleCategoryChange = (categoryId) => {
        // Só muda se for uma categoria diferente da atual
        if (categoryId !== activeCategory) {
            setActiveCategory(categoryId);
            
            // LIMPA O CHAT e adiciona mensagens de boas-vindas da nova categoria
            const welcomeMessages = getWelcomeMessages(categoryId);
            setMessages(welcomeMessages);
            
            // Para a animação de digitando se estiver ativa
            setIsTyping(false);
        }
    };

    return (
        <PageLayout 
            title="Chat de Ajuda" 
            subtitle={`Seção: ${chatResponses[activeCategory].title}`}
            className="chat-page"
        >
            <div className="chat-content">
                <div className="chat-categories">
                    <h3>Categorias de Ajuda</h3>
                    <div className="category-buttons">
                        {Object.entries(chatResponses).map(([key, category]) => (
                            <button
                                key={key}
                                className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(key)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((message) => (
                        <div key={message.id} className={`message ${message.sender}`}>
                            {message.text}
                            <span className="message-time">{message.time}</span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-suggestions">
                    <div className="suggestions-title">Perguntas sugeridas para {chatResponses[activeCategory].title}:</div>
                    <div className="suggestions-buttons">
                        {chatResponses[activeCategory].suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="suggestion-btn"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Chat;