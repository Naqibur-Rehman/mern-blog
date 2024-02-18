import { HiOutlineExclamationCircle } from "react-icons/hi";

const Modal = ({ showModal, message, deleteFunction }) => {
  return (
    <div className="overflow-y-auto bg-[rgba(0,0,0,0.7)] overflow-x-hidden fixed left-0 right-0 top-0  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative mx-auto p-4 max-w-md max-h-full">
        {/*  Modal content */}
        <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-2 rounded-t dark:border-gray-600">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => showModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-2 md:p-3">
            <div className="text-center">
              <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-200" />
              <h3 className="my-3 text-lg text-gary-600 dark:text-gray-400">
                Are you sure you want to delete {message}?
              </h3>
              <div className="my-5 flex justify-center gap-6">
                <button
                  onClick={deleteFunction}
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Yes, I&apos;m sure
                </button>
                <button
                  onClick={() => showModal(false)}
                  className=" bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
