const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl p-3 mx-auto">
        <div>
          <h1 className="my-7 text-center text-3xl font-semibold">
            About Naqeeb&apos;s Blog!
          </h1>
          <div className="flex flex-col gap-6 justify-center items-center text-md text-gray-500">
            <p className="">
              Welcorne to Naqeeb&apos;s Blog! This blog app was created by
              Naqibur Rehman as a personal project. Purpose of this project was
              to gain experience and to get familiar wit MERN stack development.
            </p>
            <p className="">
              This blog app consist various featuere and functionality. Some of
              them are:
              <ul className="px-6 py-2 mx-8 my-3 font-mono font-semibold bg-gray-100 dark:bg-slate-600 text-purple-500 list-disc  shadow-md rounded-md shadow-eal-500">
                <li>Sign Up with email and password</li>
                <li>Sign In with email and password</li>
                <li>Google Account Sign In and Sign Up</li>
                <li>
                  Users can comment and like on post comments after login.
                </li>
                <li>User can update their profile and delete their account</li>
                <li>
                  Admin Dashboard with overview dashboard, users, posts and
                  comments section.
                </li>
                <li>Admin can create, update and delete posts.</li>
                <li>Admin can delete comments and users.</li>
              </ul>
            </p>
            <p className="">
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. I believe communicatinf with other's can really help
              each other to learn, grow more and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
