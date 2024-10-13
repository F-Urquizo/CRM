import { Box, Button, CircularProgress, TextField, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import axios from "axios"; // Para manejar el sign-up
import hola from '/src/assets/hola.png';
import logo from '/src/assets/images.jpg';

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre sign-in y sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Si es sign-up, realiza la solicitud para crear una cuenta
        const response = await axios.post("https://localhost:3000/usuarios", {
          nombre: username, // Aquí puedes ajustar qué datos mandar, por simplicidad solo el username
          usuario: username,
          password,
          email,
          rol: "Donador", // Siempre asigna el rol "Donador"
        });

        if (response.status === 201) {
          notify('Cuenta creada exitosamente, por favor inicia sesión.', { type: 'success' });
          setIsSignUp(false); // Cambia de nuevo a la vista de inicio de sesión
        } else {
          throw new Error('Error al crear la cuenta');
        }
      } else {
        // Si es login, realiza la solicitud de autenticación
        await login({ username, password });
        setIsLoggedIn(true);
      }
    } catch (error) {
      setLoading(false);
      setError('Error en la autenticación o creación de cuenta');
      notify(error.response?.data?.message || 'Error al intentar la operación', { type: 'warning' });
    }
    setLoading(false);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* Background */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "70%",
        backgroundImage: `url(${logo})`,
      }} />
      
      {/* Login/Signup form */}
      <Box sx={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: isLoggedIn ? "100%" : { xl: "30%", lg: "30%", md: "50%", xs: "100%" },
        transition: "all 1s ease-in-out",
        bgcolor: "#white"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Typography variant="h4" component="div" gutterBottom>
              {isSignUp ? "Crear Cuenta" : "Bienvenido"}
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Box component="form" maxWidth={400} width="100%" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField 
                  label="Usuario" 
                  fullWidth 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
                {isSignUp && (
                  <TextField 
                    label="Email" 
                    type="email" 
                    fullWidth 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                )}
                <TextField 
                  label="Contraseña" 
                  type="password" 
                  fullWidth 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" size="large" variant="contained" color="success" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : (isSignUp ? "Sign Up" : "Sign In")}
                </Button>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography color="primary" onClick={() => setIsSignUp(!isSignUp)} sx={{ cursor: 'pointer' }}>
                    {isSignUp ? "Ya tienes una cuenta? Inicia sesión" : "No tienes cuenta? Regístrate"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Typography
              display="inline"
              fontWeight="bold"
              sx={{ "& > a": { color: "#d32f2f", ml: "5px" } }}
            >
            </Typography>
          </Box>

          {/* Loading overlay */}
          {loading && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: "rgba(255,255,255,0.8)",
                zIndex: 1000
              }}
            >
              <CircularProgress />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
