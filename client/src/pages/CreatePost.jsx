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
        <div className='mx-auto max-w-[800px] xl:px-0 px-6 mt-20'>
            <form onSubmit={createNewPost}>
                <input
                    className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white'
                    type="title"
                    placeholder='Title'
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
                <input
                    className='block w-full h-12 mb-4 leading-3 text-black px-4 outline-none border border-black rounded-sm bg-white'
                    type="summary"
                    placeholder='Summary'
                    value={summary}
                    onChange={(ev) => setSummary(ev.target.value)}
                />
                <input
                className='block w-full h-12 mb-4 leading-3 text-black p-4 outline-none border border-black rounded-sm bg-white'
                 type="file"
                    onChange={(ev) => setFiles(ev.target.files)
                    }
                />
                <Editor value={content} onChange={setContent} />
                <button className='flex mb-2 px-4 py-2 bg-black justify-center text-white w-full rounded-sm' type='submit'>Create post</button>
            </form>
        </div>
    )
}

export default CreatePost
