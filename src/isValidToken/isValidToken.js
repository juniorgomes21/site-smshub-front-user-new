import AsyncStorage from '@react-native-async-storage/async-storage';
import apiAxios from '../services/axios';


export async function setTokenAsyncStorage(token) {
    try {
        await AsyncStorage.setItem('@TokenAuthentication', token);
    } catch (e) {
        console.log(e);
    }
}

export async function getTokenAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@TokenAuthentication');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeDateAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@TokenAuthentication');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//ApiKey
export async function setApiKeyAsyncStorage(apiKey) {
    try {
        await AsyncStorage.setItem('@ApiKey', apiKey);
    } catch (e) {
        console.log(e);
    }
}

export async function getApiKeyAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@ApiKey');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeApiKeyAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@ApiKey');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

export default async function isValidToken() {
    const token = await AsyncStorage.getItem('@TokenAuthentication');

    try {
        if(!token) {
            return false;
        }
        
        await apiAxios.get('/testartoken', { headers: {'Authorization' : `Bearer ${token}`}});
        return true;

    } catch(e) {
        return false;
    }
    
}