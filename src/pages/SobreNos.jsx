import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/SobreNos.css';

const SobreNos = () => {
    // Estados para controlar os carrosséis
    const [currentValor, setCurrentValor] = useState(0);
    const [currentPasso, setCurrentPasso] = useState(0);
    const [currentStat, setCurrentStat] = useState(0);

    // Dados dos valores
    const valores = [
        {
            icon: "🌿",
            title: "Sustentabilidade",
            description: "Reduzimos o impacto ambiental promovendo a reutilização e economia circular na moda."
        },
        {
            icon: "🤝",
            title: "Comunidade",
            description: "Criamos conexões genuínas entre pessoas que compartilham valores sustentáveis."
        },
        {
            icon: "✨",
            title: "Originalidade",
            description: "Cada peça é única e carrega uma história, promovendo um estilo autêntico e pessoal."
        },
        {
            icon: "🔒",
            title: "Confiança",
            description: "Priorizamos a segurança e transparência em todas as trocas realizadas na plataforma."
        }
    ];

    // Dados dos passos
    const passos = [
        {
            numero: "1",
            title: "Cadastre-se",
            description: "Crie sua conta gratuitamente e faça parte da comunidade ReVeste."
        },
        {
            numero: "2",
            title: "Publique suas peças",
            description: "Tire fotos e descreva as roupas que você quer trocar ou doar."
        },
        {
            numero: "3",
            title: "Conecte-se",
            description: "Entre em contato com outros usuários e negocie suas trocas."
        },
        {
            numero: "4",
            title: "Troque com segurança",
            description: "Encontre-se em locais seguros e complete sua troca sustentável."
        }
    ];

    // Dados das estatísticas
    const stats = [
        {
            numero: "+10.000",
            label: "Usuários ativos"
        },
        {
            numero: "+50.000",
            label: "Peças publicadas"
        },
        {
            numero: "+25.000",
            label: "Trocas realizadas"
        },
        {
            numero: "-15 toneladas",
            label: "CO² evitado"
        }
    ];

    // Funções para navegar nos carrosséis
    const nextValor = () => {
        setCurrentValor((prev) => (prev + 1) % valores.length);
    };

    const prevValor = () => {
        setCurrentValor((prev) => (prev - 1 + valores.length) % valores.length);
    };

    const nextPasso = () => {
        setCurrentPasso((prev) => (prev + 1) % passos.length);
    };

    const prevPasso = () => {
        setCurrentPasso((prev) => (prev - 1 + passos.length) % passos.length);
    };

    const nextStat = () => {
        setCurrentStat((prev) => (prev + 1) % stats.length);
    };

    const prevStat = () => {
        setCurrentStat((prev) => (prev - 1 + stats.length) % stats.length);
    };

    // Funções auxiliares para obter índices dos itens adjacentes
    const getPrevIndex = (current, array) => (current - 1 + array.length) % array.length;
    const getNextIndex = (current, array) => (current + 1) % array.length;

    return (
        <>
            <Header />
            <main className="main-sobre-nos">
                <div className="container">
                    {/* Hero Section */}
                    <section className="hero-sobre">
                        <div className="hero-content">
                            <h1>Sobre o ReVeste</h1>
                            <p>Transformando a moda em um movimento sustentável</p>
                        </div>
                    </section>

                    {/* Nossa Missão */}
                    <section className="secao-missao">
                        <div className="missao-content">
                            <div className="missao-texto">
                                <h2>🌱 Nossa Missão</h2>
                                <p>
                                    O ReVeste nasceu com o propósito de revolucionar a forma como consumimos moda. 
                                    Acreditamos que cada peça de roupa tem uma história e pode ter uma segunda, terceira 
                                    ou até mais vidas através da economia circular.
                                </p>
                                <p>
                                    Nossa plataforma conecta pessoas que querem dar uma nova vida às suas roupas com 
                                    aquelas que procuram peças únicas e sustentáveis, promovendo um consumo mais consciente.
                                </p>
                            </div>
                            <div className="missao-imagem">
                                <div className="placeholder-imagem">
                                    🌍 ♻️ 👕
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Nossos Valores - Carrossel */}
                    <section className="secao-valores">
                        <h2>💚 Nossos Valores</h2>
                        <div className="carousel-container">
                            <button className="carousel-btn prev" onClick={prevValor}>
                                ❮
                            </button>
                            <div className="carousel-content">
                                {/* Item Anterior (Preview) */}
                                <div className="valor-card side prev" onClick={prevValor}>
                                    <div className="valor-icon">{valores[getPrevIndex(currentValor, valores)].icon}</div>
                                    <h3>{valores[getPrevIndex(currentValor, valores)].title}</h3>
                                </div>
                                
                                {/* Item Principal (Centro) */}
                                <div className="valor-card main active">
                                    <div className="valor-icon">{valores[currentValor].icon}</div>
                                    <h3>{valores[currentValor].title}</h3>
                                    <p>{valores[currentValor].description}</p>
                                </div>
                                
                                {/* Item Próximo (Preview) */}
                                <div className="valor-card side next" onClick={nextValor}>
                                    <div className="valor-icon">{valores[getNextIndex(currentValor, valores)].icon}</div>
                                    <h3>{valores[getNextIndex(currentValor, valores)].title}</h3>
                                </div>
                            </div>
                            <button className="carousel-btn next" onClick={nextValor}>
                                ❯
                            </button>
                        </div>
                        <div className="carousel-indicators">
                            {valores.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentValor ? 'active' : ''}`}
                                    onClick={() => setCurrentValor(index)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Como Funciona - Carrossel */}
                    <section className="secao-como-funciona">
                        <h2>⚡ Como Funciona</h2>
                        <div className="carousel-container">
                            <button className="carousel-btn prev" onClick={prevPasso}>
                                ❮
                            </button>
                            <div className="carousel-content">
                                {/* Passo Anterior (Preview) */}
                                <div className="passo side prev" onClick={prevPasso}>
                                    <div className="passo-numero">{passos[getPrevIndex(currentPasso, passos)].numero}</div>
                                    <h3>{passos[getPrevIndex(currentPasso, passos)].title}</h3>
                                </div>
                                
                                {/* Passo Principal (Centro) */}
                                <div className="passo main active">
                                    <div className="passo-numero">{passos[currentPasso].numero}</div>
                                    <h3>{passos[currentPasso].title}</h3>
                                    <p>{passos[currentPasso].description}</p>
                                </div>
                                
                                {/* Próximo Passo (Preview) */}
                                <div className="passo side next" onClick={nextPasso}>
                                    <div className="passo-numero">{passos[getNextIndex(currentPasso, passos)].numero}</div>
                                    <h3>{passos[getNextIndex(currentPasso, passos)].title}</h3>
                                </div>
                            </div>
                            <button className="carousel-btn next" onClick={nextPasso}>
                                ❯
                            </button>
                        </div>
                        <div className="carousel-indicators">
                            {passos.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentPasso ? 'active' : ''}`}
                                    onClick={() => setCurrentPasso(index)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Impacto - Carrossel */}
                    <section className="secao-impacto">
                        <h2>📊 Nosso Impacto</h2>
                        <div className="carousel-container">
                            <button className="carousel-btn prev" onClick={prevStat}>
                                ❮
                            </button>
                            <div className="carousel-content">
                                {/* Stat Anterior (Preview) */}
                                <div className="stat-card side prev" onClick={prevStat}>
                                    <div className="stat-numero-small">{stats[getPrevIndex(currentStat, stats)].numero}</div>
                                </div>
                                
                                {/* Stat Principal (Centro) */}
                                <div className="stat-card main active">
                                    <div className="stat-numero">{stats[currentStat].numero}</div>
                                    <div className="stat-label">{stats[currentStat].label}</div>
                                </div>
                                
                                {/* Próximo Stat (Preview) */}
                                <div className="stat-card side next" onClick={nextStat}>
                                    <div className="stat-numero-small">{stats[getNextIndex(currentStat, stats)].numero}</div>
                                </div>
                            </div>
                            <button className="carousel-btn next" onClick={nextStat}>
                                ❯
                            </button>
                        </div>
                        <div className="carousel-indicators">
                            {stats.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentStat ? 'active' : ''}`}
                                    onClick={() => setCurrentStat(index)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SobreNos;