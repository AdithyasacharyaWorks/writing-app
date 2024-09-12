import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-black to-gray-900 text-white py-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wider text-center border-b-2 border-gray-400 pb-2 uppercase">
          Ananya's Writings
        </h1>
      </div>
    </header>
  );
};

export default Header;
