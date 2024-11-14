import Link from 'next/link';
import { FaTicketAlt } from 'react-icons/fa';

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

          <Link href="/">
            <h2 className="text-lg font-bold text-white hover:text-yellow-400 transition duration-300 cursor-pointer">TICKET FLICKS</h2>
          </Link>
          <div className="size-4 text-yellow-400 hover:text-yellow-500 transition duration-300">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C25.78 14.22 33.78 22.22 44 24C33.78 25.78 25.78 33.78 24 44C22.22 33.78 14.22 25.78 4 24C14.22 22.22 22.22 14.22 24 4Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <nav className="flex items-center gap-9 text-white">
          <Link 
            href="/#cartelera" 
            className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          >
            Cartelera
          </Link>
         
          <Link 
            href="/contacto" 
            className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          >
            Contacto
          </Link>
        </nav>
      </div>

      {/* Icono de Ticket en la esquina superior derecha */}
      <Link 
        href="/admin" 
        className="text-yellow-400 hover:text-yellow-500 transition duration-300 transform hover:scale-125"
      >
        <FaTicketAlt size={28} />
      </Link>
    </header>
  );
}
