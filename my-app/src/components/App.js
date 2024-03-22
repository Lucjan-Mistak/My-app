import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Production from './Production';
import Shipment from './Shipment';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import users from '../data/login.json';

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
        <Router>
            <div>
                {/* Wyświetl Navbar, jeśli użytkownik jest zalogowany */}
                {isAuthenticated && <Navbar handleClearStock={handleClearStock} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />}
                <Routes>
                    {/* Jeśli użytkownik jest zalogowany, wyświetl odpowiednie strony */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home stock={stock} />} />
                            <Route path="/production" element={<Production stock={stock} setStock={setStock} />} />
                            <Route path="/shipment" element={<Shipment stock={stock} setStock={setStock} />} />
                        </>
                    ) : (
                        // Jeśli użytkownik nie jest zalogowany, przekieruj go do formularza logowania
                        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
