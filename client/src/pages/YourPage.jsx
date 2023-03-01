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
        return <div style={{ textAlign: 'center' }}>No blog exists <Link to='/create'>click here to post</Link></div>;
    }

    return (
        <div>
            <h1 className='tag-title' style={{ paddingBottom: '15px' }}>Your Blogs</h1>
            {posts.map(post => (
                post.author._id === userInfo.id && (
                    <div className="post" key={post._id}>
                        <div className="image">
                            <Link to={`/post/${post._id}`}>
                                <img src={`${url}/${post.cover}`} alt="" />
                            </Link>
                        </div>
                        <div className="texts">
                            <Link to={`/post/${post._id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                            <p className='info'>
                                <a className='author'>By {post.author.username}</a>
                                <time>{formatISO9075(new Date(post.createdAt))}</time>
                            </p>
                            <p className='summary'>{post.summary}
                                <div className="read-more">
                                    <Link style={{ color: '#222', fontWeight: '600' }} to={`/post/${post._id}`}>read more</Link>
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
