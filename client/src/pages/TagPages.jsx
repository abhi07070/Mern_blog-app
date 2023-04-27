import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TagPages = () => {
    const [posts, setPosts] = useState([]);
    const { category, postId } = useParams();
    const url = process.env.REACT_APP_PORT;

    useEffect(() => {
        axios.get(`${url}/post?category=${category}`)
            .then(response => {
                const filteredPosts = response.data.filter(post => post.title === postId);
                setPosts(filteredPosts);
            })
            .catch(error => {
                console.error(error);
                setPosts([]);
            })
    }, [category, postId])

    return (
        <>
            <div className='text-3xl my-16 text-center'>
                <h1>{postId}</h1>
            </div>
            {posts.map(post => (
                <div className='mx-auto max-w-[800px] xl:px-0 px-6' key={post._id}>
                    <div className="image">
                        <img src={`${url}/${post.cover}`} alt="" />
                    </div>
                    <div className='post-right'>
                        <h2>{post.title}</h2>
                        <p>{post.summary}</p>
                        <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                    {/* <p>Category: {post.category}</p> */}
                </div>
            ))}
        </>
    )
}

export default TagPages;
