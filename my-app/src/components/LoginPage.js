import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import users from '../data/login.json';

function LoginPage({ onLogin }) {
    const [loginData, setLoginData] = useState({ login: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const success = authenticateUser(loginData); // Uwierzytelnianie danych logowania
        if (success) {
            onLogin(loginData); // Wywołanie funkcji przekazanej jako props do zalogowania użytkownika
        } else {
            alert('Nieprawidłowy login lub hasło. Spróbuj ponownie.');
        }
    };

    const authenticateUser = (loginData) => {
        // Sprawdzanie danych logowania na podstawie importowanych danych login.json
        return users.some(user => user.login === loginData.login && user.password === loginData.password);
    };

    return (
        <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h5" mb={3} style={{ textAlign: 'center' }}>Logowanie do aplikacji magazynowej CMC Uście Gorlickie</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    label="Nazwa użytkownika"
                    variant="outlined"
                    margin="normal"
                    name="login"
                    value={loginData.login}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '16px', width: '100%' }}
                />
                <TextField
                    fullWidth
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '16px', width: '100%' }}
                />
                <Button variant="contained" color="primary" type="submit" style={{ width: '50%', alignSelf: 'center' }}>Zaloguj się</Button>
            </form>
        </Container>
    );
}

export default LoginPage;
