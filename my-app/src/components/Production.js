import React, { useState } from 'react';
import productsData from '../data/products.json';
import { Container, Typography, Select, FormControl, MenuItem, TextField, Button } from '@mui/material';

function Production({ stock, setStock }) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedProduct = productsData.find(product => product.name === productName);

        if (selectedProduct) {
            const existingProductIndex = stock.findIndex(item => item.name === productName);
            const updatedStock = [...stock];

            if (existingProductIndex !== -1) {
                // Jeśli produkt już istnieje w magazynie, dodaj do jego ilości nową ilość
                updatedStock[existingProductIndex].quantity += parseFloat(quantity);
            } else {
                // Jeśli produkt nie istnieje w magazynie, dodaj nowy produkt do magazynu
                updatedStock.push({
                    id: stock.length + 1,
                    name: selectedProduct.name,
                    quantity: parseFloat(quantity),
                });
            }

            // Zaktualizuj stan produktu w pliku products.json
            const updatedProductsData = productsData.map(product => {
                if (product.name === productName) {
                    return {
                        ...product,
                        quantity: product.quantity + parseFloat(quantity),
                    };
                }
                return product;
            });

            setStock(updatedStock);
            localStorage.setItem('stock', JSON.stringify(updatedStock));
            localStorage.setItem('products', JSON.stringify(updatedProductsData));
        } else {
            console.error('Wybrany produkt nie istnieje');
        }

        setProductName('');
        setQuantity('');
    };

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
                    mb={2}
                />
                <Button variant="contained" color="primary" type="submit">Dodaj produkt</Button>
            </form>
        </Container>
    );
}

export default Production;
