import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { app } from "../firebase";
import { server } from "../utils/server";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [publishError, setPublishError] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handleUploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploadProgress(null);
    try {
      if (!file) {
        setImageFileUploadError("please select an image file");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("image uploading failed");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadError(null);
            setImageFileUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${server}/api/post/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center my-7 font-semibold text-3xl">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            className="flex-1 p-2 rounded-md bg-gray-100 outline-none focus:ring-2 ring-teal-500 text-black"
            type="text"
            id="title"
            placeholder="Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            className="p-2 rounded-md bg-gray-100 text-gray-700 outline-none focus:ring-2 ring-teal-500"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">ReactJS</option>
            <option value="nextjs">NextJS</option>
            <option value="anime">Anime</option>
          </select>
        </div>
        <div className="p-4 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted">
          <input
            type="file"
            accept="image/*"
            className="block sm:w-2/3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file: file:text-sm file:font-semibold file:bg-gray-800 file:text-white text-gray-800  bg-gray-400 rounded-lg file:cursor-pointer cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="p-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={imageFileUploadProgress}
              className="p-1.5 w-full flex disabled:cursor-not-allowed justify-center items-center bg-white dark:bg-[rgb(16,23,43)] rounded-md text-sm font-semibold hover:bg-gradient-to-r from-purple-500 to-blue-600 hover:text-white text-nowrap"
            >
              {imageFileUploadProgress ? (
                <div className="w-12 h-12">
                  <CircularProgressbar
                    value={imageFileUploadProgress}
                    text={` ${imageFileUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                " Upload Image"
              )}
            </button>
          </div>
        </div>
        {imageFileUploadError && (
          <span className="p-3 rounded-md bg-red-300 text-red-900 text-sm">
            {imageFileUploadError}
          </span>
        )}
        {formData.image && (
          <div>
            <img
              src={formData.image}
              alt="post"
              className="h-72 w-full object-cover"
            />
          </div>
        )}
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          required
          modules={modules}
          formats={formats}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <button
          type="submit"
          onClick={() => {}}
          className="p-2 w-full flex justify-center items-center rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white"
        >
          Publish
        </button>
        {publishError && (
          <span className="p-3 my-2 rounded-md bg-red-300 text-red-900 text-sm">
            {publishError}
          </span>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
