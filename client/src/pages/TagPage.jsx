import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const TagPage = () => {
    const [tags, setTags] = useState([]);
    const { category } = useParams();
    const url = process.env.REACT_APP_PORT;
    useEffect(() => {
        axios.get(`${url}/post?category=${category}`)
            .then(response => {
                setTags(response.data);
            })
    }, [category])

    // Create an object to count the number of times each title appears
    const titleCounts = {};
    tags.forEach(tag => {
        if (titleCounts[tag.title]) {
            titleCounts[tag.title]++;
        } else {
            titleCounts[tag.title] = 1;
        }
    });

    if (tags.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <div className='text-3xl my-16 text-center'>
                <h1>Tags</h1>
            </div>
            {Object.keys(titleCounts).map((title, index) => {
                // Filter tags that match the current title
                const filteredTags = tags.filter(tag => tag.title === title);

                return (
                    <div key={index} className='mx-auto max-w-[800px] xl:px-0 px-6 md:space-x-6 space-y-3 mb-5'>
                        <Link to={`/${category}/${title}`}>
                            <div className="flex justify-between items-center border-b-2 border-black py-3">
                                <div className="title-tag-left">
                                    <h2>{title}</h2>
                                    <span>{filteredTags.length} posts</span>
                                </div>
                                <div className="w-[100px]">
                                    <img className='border' src={`${url}/${filteredTags[0].cover}`} alt="" />
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
            {/* </div> */}
        </>
    )
}

export default TagPage;
