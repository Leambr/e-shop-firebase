import React from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        location.href = '/sign-in';
        return;
    }

    return children;
}
