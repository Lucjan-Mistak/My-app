import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import { Container, Typography, Select, FormControl, MenuItem, TextField, Button } from '@mui/material';

function Production({ stock, setStock }) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedProduct = productsData.find(product => product.name === productName);

        if (selectedProduct) {
            const newStockItem = {
                id: stock.length + 1,
                name: selectedProduct.name,
                quantity: parseFloat(quantity),
            };

            const updatedStock = [...stock, newStockItem];
            setStock(updatedStock);
            localStorage.setItem('stock', JSON.stringify(updatedStock));
        } else {
            console.error('Wybrany produkt nie istnieje');
        }

        setProductName('');
        setQuantity('');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const storedStock = localStorage.getItem('stock');
            setStock(storedStock ? JSON.parse(storedStock) : []);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setStock]);

    return (
        <Container maxWidth="sm" mt={4}>
            <Typography variant="h4" mb={2}>Produkcja</Typography>
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
                <TextField
                    fullWidth
                    label="Ilość"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    mb={2} // Dodajemy odstęp między inputami
                />
                <Button variant="contained" color="primary" type="submit">Dodaj produkt</Button>
            </form>
        </Container>
    );
}

export default Production;
