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
        <form className='max-w-[400px] mx-auto' onSubmit={handleRegister}>
            <h1 className='text-3xl my-16 text-center'>Register</h1>
            <input className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white' value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder='username' />
            <input className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white' value={password} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='password' />
            <button className='flex mb-2 px-4 py-2 bg-black justify-center text-white w-full rounded-sm' type="submit">Register</button>
        </form>
    )
}

export default RegisterPage
