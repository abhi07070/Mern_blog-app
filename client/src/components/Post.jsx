import React, { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios
            .get(`${url}/profile`, { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className='grid md:grid-cols-2 grid-cols-1 mx-auto max-w-[800px] xl:px-0 px-6 md:space-x-6 space-y-3 mb-5'>
                <div>
                    <Link to={`/post/${_id}`}>
                        <img src={`${url}/${cover}`} alt='' />
                    </Link>
                </div>
                <div className='space-y-5'>
                    <Link to={`/post/${_id}`}>
                        <h2 className='uppercase text-base'>{title}</h2>
                    </Link>
                    <p className='space-x-2'>
                        <a className='text-slate-600'>By {author.username}</a>
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                    <p className='leading-7'>{summary}</p>
                    <div className='text-blue-600 font-medium'>
                        <Link to={`/post/${_id}`}>
                            read more
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
