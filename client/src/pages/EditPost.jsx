import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams, Link } from 'react-router-dom';
import Editor from '../components/Editor';
import Spinner from '../components/Spinner';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    // const [cover,setCover] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [postInfo, setPostInfo] = useState(null);
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios.get(`${url}/post/${id}`)
            .then(response => {
                setPostInfo(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setSummary(response.data.summary);
            })
    }, [])

    function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        
        axios.put(`${url}/post`, data, { withCredentials: true })
            .then(response => {
                setRedirect(true);
            })
    }

    if (!postInfo) {
        return <Spinner />;
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <>
            <form onSubmit={updatePost}>
                <input type="title"
                    placeholder='Title'
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
                <input type="summary"
                    placeholder='Summary'
                    value={summary}
                    onChange={(ev) => setSummary(ev.target.value)}
                />
                <input type="file"
                    onChange={(ev) => setFiles(ev.target.files)}
                />
                <Editor onChange={setContent} value={content} />
                <button style={{ marginTop: '5px', marginBottom: '5px' }} type='submit'>Update post</button>
                <button>
                    <Link style={{ color: '#fff', textDecoration: 'none' }} to={`/post/${id}`}>Back</Link>
                </button>
            </form>
        </>
    )
}

export default EditPost
