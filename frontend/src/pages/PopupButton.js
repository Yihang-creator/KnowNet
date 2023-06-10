import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const PopupButton = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div className="p-6">
      <button
        className="p-2 border-2 text-white bg-blue-500 rounded"
        onClick={openModal}
      >
        {name}
      </button>

      {isOpen && (
        <div className="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex-col p-6 border-b border-gray-200">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={closeModal}
              >
                <CloseIcon />
              </button>

              <div className="flex flex-col gap-4 bg-white p-2 rounded-md">
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
        </div>
      )}
    </div>
  );
};

export default PopupButton;
