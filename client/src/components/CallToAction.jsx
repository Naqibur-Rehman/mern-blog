const CallToAction = () => {
  return (
    <div className="p-3 flex flex-col-reverse justify-center items-center text-center sm:flex-row border border-teal-500 rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 flex flex-col justify-center font-mono">
        <h2 className="text-2xl">Liked what you read?</h2>
        <p className="text-gray-500 my-2">Join our newsletter for more exciting articles and updates.</p>

        <button className="px-3 py-1 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l rounded-tl-lg rounded-br-lg">
          Click to Join!
        </button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://d2908q01vomqb2.cloudfront.net/827bfc458708f0b442009c9c9836f7e4b65557fb/2020/06/03/Blog-Post_thumbnail.png"
          alt="join our newsletter"
        />
      </div>
    </div>
  );
};

export default CallToAction;
