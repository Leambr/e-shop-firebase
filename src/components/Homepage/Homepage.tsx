import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/sign-in');
        }
    }, []);

    // Continue with the rest of the code for the Homepage component
    return <div>Homepage</div>;
}
