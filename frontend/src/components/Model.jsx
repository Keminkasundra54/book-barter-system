/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">Log Out</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoCloseSharp className="w-6 h-6" />
          </button>
        </div>
        <div className="py-4">
          <p className="text-gray-700">Are you sure you want to log-off?</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
