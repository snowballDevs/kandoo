import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 p-2.5 sm:p-2 z-1000">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} - Kandoo, Inc. All rights reserved</p>
        <a href="https://github.com/snowballDevs/kandoo/issues" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} /> 
        </a>
      </div>
    </footer>
  );
};

export default Footer;



