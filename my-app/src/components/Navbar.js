// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ handleClearStock, handleLogout }) {
    const handleClearConfirmation = () => {
        const confirmation = window.confirm('Czy na pewno chcesz wyczyścić magazyn?');

        if (confirmation) {
            handleClearStock();
        }
    };

    return (
        <header className="header">
            <div className="container header">
                <div>
                    <h1 className="header__brand">CMC Sp z o.o.</h1>
                    <h2 className="header__brand">Oddział Uście Gorlickie</h2>
                </div>
                <nav>
                    <ul className="header__nav">
                        <li className="nav__element">
                            <Link to="/" className="nav__link">Magazyn</Link>
                        </li>
                        <li className="nav-element">
                            <Link to="/production" className="nav__link">Produkcja</Link>
                        </li>
                        <li className="nav-element">
                            <Link to="/shipment" className="nav__link">Wysyłka elementów</Link>
                        </li>
                        <li className="nav-element">
                            <button className="nav__button" onClick={handleClearConfirmation}>Wyczyść magazyn</button>
                        </li>
                        <li className="nav-element">
                            <button className="nav__button" onClick={handleLogout}>Wyloguj</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
