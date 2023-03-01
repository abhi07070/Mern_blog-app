import React, { useState } from 'react'
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = process.env.REACT_APP_PORT;
    function handleRegister(ev) {
        ev.preventDefault();
        axios.post(`${url}/register`, { username, password })
            .then(response => {
                console.log(response.data);
                setUsername('');
                setPassword('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className='register' onSubmit={handleRegister}>
            <h1>Register</h1>
            <input value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder='username' />
            <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='password' />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterPage
