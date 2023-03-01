import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { UserContext } from '../UserContext';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios.get(`${url}/post/${id}`)
            .then(response => {
                setPostInfo(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    function deletePost() {
        axios.delete(`${url}/post/${id}`, { withCredentials: true })
            .then(response => {
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (!postInfo) {
        return <Spinner />;
    }

    return (
        <div className='post-page'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>

            <div className="image">
                <img src={`${url}/${postInfo.cover}`} alt="" />
            </div>
            <h1>{postInfo.title}</h1>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

            {userInfo.id === postInfo.author._id && (
                <div className='edit-row'>
                    <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                    <Link className='edit-btn' onClick={deletePost}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Delete this post
                    </Link>
                </div>
            )}

            <button>
                <Link style={{ color: '#fff', textDecoration: 'none' }} to='/'>Back</Link>
            </button>

        </div>
    );
};

export default PostPage;
