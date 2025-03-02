import React from 'react';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">My Sidebar</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="px-6 py-2 hover:bg-gray-700">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="px-6 py-2 hover:bg-gray-700">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className="px-6 py-2 hover:bg-gray-700">
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>
          <li className="px-6 py-2 hover:bg-gray-700">
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;