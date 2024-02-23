/* eslint-disable react/prop-types */
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative w-full h-[350px] overflow-hidden border border-teal-500 hover:border-2 rounded-lg sm:w-[240px] transition-all">
      <div className="">
        <img
          src={project.image}
          alt="post cover"
          className="w-full h-[270px] object-cover group-hover:h-[220px] transition-all duration-300 z-20"
        />
      </div>

      <div className="p-2 flex flex-col gap-2">
        <p className="text-2xl font-semibold text-center">{project.title}</p>
        <span className="text-sm italic text-center">{project.description}</span>
        <div className="flex">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer noopener"
            className="group-hover:bottom-0 absolute bottom-[-200px] left-0 z-10 border border-teal-500 text-teal-500 hover:text-white text-center hover:bg-teal-500 rounded-md !rounded-tl-none flex items-center px-4 py-1 m-3"
          >
            <FaGithub size={24} className="me-2" />
            GitHub
          </a>
          <a
            href={project.webLink}
            target="_blank"
            rel="noreferrer noopener"
            className="group-hover:bottom-0 absolute bottom-[-200px] right-0 z-10 border border-teal-500 text-teal-500 hover:text-white text-center hover:bg-teal-500 rounded-md !rounded-tl-none flex items-center px-4 py-1 m-3 "
          >
            <CgWebsite size={24} className="me-2" />
            Live
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
