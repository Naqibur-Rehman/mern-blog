import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "ShareMe",
      description: "Simple clone of Pinterest",
      githubLink: "https://github.com/Naqibur-Rehman/shareme_frontend",
      webLink: "https://sharemekit.netlify.app/",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mern-blog-2f917.appspot.com/o/1708702760605-shareme1.jpg?alt=media&token=6047e295-5870-41d3-9b02-dd489d0ed74c",
    },
    {
      id: 2,
      title: "Places",
      description: "Share your favourite places",
      githubLink: "https://github.com/Naqibur-Rehman/places_frontend",
      webLink: "https://places-frontend-chi.vercel.app/",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mern-blog-2f917.appspot.com/o/1708703051599-palces2.jpg?alt=media&token=f426d4b0-ec15-4f8e-917f-7f1e237e903b",
    },

    {
      id: 3,
      title: "Tenzies",
      description: "A simple and fun game to play",
      githubLink: "https://github.com/Naqibur-Rehman/tenzies-game",
      webLink: "https://tenzies4fun.netlify.app/",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mern-blog-2f917.appspot.com/o/1708703098310-tenzies1.jpg?alt=media&token=a184fd1a-2f39-4795-bd83-3250bf75e330",
    },
    {
      id: 4,
      title: "To Do(MERN)",
      description: "A CRUD based to do app",
      githubLink: "https://github.com/Naqibur-Rehman/Nodejs_ToDo_App",
      webLink: "https://nodejs-to-do-app.vercel.app/login",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mern-blog-2f917.appspot.com/o/1708713635096-todo.jpg?alt=media&token=0a936b3c-539f-4416-b56a-83e23c25761e",
    },
  ];

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center md:text-5xl">
          My Other Projects.
        </h1>
        <p className="text-center pt-5">
          Here are some of my personal projects with github link and deployed
          web app link.
        </p>
        <div className="my-8 flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
