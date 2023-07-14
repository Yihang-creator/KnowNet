import { useState, useEffect } from "react";
import PopupButton from "./PopupButton";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Dropdown from "../components/mainPage/Dropdown";
import { useOktaAuth } from "@okta/okta-react";

const UserInfoPage = ({ name, email }) => {
  const [selectedImage, setSelectedImage] = useState("/images/user.jpeg");
  const [posts, setPosts] = useState(null);
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    fetch(`/api/posts`, {
      headers: {
        Authorization: "Bearer " + oktaAuth.getAccessToken(),
      },
    })
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
    <div className="flex flex-col gap-4 p-2">
      <div className="relative rounded-md bg-blue-500">
        <Dropdown />
        <div className="flex gap-2 p-2">
          <div className="relative mt-5 h-36 w-36 justify-center rounded-full bg-white">
            <div className="absolute bottom-0 right-4 z-10">
              <label
                htmlFor="profileUpload"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 font-bold text-black shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

            <div className="absolute inset-0 overflow-hidden rounded-full">
              {selectedImage && (
                <img
                  className="h-full w-full"
                  src={selectedImage}
                  alt="profile"
                />
              )}
            </div>
          </div>

          <div className="rounded-md p-2  text-white">
            <div className="flex flex-col rounded-md border-2 p-2">
              <span>{name}</span>
              <span>@{email}</span>
              <span>Age: 23</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-2 text-white">
          <div className="flex gap-2">
            <PopupButton type="followings" token={oktaAuth.getAccessToken()} />
            <PopupButton type="followers" token={oktaAuth.getAccessToken()} />
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-md border-2 bg-gray-400 p-2 text-white">
        <div className="flex justify-center gap-4 rounded-md p-2">
          <button className="rounded-md border-2 p-2">Posts</button>
          <button className="rounded-md border-2 p-2">Liked</button>
        </div>

        <div className="rounded-md bg-white p-2 md:columns-2 lg:columns-4">
          {posts.map((post, index) => (
            <div key={index} className="inline-block w-full p-2">
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
