import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '../components/Editor';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const url = process.env.REACT_APP_PORT;
    function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        axios.post(`${url}/post}`, data, { withCredentials: true })
            .then(response => {
                // console.log(response.data);
                setRedirect(true);
            })
            .catch(error => {
                console.log(error);
                alert("Error creating new post");
            });
    }

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <form onSubmit={createNewPost}>
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
            <input className='file' type="file"
                onChange={(ev) => setFiles(ev.target.files)
                }
            />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: '5px' }} type='submit'>Create post</button>
        </form>
    )
}

export default CreatePost
