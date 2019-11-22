import React from 'react'
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {
}

export const Header: React.FC<Props> = () => {
    const {data, loading} = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    let body: any = null;

    if (loading) {
        body = null;
    } else if (data) {
        if (data.me){
            body = <div>you are logged in as:  {data.me.email}</div>;
        }
    } else {
       body = <div>you are not logged in</div>
    }

    return <header>
        <div>
            <Link to="/">Home</Link>
        </div>
        <div>
            <Link to="/register">Register</Link>
        </div>
        <div>
            <Link to="/login">Login</Link>
        </div>
        <div>
            <Link to="/bye">Bye</Link>
        </div>
        <div>
            {!loading && data && await client!.resetStore();
            }}>Logout</button>}
        </div>
        <br />
        {body}
        <br />
    </header>;
}