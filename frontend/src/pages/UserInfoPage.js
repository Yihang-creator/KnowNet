import { useState } from "react";

const UserInfoPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="bg-gray-500 rounded-md">
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
              <span>Chendong</span>
              <span>Account ID: OWTOP500</span>
              <span>Age: 23</span>
            </div>
          </div>
        </div>

        <div className="p-2 flex justify-between text-white">
          <div className="gap-2 flex">
            <button className="border-2 rounded-md">Following: 5</button>
            <button className="border-2 rounded-md">Followers: 5</button>
          </div>

          <div>
            <button className="border-2 ml-20, rounded-md">Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-500 border-2 p-2 text-white rounded-md">
        <div className="flex justify-center p-2 gap-4 rounded-md">
          <button className="border-2 rounded-md p-2">Posts</button>
          <button className="border-2 rounded-md p-2">Liked</button>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-white p-2 rounded-md">
          <div className="p-10 border-2 bg-blue-200">01</div>
          <div className="p-10 border-2 bg-blue-200">02</div>
          <div className="p-10 border-2 bg-blue-200">03</div>
          <div className="p-10 border-2 bg-blue-200">04</div>
          <div className="p-10 border-2 bg-blue-200">05</div>
          <div className="p-10 border-2 bg-blue-200">06</div>
          <div className="p-10 border-2 bg-blue-200">07</div>
          <div className="p-10 border-2 bg-blue-200">08</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
