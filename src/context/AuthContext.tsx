import {
    UserCredential,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import React, { FunctionComponent, createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { getRoleByUserId } from '../services/rolesService';

interface User {
    uuid: string;
    role: string;
    email: string;
    basketId: string;
}

interface AuthContextType {
    user: User;
    CreateUser: (email: string, password: string) => Promise<UserCredential>;
    SignIn: (email: string, password: string) => Promise<UserCredential>;
    Logout: () => Promise<void>;
    isLogged: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState({} as User);
    const [isLogged, setIsLogged] = useState(false);

    const CreateUser = (email: string, password: string) => {
        setIsLogged(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const SignIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            console.log('🚀 ~ returnsignInWithEmailAndPassword ~ userCredential:', userCredential);
            const currentUser = userCredential.user;
            const role = await getRoleByUserId(currentUser?.uid);
            const token = await currentUser?.getIdToken();
            localStorage.setItem('token', token);
            setUser({ uuid: currentUser?.uid, role: role, email: currentUser?.email } as User);
            setIsLogged(true);
            return userCredential;
        });
    };

    const Logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        location.href = '/sign-in';
        setIsLogged(false);

        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
            const role = await getRoleByUserId(currentUser?.uid);
            setUser({ uuid: currentUser?.uid, role: role, email: currentUser?.email } as User);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, CreateUser, SignIn, Logout, isLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext doit être utilisé au sein d’un AuthContextProvider');
    }
    return context;
};
