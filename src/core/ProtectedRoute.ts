import React from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext();

    if (!user.hasOwnProperty('role')) {
        location.href = '/sign-in';
        return;
    }

    return children;
}
