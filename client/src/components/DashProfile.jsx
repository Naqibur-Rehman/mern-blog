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
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);

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
    setUserUpdateError(null);
    setUserUpdateSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUserUpdateError("No changes made");
      return;
    }

    if (isImageUploading) {
      setUserUpdateError("Image is uploading please wait");
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
        setUserUpdateError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserUpdateError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            disabled={loading || isImageUploading}
          >
            {loading || isImageUploading ? "Loading..." : "Update"}
          </button>
        </div>
        {currentUser.isAdmin && (
          <div className="p-0.5 bg-gradient-to-r hover:bg-gradient-to-l from-purple-600 to-pink-600 rounded-lg">
            <Link to="/create-post">
              <button
                type="button"
                onClick={() => console.log(" ")}
                className="p-1.5 w-full flex justify-center items-center rounded-md font-semibold text-white"
              >
                Create a Post
              </button>
            </Link>
          </div>
        )}
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <button onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </button>
        <button onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </button>
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

      {error && (
        <div className="p-3 mt-5 rounded-lg text-sm bg-red-200 text-red-700">
          {error}
        </div>
      )}

      {showModal && (
        <Modal
          showModal={setShowModal}
          message={"your acccount"}
          deleteFunction={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default DashProfile;
