import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function LoginForm({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(username, password);
    };

    return (
        <Container maxWidth="sm" mt={4}>
            <Typography variant="h4" mb={2}>Logowanie</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nazwa użytkownika"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" mt={2}>Zaloguj się</Button>
            </form>
        </Container>
    );
}

export default LoginForm;
