import { useState, useEffect } from 'react';


export const PostContent = ({ postId }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/posts/${postId}`)
        .then((response) => {
            if (!response.ok) throw new Error('API call failed');
            return response.json();
        })
        .then((data) => setPost(data))
        .catch((error) => console.error('Error', error));
    }, [postId]);

    if (!post) {
        return <div> Post Loading ...</div>
    }

    return (
        <div>
            {post.mediaType === 'image' ? (
                <img src={post.mediaUrl} alt={post.title} />
            ) : (
                <video controls>
                    <source src={post.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            <h1>{post.title}</h1>
            <p>{post.text}</p>
        </div>
    )





}


