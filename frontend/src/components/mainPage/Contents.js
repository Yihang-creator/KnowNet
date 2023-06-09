import React from 'react';
import './Contents.css';
import { useState, useEffect } from 'react';
import PreviewCard from "../PreviewCard";

const Contents = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/posts`)
            .then((response) => {
                if (!response.ok) throw new Error('API call failed');
                return response.json();
            })
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error', error));
    });

    if (!posts) {
        return <div> Post Loading ...</div>
    }

    return (
        <div className="flex justify-center ">
        <div className="flex-container justify-center rounded-lg border bg-grey-600 w-11/12">
            <ul className="flex flex-row flex-wrap justify-center">
                {posts.map((post, index) => (   
                    <li key={index}>
                        <PreviewCard src={post.mediaUrl} title={post.title} previewText={post.text}/>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default Contents;