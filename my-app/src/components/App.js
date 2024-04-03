import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Production from './Production';
import Shipment from './Shipment';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import users from '../data/login.json';
import { ProductionProvider } from './ProductionContext';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [stock, setStock] = useState(() => {
        const storedStock = localStorage.getItem('stock');
        return storedStock ? JSON.parse(storedStock) : [];
    });

    const handleClearStock = () => {
        setStock([]);
        localStorage.removeItem('stock');
    };

    const handleLogin = (loginData) => {
        const authenticated = authenticateUser(loginData);
        if (authenticated) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            alert('Nieprawidłowy login lub hasło. Spróbuj ponownie.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    const authenticateUser = (loginData) => {
        return users.some(user => user.login === loginData.login && user.password === loginData.password);
    };

    return (
        <ProductionProvider> {/* Użyj dostawcy kontekstu produkcji na odpowiednim poziomie hierarchii */}
            <Router>
                <div>
                    {isAuthenticated && <Navbar handleClearStock={handleClearStock} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />}
                    <Routes>
                        {isAuthenticated ? (
                            <>
                                <Route path="/" element={<Home stock={stock} />} />
                                <Route path="/production" element={<Production stock={stock} setStock={setStock} />} />
                                <Route path="/shipment" element={<Shipment stock={stock} setStock={setStock} />} />
                            </>
                        ) : (
                            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                        )}
                    </Routes>
                </div>
            </Router>
        </ProductionProvider>
    );
}

export default App;
