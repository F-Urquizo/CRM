import { AuthProvider } from "react-admin";
import axios from "axios";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        try {
            // Send the username and password to the backend for authentication
            const response = await axios.post("http://localhost:3000/auth", {
                usuario: username,
                password: password,
            });

            // If authentication is successful, store the username in localStorage
            if (response.data.success) {
                localStorage.setItem("username", username);
                return Promise.resolve();
            } else {
                return Promise.reject("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject("Invalid credentials");
        }
    },

    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },

    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : Promise.reject();
    },

    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
