import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Production from './Production';
import Shipment from './Shipment';
import Navbar from './Navbar';

function App() {
    const [stock, setStock] = useState(() => {
        const storedStock = localStorage.getItem('stock');
        return storedStock ? JSON.parse(storedStock) : [];
    });

    return (
        <Router>
            <div>
                <Navbar setStock={setStock} />
                <Routes>
                    <Route path="/" element={<Home stock={stock} setStock={setStock}/>} />
                    <Route path="/production" element={<Production stock={stock} setStock={setStock} />} />
                    <Route path="/shipment" element={<Shipment stock={stock} setStock={setStock} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
