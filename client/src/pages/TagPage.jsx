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
        return <Spinner/>;
    }

    return (
        <>
            <h1 className='tag-title'>Tags</h1>
            {Object.keys(titleCounts).map((title, index) => {
                // Filter tags that match the current title
                const filteredTags = tags.filter(tag => tag.title === title);

                return (
                    <Link style={{ textDecoration: 'none' }} key={index} to={`/${category}/${title}`}>
                        <div className="title-tags">
                            <div className="title-tag-left">
                                <h2>{title}</h2>
                                <span>{filteredTags.length} posts</span>
                            </div>
                            <div className="title-tag-right">
                                <img src={`${url}/${filteredTags[0].cover}`} alt="" />
                            </div>
                        </div>
                    </Link>
                );
            })}
            {/* </div> */}
        </>
    )
}

export default TagPage;
