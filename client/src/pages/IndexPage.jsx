import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios';
import Spinner from '../components/Spinner';
import LandingPage from './LandingPage';
const IndexPage = () => {

    const [posts, setPosts] = useState([]);
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios.get(`${url}/post`)
            .then(response => {
                setPosts(response.data);
            })
    }, [])

    if (posts.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <LandingPage />
            {posts.length > 0 && posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </>
    )
}

export default IndexPage
