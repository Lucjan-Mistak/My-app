import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, FormControl, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import productsData from '../data/products.json'; // Importujemy dane z pliku products.json

function Shipment({ stock, setStock }) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipmentOrder, setShipmentOrder] = useState([]);
    const [totalVolume, setTotalVolume] = useState(0);

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setProductName(selectedProduct);

        // Pobierz maksymalną ilość magazynową wybranego produktu
        const maxQuantity = getMaxStockQuantity(selectedProduct);
        // Ustaw wartość maksymalnej ilości jako wartość domyślną dla pola ilości
        setQuantity(maxQuantity.toString());
    };

    const getMaxStockQuantity = (productName) => {
        const product = stock.find(item => item.name === productName);
        return product ? product.quantity.toFixed(2) : '0.00';
    };

    const handleAddToShipment = () => {
        if (productName && quantity) {
            const newShipmentEntry = {
                productName: productName,
                quantity: parseFloat(quantity),
                m3: calculateVolume(parseFloat(quantity), getProductVolume(productName)),
                notes: ''
            };
            setShipmentOrder([...shipmentOrder, newShipmentEntry]);
            setProductName('');
            setQuantity('');
        }
    };

    const handleCancelShipment = () => {
        setShipmentOrder([]);
    };

    const handleSendProducts = () => {
        if (shipmentOrder.length > 0) {
            if (window.confirm('Czy na pewno chcesz wysłać te produkty?')) {
                const updatedStock = [...stock];
                shipmentOrder.forEach(item => {
                    const index = updatedStock.findIndex(stockItem => stockItem.name === item.productName);
                    if (index !== -1) {
                        updatedStock[index].quantity -= item.quantity;
                        if (updatedStock[index].quantity <= 0) {
                            updatedStock.splice(index, 1);
                        }
                    }
                });
                setStock(updatedStock);
                localStorage.setItem('stock', JSON.stringify(updatedStock));
                setShipmentOrder([]);
            }
        }
    };

    const calculateVolume = (quantity, boardVolume) => {
        return parseFloat((quantity * boardVolume).toFixed(2));
    };

    const getProductVolume = (productName) => {
        const product = productsData.find(item => item.name === productName); // Szukamy produktu w productsData
        return product ? product.boardVolume : 0;
    };

    useEffect(() => {
        let totalVolume = 0;
        shipmentOrder.forEach(item => {
            totalVolume += parseFloat(item.m3);
        });
        setTotalVolume(totalVolume.toFixed(2));
    }, [shipmentOrder]);

    return (
        <Container maxWidth="sm" mt={4}>
            <Typography variant="h4" mb={2}>Wysyłka</Typography>
            <form onSubmit={(e) => e.preventDefault()}>
                <FormControl fullWidth mb={2}>
                    <Select
                        value={productName}
                        onChange={handleProductChange}
                        required
                    >
                        <MenuItem value="">Wybierz produkt</MenuItem>
                        {stock && stock.map((item, index) => (
                            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField style={{ marginTop: '20px' }}
                    fullWidth
                    label="Ilość"
                    type=""
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    inputProps={{ min: 0 }}
                    required
                    mb={2} // Dodajemy odstęp między inputami
                />
                <Button style={{ marginTop: '20px', marginRight: '10px' }} variant="contained" color="primary" onClick={handleAddToShipment}>Dodaj do wysyłki</Button>
                <Button style={{ marginTop: '20px' }} variant="contained" color="secondary" onClick={handleCancelShipment}>Anuluj wysyłkę</Button>
            </form>

            <Typography variant="h5" mt={4} mb={2}>Zlecenie załadunku</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produkt</TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">m3</TableCell>
                            <TableCell>Uwagi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipmentOrder.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell align="right">{item.quantity.toFixed(2)}</TableCell>
                                <TableCell align="right">{typeof item.m3 === 'number' ? String(item.m3) : 'Brak danych'}</TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        value={item.notes}
                                        onChange={(e) => { item.notes = e.target.value; setShipmentOrder([...shipmentOrder]); }}
                                        placeholder="Uwagi"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><strong>Suma:</strong></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"><strong>{totalVolume}</strong></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleSendProducts}>Wyślij produkty</Button>
            </div>
        </Container>
    );
}

export default Shipment;
