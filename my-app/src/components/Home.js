// Home.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import productsData from '../data/products.json';

function Home({ stock }) {
    const [aggregatedStock, setAggregatedStock] = useState({});

    useEffect(() => {
        const aggregateStock = () => {
            const aggregated = {};
            stock.forEach(item => {
                if (aggregated[item.name]) {
                    aggregated[item.name] += item.quantity;
                } else {
                    aggregated[item.name] = item.quantity;
                }
            });
            return aggregated;
        };

        setAggregatedStock(aggregateStock());
    }, [stock]);

    const calculateVolume = (quantity, boardVolume) => {
        const volume = quantity * boardVolume;
        return volume.toFixed(2);
    };

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
                                    <TableCell align="right">{quantity.toFixed(2)}</TableCell>
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