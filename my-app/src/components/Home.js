import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import productsData from '../data/products.json';

function Home() {
    const [stock, setStock] = useState(() => {
        const storedStock = localStorage.getItem('stock');
        return storedStock ? JSON.parse(storedStock) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const storedStock = localStorage.getItem('stock');
            setStock(storedStock ? JSON.parse(storedStock) : []);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const aggregateStock = () => {
        const aggregatedStock = {};
        stock.forEach(item => {
            if (aggregatedStock[item.name]) {
                aggregatedStock[item.name] += item.quantity;
            } else {
                aggregatedStock[item.name] = item.quantity;
            }
        });
        return aggregatedStock;
    };

    const calculateVolume = (quantity, boardVolume) => {
        const volume = quantity * boardVolume;
        return volume.toFixed(2); // Zaokrąglanie do dwóch miejsc po przecinku
    };

    const aggregatedStock = aggregateStock();

    const totalVolume = Object.keys(aggregatedStock).reduce((total, productName) => {
        const quantity = aggregatedStock[productName];
        const volume = calculateVolume(quantity, getProductVolume(productName));
        return total + parseFloat(volume);
    }, 0);

    return (
        <div className="container mt-4">
            <h2>Aktualny stan magazynowy</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa produktu</TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">m3</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(aggregatedStock).map((productName, index) => {
                            const quantity = aggregatedStock[productName];
                            const volume = calculateVolume(quantity, getProductVolume(productName));
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {productName}
                                    </TableCell>
                                    <TableCell align="right">{quantity.toFixed(2)}</TableCell> {/* Zaokrąglanie do dwóch miejsc po przecinku */}
                                    <TableCell align="right">{volume}</TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell><strong>Suma:</strong></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"><strong>{totalVolume.toFixed(2)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;

function getProductVolume(productName) {
    const product = productsData.find(product => product.name === productName);
    return product ? product.boardVolume : 0;
}
