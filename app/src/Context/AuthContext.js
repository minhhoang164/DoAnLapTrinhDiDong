import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [userloggeduid, setUserloggeduid] = useState(null);

    const userloggeduidHandler = (userid) => {
        setUserloggeduid(userid);
        AsyncStorage.setItem('userloggeduid', userid);
    };

    const checkIsLogged = async () => {
        try {
            const value = await AsyncStorage.getItem('userloggeduid');
            if (value !== null) {
                setUserloggeduid(value);
            } else {
                console.log('User logged UID not found in AsyncStorage');
            }
        } catch (error) {
            console.log('Error retrieving userloggeduid:', error);
        }
    };

    const logoutHandler = async () => {
        try {
            await AsyncStorage.removeItem('userloggeduid');
            setUserloggeduid(null);
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    useEffect(() => {
        checkIsLogged();
    }, []);

    useEffect(() => {
        logoutHandler();
    }, []);

    return (
        <AuthContext.Provider value={{ userloggeduid, userloggeduidHandler,checkIsLogged, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
