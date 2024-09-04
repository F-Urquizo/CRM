// src/authProvider.ts
import { AuthProvider } from "react-admin";
import axios from "axios";

export const authProvider: AuthProvider = {
    // llamado cuando el usuario intenta iniciar sesión
    login: async ({ username, password }) => {
        try {
            // Envía el nombre de usuario y la contraseña al backend para autenticación
            const response = await axios.post("http://localhost:3000/auth", {
                usuario: username,
                password: password,
            });

            // Si la autenticación es exitosa, almacena el nombre de usuario y el rol en localStorage
            if (response.data.success) {
                localStorage.setItem("username", username);
                localStorage.setItem("rol", response.data.rol); // Almacena el rol del usuario
                return Promise.resolve();
            } else {
                return Promise.reject("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject("Invalid credentials");
        }
    },

    // llamado cuando el usuario hace clic en el botón de cerrar sesión
    logout: () => {
        localStorage.removeItem("username");
        localStorage.removeItem("rol"); // Elimina el rol del usuario
        return Promise.resolve();
    },

    // llamado cuando la API devuelve un error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("rol"); // Elimina el rol si hay un error de autenticación
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // llamado cuando el usuario navega a una nueva ubicación, para verificar la autenticación
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : Promise.reject();
    },

    // llamado cuando el usuario navega a una nueva ubicación, para verificar permisos / roles
    getPermissions: () => {
        const role = localStorage.getItem('rol');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};
