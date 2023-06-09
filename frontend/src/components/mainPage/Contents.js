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
        <div className="flex-container">
            <ul className="child-flex-container">
                {posts.map((post, index) => (
                    <li key={index}>
                        <PreviewCard src={post.mediaUrl} title={post.title} previewText={post.title} className="child-item"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Contents;