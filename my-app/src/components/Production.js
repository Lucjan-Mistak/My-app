import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import {
    Container,
    Typography,
    Select,
    FormControl,
    MenuItem,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

function Production({ stock, setStock }) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [efficiency, setEfficiency] = useState(0.68); // Domyślna wydajność: 100%
    const [totalVolume, setTotalVolume] = useState(0);
    const [totalWoodNeeded, setTotalWoodNeeded] = useState(0);

    const handleEfficiencyChange = (event) => {
        setEfficiency(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedProduct = productsData.find(product => product.name === productName);

        if (selectedProduct) {
            // Sprawdź, czy produkt już istnieje w magazynie
            const existingProductIndex = stock.findIndex(item => item.name === productName);

            if (existingProductIndex !== -1) {
                // Jeśli produkt już istnieje, aktualizuj jego ilość
                const updatedStock = [...stock];
                updatedStock[existingProductIndex].quantity += parseFloat(quantity);
                setStock(updatedStock);
                localStorage.setItem('stock', JSON.stringify(updatedStock));
            } else {
                // Jeśli produktu jeszcze nie ma w magazynie, dodaj nowy wpis
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

    useEffect(() => {
        const calculateTotalWoodNeeded = () => {
            let totalVolume = 0;
            let totalWoodNeeded = 0;

            stock.forEach(item => {
                const volume = getProductVolume(item.name);
                totalVolume += item.quantity * volume;
                totalWoodNeeded += item.quantity * volume / efficiency;
            });

            setTotalVolume(totalVolume);
            setTotalWoodNeeded(totalWoodNeeded);
        };

        calculateTotalWoodNeeded();
    }, [stock, efficiency]);

    const getProductVolume = (productName) => {
        const product = productsData.find(product => product.name === productName);
        return product ? product.boardVolume : 0;
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

            {/* Tabela */}
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
                        {/* Sortowanie po klasie, a następnie po nazwie produktu */}
                        {stock.reduce((acc, curr) => {
                            const existingIndex = acc.findIndex(item => item.name === curr.name);
                            if (existingIndex !== -1) {
                                // Jeśli produkt już istnieje, aktualizujemy jego ilość
                                acc[existingIndex].quantity += curr.quantity;
                            } else {
                                // Jeśli produktu jeszcze nie ma na liście, dodajemy nowy wpis
                                acc.push({ name: curr.name, quantity: curr.quantity });
                            }
                            return acc;
                        }, []).sort((a, b) => {
                            if (a.name.includes('I') && b.name.includes('II')) {
                                return -1;
                            } else if (a.name.includes('II') && b.name.includes('I')) {
                                return 1;
                            } else {
                                return a.name.localeCompare(b.name);
                            }
                        }).map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{(item.quantity * getProductVolume(item.name)).toFixed(2)}</TableCell>
                                <TableCell style={{color: 'red'}} align="right">{Math.round(item.quantity * getProductVolume(item.name) / efficiency * 100) / 100}</TableCell>
                            </TableRow>
                        ))}
                        {/* Suma */}
                        <TableRow>
                            <TableCell><strong>Suma:</strong></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"><strong>{totalVolume.toFixed(2)}</strong></TableCell>
                            <TableCell style={{color: 'red'}} align="right"><strong>{Math.round(totalWoodNeeded * 100) / 100}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Production;
