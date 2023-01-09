import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeyAsyncStorage, getTokenAsyncStorage, removeApiKeyAsyncSotorage, removeDateAsyncSotorage, setApiKeyAsyncStorage, setTokenAsyncStorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axios';

const AuthContext = createContext(AuthProvider);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [cpfAux, setCpfAux] = useState('');
    const [token, setToken] = useState('');
    const [apiKey, setApiKey] = useState('');

    // Auxiliares
    function auxLogin() { setLogado(true) };

    useEffect(() => {
        isInvalid();
    }, []);

    async function isInvalid() {
        const response =  await isValidToken();
        if (response) {
            const tokenAsync = await getTokenAsyncStorage();
            setToken(String(tokenAsync));
            const apiKey = await getApiKeyAsyncStorage();
            setApiKey(apiKey);
            setLogado(true);
        } else {
            setLoading(false);
        }
    }

    async function getApikey(token) {
        try {
            const response = await apiAxios.get("/getApiKey", { headers: { 'Authorization' : `Bearer ${token}`}});
            setApiKey(response.data.apiKey);
            setApiKeyAsyncStorage(response.data.apiKey);
            
        } catch(e) {
            console.log("Error getApiKey", e);
        }
    }
    
    function handleLogout() {
        setToken('');
        setLogado(false);
        removeDateAsyncSotorage();
        removeApiKeyAsyncSotorage();
        window.location.href = "/app/store24h";
    }

    async function handleLogin(email, senha) {
        try {
            setLoadingLogin(true);
            const response = await apiAxios.post('/auth/login/user', { "email": email, "senha": senha });
            setToken(response.data.token);
            setTokenAsyncStorage(response.data.token);
            await getApikey(response.data.token);
            setLogado(true);
            setLoadingLogin(false);
            window.location.href = "/app/store24h";

        } catch (e) {
            console.log("handleLogin", e);
            setLoginError(true);
            setLoadingLogin(false);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, apiKey, loading, cpfAux, token, loadingLogin, loginError, handleLogin, handleLogout, auxLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;