import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
 
const YourPage = () => {

    const { userInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios.get(`${url}/post?author=${userInfo.id}`)
            .then(response => {
                setPosts(response.data);
                setPostInfo(response.data);
            })
    }, [userInfo.id])

    if (!postInfo) {
        return <Spinner />;
    }
    if (posts.length === 0 || posts.length == 1) {
        return <div className='text-center'>No blog exists <Link to='/create'>click here to post</Link></div>;
    }

    return (
        <div>
            <h1 className='text-3xl my-16 text-center'>Your Blogs</h1>
            {posts.map(post => (
                post.author._id === userInfo.id && (
                    <div className="grid md:grid-cols-2 grid-cols-1 mx-auto max-w-[800px] xl:px-0 px-6 md:space-x-6 space-y-3 mb-5" key={post._id}>
                        <div>
                            <Link to={`/post/${post._id}`}>
                                <img src={`${url}/${post.cover}`} alt="" />
                            </Link>
                        </div>
                        <div className='space-y-5'>
                            <Link to={`/post/${post._id}`}>
                                <h2 className='uppercase text-base'>{post.title}</h2>
                            </Link>
                            <p className='space-x-2'>
                                <a className='text-slate-600'>By {post.author.username}</a>
                                <time>{formatISO9075(new Date(post.createdAt))}</time>
                            </p>
                            <p className='leading-7'>{post.summary}
                                <div className='text-blue-600 font-medium'>
                                    <Link to={`/post/${post._id}`}>read more</Link>
                                </div>
                            </p>
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default YourPage;
