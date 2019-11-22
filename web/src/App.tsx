import React, { useState, useEffect } from 'react'
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

interface Props {

}
export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true);
    
    // We query for a new accessToken
    // This is for the case the user refresh the page
    // we need a new accessToken if it is loggin.
    useEffect(() => {
        fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include'
        }).then(async request => { 
            const { accessToken} = await request.json();
            setAccessToken(accessToken);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (<Routes />);
}