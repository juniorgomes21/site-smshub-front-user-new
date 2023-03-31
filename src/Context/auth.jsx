import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeyAsyncStorage, getTokenAsyncStorage, removeApiKeyAsyncSotorage, getUserNameAsyncStorage, setUserNameAsyncStorage, removeDateAsyncSotorage, setApiKeyAsyncStorage, setTokenAsyncStorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axios';

const AuthContext = createContext(AuthProvider);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [cpfAux, setCpfAux] = useState('');
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('store24Hub');
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
            const userName = await getUserNameAsyncStorage();
            setUserName(userName);
            setApiKey(apiKey);
            setLogado(true);
        } else {
            await removeDateAsyncSotorage();
            setLoading(false);
        }
    }

    
    function handleLogout() {
        setToken('');
        setLogado(false);
        removeDateAsyncSotorage();
        removeApiKeyAsyncSotorage();
        window.location.href = "/app/hub24h";
    }

    async function handleLogin(email, senha) {
        try {
            setLoadingLogin(true);
            const response = await apiAxios.post('/auth/login/user', { "email": email, "senha": senha });
            const token = response.data.token;
            setToken(token);
            setTokenAsyncStorage(token);
            const responseUser = await apiAxios.get("/userDetails", { headers: { 'Authorization' : `Bearer ${token}`}});
            setUserNameAsyncStorage(responseUser.data.nome);
            await setApiKeyAsyncStorage(responseUser.data.apiKey);
            setLogado(true);
            setLoadingLogin(false);
            window.location.href = "/app/hub24h";

        } catch (e) {
            console.log("handleLogin", e);
            setLoginError(true);
            setLoadingLogin(false);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, apiKey, userName, loading, cpfAux, token, loadingLogin, loginError, handleLogin, handleLogout, auxLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;