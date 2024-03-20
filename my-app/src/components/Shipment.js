import React, { useState } from 'react';
import { Container, Typography, Select, FormControl, MenuItem, TextField, Button } from '@mui/material';

function Shipment() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState(JSON.parse(localStorage.getItem('stock')) || []);

    // Tworzymy Set dla unikalnych nazw produktów
    const uniqueProductNames = new Set(stock.map(item => item.name));

    const handleProductChange = (event) => {
        setProductName(event.target.value);
        // Ustawiamy domyślną ilość na 0
        setQuantity('0');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const index = stock.findIndex(item => item.name === productName);

        if (index !== -1) {
            const availableQuantity = stock[index].quantity;
            const requestedQuantity = parseInt(quantity);

            if (requestedQuantity > availableQuantity) {
                alert('Nie możesz wysłać większej ilości produktu niż jest w magazynie.');
                return;
            }

            const updatedStock = [...stock];
            updatedStock[index].quantity -= requestedQuantity;

            if (updatedStock[index].quantity <= 0) {
                updatedStock.splice(index, 1);
            }

            setStock(updatedStock);
            localStorage.setItem('stock', JSON.stringify(updatedStock));
            setProductName('');
            setQuantity('');
        } else {
            alert('Nie znaleziono produktu w magazynie');
        }
    };

    return (
        <Container maxWidth="sm" mt={4}>
            <Typography variant="h4" mb={2}>Wysyłka</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth mb={2}>
                    <Select
                        value={productName}
                        onChange={handleProductChange}
                        required
                    >
                        <MenuItem value="">Wybierz produkt</MenuItem>
                        {/* Mapujemy unikalne nazwy produktów */}
                        {[...uniqueProductNames].map((productName, index) => (
                            <MenuItem key={index} value={productName}>{productName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Ilość"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    inputProps={{ min: 0 }}
                    required
                />
                <Button variant="contained" color="primary" type="submit" mt={2}>Wyślij produkt</Button>
            </form>
        </Container>
    );
}

export default Shipment;
