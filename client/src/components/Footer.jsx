import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center p-2 sm:p-4">
      <p>&copy; {new Date().getFullYear()} - Kandoo, Inc. All rights reserved</p>
      <a href="https://github.com/snowballDevs/kandoo/issues" target="_blank" rel="noopener noreferrer">
        <FaGithub size={20} /> 
      </a>
    </footer>
  );
};

export default Footer;
