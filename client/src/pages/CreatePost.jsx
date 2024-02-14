import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center my-7 font-semibold text-3xl">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            className="flex-1 p-2 rounded-md bg-gray-100 outline-none focus:ring-2 ring-teal-500"
            type="text"
            id="title"
            placeholder="Title"
            required
          />
          <select className="p-2 rounded-md bg-gray-100 text-gray-700 outline-none focus:ring-2 ring-teal-500">
            <option value="uncategorised">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">ReactJS</option>
            <option value="nextjs">NextJS</option>
          </select>
        </div>
        <div className="p-4 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted">
          <input type="file" accept="image/*" />
          <div className="p-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <button
              type="button"
              onClick={() => {}}
              className="p-1.5 w-full flex justify-center items-center bg-white dark:bg-[rgb(16,23,43)] rounded-md text-sm font-semibold hover:bg-gradient-to-r from-purple-500 to-blue-600 hover:text-white"
            >
              Upload Image
            </button>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          required
        />
        <button
          type="submit"
          onClick={() => {}}
          className="p-2 w-full flex justify-center items-center rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
