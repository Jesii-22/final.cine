"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#30270D] px-10 py-3 bg-gradient-to-r from-[#181407] to-[#4A3F31] shadow-lg">
       <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#FFFFFF]">
          <div className="size-4 text-yellow-400 hover:text-yellow-500 transition duration-300">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C25.78 14.22 33.78 22.22 44 24C33.78 25.78 25.78 33.78 24 44C22.22 33.78 14.22 25.78 4 24C14.22 22.22 22.22 14.22 24 4Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white hover:text-yellow-400 transition duration-300">TICKET FLICKS</h2>
        </div>
        <nav className="flex items-center gap-9 text-white">
          <Link 
            href={`/`} 
            className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          >
            Películas
          </Link>
          <Link 
            href={`/`} 
            className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          >
            Cartelera
          </Link>
          <Link 
            href={`/`} 
            className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
