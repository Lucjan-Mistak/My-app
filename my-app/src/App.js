import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Production from './components/Production';
import Shipment from './components/Shipment';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/production" element={<Production />} />
                    <Route path="/shipment" element={<Shipment />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
