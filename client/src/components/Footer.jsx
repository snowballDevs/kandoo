import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-center items-center p-2 sm:p-4">
      <p>&copy; {new Date().getFullYear()} - Kandoo</p>
    </footer>

  );
};

export default Footer;
