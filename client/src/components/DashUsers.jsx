import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { server } from "../utils/server";

const DashUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${server}/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setLoading(false);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.isAdmin, currentUser._id]);

  const handleShowMore = async () => {
    const starIndex = users.length;
    try {
      const res = await fetch(
        `${server}/api/user/getusers?startIndex=${starIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`${server}/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto my-4 shadow-md sm:rounded-lg md:mx-auto scrollbar scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Date Created</th>
                <th className="px-6 py-3">User Image</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white  hover:bg-gray-50 dark:hover:bg-gray-600 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex w-10 h-10">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="object-cover rounded-full bg-gray-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="text-red-500 font-semibold hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full py-5 text-sm text-teal-500 self-center"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>No users found!</p>
      )}
      {showModal && (
        <Modal
          showModal={setShowModal}
          message={"this user"}
          deleteFunction={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default DashUsers;
