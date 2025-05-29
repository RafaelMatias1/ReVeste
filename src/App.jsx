import styles from './styles/App.module.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className={styles.App}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            {/* Exemplo de rota protegida */}
            <Route
              path="/produto"
              element={
                <PrivateRoute>
                  {/* Coloque aqui o componente da página de produto */}
                  <div>Produto protegido</div>
                </PrivateRoute>
              }
            />
            {/* Adicione outras rotas protegidas conforme necessário */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;