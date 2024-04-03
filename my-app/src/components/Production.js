import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import { Container, Typography, Select, FormControl, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useProduction } from './ProductionContext';

function Production({ stock, setStock }) {
    const { productionTableData, setProductionTableData } = useProduction(); // Użyj kontekstu produkcji

    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [efficiency, setEfficiency] = useState(0.68);
    const [totalVolume, setTotalVolume] = useState(0);
    const [totalWoodNeeded, setTotalWoodNeeded] = useState(0);

    const handleEfficiencyChange = (event) => {
        setEfficiency(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedProduct = productsData.find(product => product.name === productName);

        if (selectedProduct) {
            const newProductionEntry = {
                productName: selectedProduct.name,
                quantity: parseFloat(quantity),
                m3: parseFloat(quantity * selectedProduct.boardVolume),
                woodNeeded: parseFloat(quantity * selectedProduct.boardVolume / efficiency)
            };

            setProductionTableData([...productionTableData, newProductionEntry]); // Ustaw dane tabeli produkcyjnej za pomocą kontekstu produkcji

            const existingProductIndex = stock.findIndex(item => item.name === productName);
            if (existingProductIndex !== -1) {
                const updatedStock = [...stock];
                updatedStock[existingProductIndex].quantity += parseFloat(quantity);
                setStock(updatedStock);
                localStorage.setItem('stock', JSON.stringify(updatedStock));
            } else {
                const newStockItem = {
                    id: stock.length + 1,
                    name: selectedProduct.name,
                    quantity: parseFloat(quantity),
                };
                const updatedStock = [...stock, newStockItem];
                setStock(updatedStock);
                localStorage.setItem('stock', JSON.stringify(updatedStock));
            }
        } else {
            console.error('Wybrany produkt nie istnieje');
        }

        setProductName('');
        setQuantity('');
    };

    const handleEndProduction = () => {
        setProductionTableData([]);
        setTotalVolume(0);
        setTotalWoodNeeded(0);
    };

    useEffect(() => {
        const calculateTotalWoodNeeded = () => {
            let totalVolume = 0;
            let totalWoodNeeded = 0;

            productionTableData.forEach(item => {
                totalVolume += item.m3;
                totalWoodNeeded += item.woodNeeded;
            });

            setTotalVolume(totalVolume);
            setTotalWoodNeeded(totalWoodNeeded);
        };

        calculateTotalWoodNeeded();
    }, [productionTableData]);

    const getProductVolume = (productName) => {
        const product = productsData.find(product => product.name === productName);
        return product ? product.boardVolume : 0;
    };

    const calculateVolume = (quantity, boardVolume) => {
        const volume = quantity * boardVolume;
        return volume.toFixed(2);
    };

    return (
        <Container maxWidth="sm" mt={4}>
            <Typography variant="h4" mb={1}>Produkcja</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth mb={2}>
                    <Select
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    >
                        <MenuItem value="">Wybierz produkt</MenuItem>
                        {productsData.map((product, index) => (
                            <MenuItem key={index} value={product.name}>{product.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField style={{marginTop: '10px'}}
                    fullWidth
                    label="Ilość"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    mb={2}
                />
                <TextField style={{marginTop: '10px'}}
                    fullWidth
                    label="Wydajność (%)"
                    type="number"
                    value={efficiency}
                    onChange={handleEfficiencyChange}
                    required
                    mb={2}
                />
                <Button style={{marginTop: '20px'}} variant="contained" color="primary" type="submit">Dodaj produkt</Button>
            </form>

            <Typography variant="h5" mt={4} mb={2}>Raport produkcyjny</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa produktu</TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">m3</TableCell>
                            <TableCell style={{color: 'red'}} align="right">Ilość drewna do produkcji</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productionTableData.sort((a, b) => {
                            const classA = productsData.find(product => product.name === a.productName)?.class;
                            const classB = productsData.find(product => product.name === b.productName)?.class;
                            return classA - classB;
                        }).map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{calculateVolume(item.quantity, getProductVolume(item.productName))}</TableCell>
                                <TableCell style={{color: 'red'}} align="right">{item.woodNeeded.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><strong>Suma:</strong></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"><strong>{totalVolume.toFixed(2)}</strong></TableCell>
                            <TableCell style={{color: 'red'}} align="right"><strong>{totalWoodNeeded.toFixed(2)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleEndProduction} style={{ marginRight: '10px' }}>Zakończ produkcję</Button>
            </div>
        </Container>
    );
}

export default Production;
