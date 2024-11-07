"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#181407] text-white py-8 px-4 mt-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Sección de Enlaces */}
        <div>
          <h3 className="text-xl font-bold mb-4">Explora</h3>
          <ul>
            <li>
              <Link href="/" className="hover:text-yellow-500">Películas</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-yellow-500">Cartelera</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-yellow-500">Próximos Estrenos</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-yellow-500">Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div>
          <h3 className="text-xl font-bold mb-4">Síguenos</h3>
          <div className="flex gap-6">
            <Link href="https://www.facebook.com" className="text-white hover:text-yellow-500">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-facebook">
                <path d="M22 2.166C22 1.5 21.5 1 20.834 1H3.166C2.5 1 2 1.5 2 2.166v19.668C2 22.5 2.5 23 3.166 23h17.668c.666 0 1.166-.5 1.166-1.166V2.166zM20 3v18H4V3h16z"/>
                <path d="M12 6.5C9.791 6.5 8 8.291 8 10.5c0 1.306.818 2.379 1.996 2.835V17h2v-3.665c1.178-.456 1.996-1.529 1.996-2.835 0-2.209-1.791-4-4-4zm-2 4.668c0-.836.676-1.5 1.5-1.5s1.5.664 1.5 1.5c0 .836-.676 1.5-1.5 1.5s-1.5-.664-1.5-1.5z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com" className="text-white hover:text-yellow-500">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-instagram">
                <path d="M16 3h-8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zM9 0h6a3 3 0 0 1 3 3v6h-1V3a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6H6V3a3 3 0 0 1 3-3z"/>
              </svg>
            </Link>
            <Link href="https://www.twitter.com" className="text-white hover:text-yellow-500">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-twitter">
                <path d="M23.632 4.61c-.885.392-1.832.656-2.832.777a4.89 4.89 0 0 0 2.162-2.684c-.94.557-1.974.954-3.048 1.17a4.832 4.832 0 0 0-8.217 3.34c0 .378.042.746.12 1.102a13.74 13.74 0 0 1-9.973-5.04 4.828 4.828 0 0 0-.653 2.423c0 1.67.85 3.145 2.136 4.008-.787-.025-1.533-.241-2.181-.602v.061c0 2.34 1.67 4.29 3.887 4.73a4.797 4.797 0 0 1-2.177.084c.616 1.927 2.415 3.334 4.533 3.375a9.7 9.7 0 0 1-7.102 2.03c.68 2.12 2.68 3.612 4.997 3.612 5.997 0 9.263-4.87 9.263-9.071 0-.138-.005-.277-.014-.413A6.675 6.675 0 0 0 23.632 4.61z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Sección de Información */}
        <div>
          <h3 className="text-xl font-bold mb-4">Información</h3>
          <ul>
            <li>
              <Link href="/privacy" className="hover:text-yellow-500">Política de Privacidad</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-yellow-500">Términos y Condiciones</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-500">Acerca de</Link>
            </li>
          </ul>
        </div>

        {/* Sección de Contacto */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contacto</h3>
          <ul>
            <li>
              <p className="text-sm">Email: <a href="mailto:info@ticketflicks.com" className="hover:text-yellow-500">info@ticketflicks.com</a></p>
            </li>
            <li>
              <p className="text-sm">Teléfono: <a href="tel:+1234567890" className="hover:text-yellow-500">+1 234 567 890</a></p>
            </li>
            <li>
              <p className="text-sm">Dirección: Av. Ficticia 123, Ciudad, País</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-sm">
        <p>&copy; 2024 Ticket Flicks. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
