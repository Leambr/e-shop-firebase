import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {

    const [role, setRole] = useState(() => {

        const role = localStorage.getItem("role");
        setRole(role)
      });

    return <div >
         <h1>Customer</h1>
    </div>;
}
