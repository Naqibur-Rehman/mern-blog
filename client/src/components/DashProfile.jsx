import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState(false)

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handeImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setIsImageUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (file must be less tahn 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setIsImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setIsImageUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserUpdateError(null)
    setUserUpdateSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUserUpdateError("No changes made")
      return;
    }

    if (isImageUploading) {
      setUserUpdateError("Image is uploading please wait")   
      return;
    }

    try {
      dispatch(updateStart);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUserUpdateError(data.message)
      } else {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserUpdateError(error.message)
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handeImageFile}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress ? (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress} %`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          ) : (
            <div className="absolute"></div>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt={currentUser.name}
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className="p-2 rounded-lg text-sm bg-red-200 text-red-700">
            <p>* {imageFileUploadError}</p>
          </div>
        )}
        <div>
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            id="username"
            type="text"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="p-2 mt-1 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={currentUser.email}
            placeholder="name@email.com"
            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 mt-1 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div className="p-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-black hover:text-white"
            disabled={useSelector((state) => state.loading)}
          >
            {/* {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  className=" mx-auto h-6 self-center text-white animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              "Update"
            )} */}
            Update
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {userUpdateSuccess && (
        <div className="p-3 mt-5 rounded-lg text-sm bg-green-200 text-green-600">
          {userUpdateSuccess}
        </div>
      )}
      {userUpdateError && (
        <div className="p-3 mt-5 rounded-lg text-sm bg-red-200 text-red-700">
          {userUpdateError}
        </div>
      )}
    </div>
  );
};

export default DashProfile;
