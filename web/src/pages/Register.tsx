import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register] = useRegisterMutation();
    
    return <form onSubmit={async e => {
        e.preventDefault();
        console.log('Submited');
        const response = await register({
            variables: {
                email,
                password
            }
        });
        console.log(response);
        if (response.data === undefined) {
            return;
        }
        
        history.push("/")
    }}>
        <div>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                }}
            />
        </div>
        <div>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value)
                }}
            />
        </div>
        <button type="submit">Register</button>
    </form>
}