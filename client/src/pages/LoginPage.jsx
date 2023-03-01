import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const url = process.env.REACT_APP_PORT;
    console.log(url)
    function handleLogin(ev) {
        ev.preventDefault();
        axios.post(`${url}/login`, { username, password }, { withCredentials: true })
            .then(response => {
                setUsername('');
                setPassword('');
                setUserInfo(response.data)
                setRedirect(true);
            })
            .catch(error => {
                console.log(error);
                alert("Wrong Credentials");
            });
    }

    if (redirect) {
        return <Navigate to='/' />;
    }
    return (
        <form className='login' onSubmit={handleLogin}>
            <h1>Login</h1>
            <input value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder='username' />
            <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='password' />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginPage