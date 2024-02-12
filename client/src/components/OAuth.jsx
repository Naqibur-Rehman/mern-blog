import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="p-1.5 w-full flex justify-center items-center bg-white dark:bg-[rgb(16,23,43)] rounded-md text-sm font-semibold hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white"
      >
        <AiFillGoogleCircle size={24} /> &nbsp; Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
