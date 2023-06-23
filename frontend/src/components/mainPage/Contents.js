import React from "react";
import { useState, useEffect } from "react";
import PreviewCard from "../PreviewCard";
import { Link } from "react-router-dom";

const Contents = ({searchTerm}) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
      .then((response) => {
        if (!response.ok) throw new Error("API call failed");
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error", error));
  }, []);

  if (!posts) {
    return <div> Post Loading ...</div>;
  }

    const filteredPosts = searchTerm
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : posts;

  return (
    <div className="flex justify-center mt-28">
      <div className="flex-container justify-center rounded-lg border bg-grey-600 w-11/12">
        <ul className="flex flex-row flex-wrap justify-center">
          {filteredPosts.map((post, index) => (
            <li key={index}>
              <Link to={`/post/${post.id}`}>
                <PreviewCard
                  type={post.mediaType}
                  src={post.mediaUrl}
                  title={post.title}
                  previewText={post.text}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contents;
