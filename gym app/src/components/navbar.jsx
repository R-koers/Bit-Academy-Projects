import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-gray-800">Gymstagram</a>
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul className="md:flex gap-6 hidden"> 
          <li><a href="#plan" className="text-gray-600 hover:text-gray-900">Planning</a></li>
          <li><a href="#tracking" className="text-gray-600 hover:text-gray-900">Tracking</a></li>
          <li><a href="#community" className="text-gray-600 hover:text-gray-900">Community</a></li>
        </ul>
      </div>
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-md mt-2 p-4">
          <li><a href="#plan" className="block py-2 text-gray-600 hover:text-gray-900">Planning</a></li>
          <li><a href="#tracking" className="block py-2 text-gray-600 hover:text-gray-900">Tracking</a></li>
          <li><a href="#community" className="block py-2 text-gray-600 hover:text-gray-900">Community</a></li>
        </ul>
      )}
    </nav>
  );
}