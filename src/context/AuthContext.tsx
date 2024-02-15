import {
    UserCredential,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import React, { createContext, useState, useContext, FunctionComponent, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getRoleByUserId } from '../services/rolesService';

interface User {
    uuid: string;
    role: string;
    email: string;
}

interface AuthContextType {
    user: User;
    CreateUser: (email: string, password: string) => Promise<UserCredential>;
    SignIn: (email: string, password: string) => Promise<UserCredential>;
    Logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState({} as User);

    const CreateUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const SignIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            const currentUser = userCredential.user;
            const role = await getRoleByUserId(currentUser?.uid);
            const token = await currentUser?.getIdToken();
            localStorage.setItem('token', token);
            setUser({ uuid: currentUser?.uid, role: role, email: currentUser?.email } as User);
            return userCredential;
        });
    };

    const Logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        location.href = '/sign-in';
        return signOut(auth);
    };

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, async (currentUser: any) => {
            const role = await getRoleByUserId(currentUser?.uid);
            setUser({ uuid: currentUser?.uid, role: role, email: currentUser?.email } as User);
        });
        return () => unsubsribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, CreateUser, SignIn, Logout }}>
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
