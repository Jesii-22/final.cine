"user client"
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#181407] to-[#4A3F31] text-white">
      {/* Header en la parte superior */}
      <Header />

      {/* Contenido de la página centrado */}
      <div className="flex flex-col items-center justify-center flex-grow p-6 space-y-6">
        {/* Información de los cines */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Sección Showcase Haedo */}
          <div className="lg:w-1/3 p-4 text-center">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">Showcase Haedo</h2>
            <p className="text-lg mb-2">
              <strong>Dirección:</strong> Av. Rivadavia 1234, Haedo
            </p>
            <p className="text-lg mb-2">
              <strong>Teléfono:</strong> (11) 1234-5678
            </p>
            <p className="text-lg mb-2">
              <strong>Horarios de atención:</strong> Lunes a Domingo 10:00 - 22:00
            </p>
            <a
              href="https://entradas.todoshowcase.com/showcase/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
              Más Info
            </a>
          </div>

          {/* Mapa interactivo */}
          <div className="lg:w-1/3 p-4 text-center">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Ubicaciones</h2>
            <div className="w-full" style={{ height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1JgGMCmK7YQ_lN9gcjkeI00mhyzrReFo&ehbc=2E312F"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Sección Showcase Norcenter */}
          <div className="lg:w-1/3 p-4 text-center">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">Showcase Norcenter</h2>
            <p className="text-lg mb-2">
              <strong>Dirección:</strong> Av. Santa Fe 5678, San Fernando
            </p>
            <p className="text-lg mb-2">
              <strong>Teléfono:</strong> (11) 9876-5432
            </p>
            <p className="text-lg mb-2">
              <strong>Horarios de atención:</strong> Lunes a Domingo 11:00 - 23:00
            </p>
            <a
              href="https://entradas.todoshowcase.com/showcase/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
              Más Info
            </a>
          </div>
        </div>
      </div>

      {/* Footer en la parte inferior */}
      <Footer />
    </div>
  );
}
