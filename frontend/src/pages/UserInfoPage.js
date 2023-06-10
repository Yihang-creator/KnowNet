import { useState, useEffect } from "react";
import PopupButton from "./PopupButton";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

const UserInfoPage = ({ name, email }) => {
  const [selectedImage, setSelectedImage] = useState("/images/user.jpeg");
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="bg-blue-500 rounded-md">
        <div className="flex p-2 gap-2">
          <div className="mt-5 relative justify-center h-36 w-36 rounded-full bg-white">
            <div className="absolute bottom-0 right-4 z-10">
              <label
                htmlFor="profileUpload"
                className="flex items-center justify-center rounded-full w-8 h-8 items-center bg-yellow-500 text-black font-bold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                +
              </label>

              <input
                type="file"
                id="profileUpload"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <div className="absolute inset-0 rounded-full overflow-hidden">
              {selectedImage && (
                <img
                  className="h-full w-full"
                  src={selectedImage}
                  alt="profile"
                />
              )}
            </div>
          </div>

          <div className="p-2 text-white rounded-md">
            <div className="flex p-2 flex-col border-2 rounded-md">
              <span>{name}</span>
              <span>@{email}</span>
              <span>Age: 23</span>
            </div>
          </div>
        </div>

        <div className="p-2 flex justify-between text-white">
          <div className="gap-2 flex">
            <PopupButton name="Followings: 5" />
            <PopupButton name="Followers: 5" />
          </div>

          <div>
            <PopupButton name="Edit Profile" />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-400 border-2 p-2 text-white rounded-md">
        <div className="flex justify-center p-2 gap-4 rounded-md">
          <button className="border-2 rounded-md p-2">Posts</button>
          <button className="border-2 rounded-md p-2">Liked</button>
        </div>

        <div className="grid grid-cols-5 gap-2 bg-white p-2 rounded-md justify-items-center m-4">
          {posts.map((post, index) => (
            <div key={index}>
              <Link to={`/post/${post.id}`}>
                <ProfileCard
                  type={post.mediaType}
                  src={post.mediaUrl}
                  title={post.title}
                  previewText={post.text}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
