import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Só faz scroll para o topo quando REALMENTE muda de página
        // Não quando há apenas mudanças de estado interno da página
        const timeoutId = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 100); // Pequeno delay para garantir que a página carregou

        // Limpa o timeout se o componente desmontar
        return () => clearTimeout(timeoutId);
    }, [pathname]); // Só executa quando o pathname muda de fato

    return null;
};

export default ScrollToTop;