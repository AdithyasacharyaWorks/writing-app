// src/components/custom/Header.tsx
import React from 'react';


const Header: React.FC = () => {

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        {/* <nav className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/logout">
                <span className="hover:underline">Logout</span>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <span className="hover:underline">Login</span>
            </Link>
          )}
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
