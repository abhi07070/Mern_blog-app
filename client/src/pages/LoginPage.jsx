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
        <form className='max-w-[400px] mx-auto' onSubmit={handleLogin}>
            <h1 className='text-3xl my-16 text-center'>Login</h1>
            <input className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white' value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder='username' />
            <input className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white' value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='password' />
            <button className='flex mb-2 px-4 py-2 bg-black justify-center text-white w-full rounded-sm' type="submit">Login</button>
        </form>
    )
}

export default LoginPage