import React, { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { UserContext } from '../UserContext';
import axios from 'axios';

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: '.5',
        zIndex: 999,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'white',
        padding: '20px',
    },
};

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const { username } = userInfo || {};
    const [isModalOpen, setIsModalOpen] = useState(true);
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
            {!username ? (
                <Modal isOpen={isModalOpen} style={modalStyle}>
                    <h2 style={{ textAlign: 'center' }}>Please Log in to continue</h2>
                    <Link className='modal-btn' onClick={() => setIsModalOpen(true)} to='/login'>Log in</Link>
                    <Link className='modal-btn' onClick={() => setIsModalOpen(true)} to='/register'>Register</Link>
                </Modal>
            ) : (
                <div className='post'>
                    <div className='image'>
                        <Link to={`/post/${_id}`}>
                            <img src={`${url}/${cover}`} alt='' />
                        </Link>
                    </div>
                    <div className='texts'>
                        <Link to={`/post/${_id}`}>
                            <h2>{title}</h2>
                        </Link>
                        <p className='info'>
                            <a className='author'>By {author.username}</a>
                            <time className='time'>{formatISO9075(new Date(createdAt))}</time>
                        </p>
                        <p className='summary'>{summary}</p>
                        <div className='read-more'>
                            <Link style={{ fontWeight: '600' }} to={`/post/${_id}`}>
                                read more
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
