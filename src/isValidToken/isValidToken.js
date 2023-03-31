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

//Lista de serviços
export async function setListServicesAsyncStorage(accessList) {
    try {
        await AsyncStorage.setItem('@ListServices', JSON.stringify(accessList));
    } catch (e) {
        console.log(e);
    }
}

export async function getListServicesAsyncStorage() {
    try {
        const ListBuyServicesAsync = await AsyncStorage.getItem('@ListServices');
        if (ListBuyServicesAsync) {

            const ListBuyServices = JSON.parse(ListBuyServicesAsync);

            return ListBuyServices;
        }

        return null;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeListServicesAsyncStorage() {
    try {
        await AsyncStorage.removeItem('@ListServices');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}


//ApiKey
export async function setApiKeySystemAsyncStorage(token) {
    try {
        await AsyncStorage.setItem('@ApiKeySystem', token);
    } catch (e) {
        console.log(e);
    }
}

export async function getApiKeySystemAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@ApiKeySystem');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeApiKeySystemAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@ApiKeySystem');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//User
export async function setUserAsyncStorage(user) {
    try {
        await AsyncStorage.setItem('@User', JSON.stringify(user));
    } catch(e) {
        console.log("setUserAsyncStorage", e);
    }
}

export async function getUserAsyncStorage() {
    try {
        
        const userAsync = await AsyncStorage.getItem('@User');

        if (userAsync) {

            const user = JSON.parse(userAsync);

            return user
        }

        return null;

    } catch (e) {
        console.log(e);
        return 'deu errado no getUserAsyncStorage';
    }
}


//User
export async function setUserNameAsyncStorage(userName) {
    try {
        await AsyncStorage.setItem('@UserName', userName);
    } catch (e) {
        console.log(e);
    }
}

export async function getUserNameAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@UserName');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeUserNameAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@UserName');
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