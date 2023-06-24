import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccountCard from "../components/AccountCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateFollowings } from "../redux/actions/userActions";
const PopupButton = ({ name }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (!isOpen) {
      dispatch(updateFollowings());
    }
  }, [isOpen, dispatch]);

  const currState = useSelector((state) => state.userReducer);

  const followers = currState.followers;
  const followings = currState.followings;

  const users = name === "Followings" ? followings : followers;

  return (
    <div className="p-6">
      <button
        className="flex flex-col items-center p-2 text-white"
        onClick={openModal}
      >
        <span>{users.length}</span>
        <span>{name}</span>
      </button>

      {isOpen && (
        <div className="fixed left-0 right-0 top-0 z-40 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="h-1/2 w-1/2 rounded-lg bg-white">
            <button
              className="m-2 rounded-lg border-2 bg-red-500 p-2 text-gray-400 hover:text-gray-500"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-md bg-white p-2">
              {users.map((user) => {
                return (
                  <div className="border-2 bg-blue-200 p-10">
                    <AccountCard
                      name={user.name}
                      description={user.description}
                      userId={user.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
