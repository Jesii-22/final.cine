"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#181407] text-white py-8 px-4 mt-12">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left pl-[300px]">
        {/* Sección de Enlaces */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-500 relative inline-block transition-all duration-300 hover:text-yellow-400 hover:underline">
            Explora
          </h3>
          <ul>
            <li>
              <Link href="/" className="hover:text-yellow-500 transition-all duration-300">
                Cartelera
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-yellow-500 transition-all duration-300">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-500 relative inline-block transition-all duration-300 hover:text-yellow-400 hover:underline">
            Síguenos
          </h3>
          <div className="flex justify-center md:justify-start gap-6 mt-2">
            <Link href="https://www.facebook.com" className="text-white hover:text-yellow-500 transition-all duration-300">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://www.instagram.com" className="text-white hover:text-yellow-500 transition-all duration-300">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://www.twitter.com" className="text-white hover:text-yellow-500 transition-all duration-300">
              <FaTwitter size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-sm">
        <p>&copy; 2024 Ticket Flicks. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
