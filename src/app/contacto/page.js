export default function ContactPage() {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#181407] to-[#4A3F31] text-white">
        {/* Header en la parte superior */}
        <Header />
  
        {/* Contenido de la página centrado */}
        <div className="flex flex-col lg:flex-row items-center justify-between flex-grow p-6">
          {/* Sección Showcase Haedo */}
          <div className="lg:w-1/3 p-4">
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
          </div>
  
          {/* Mapa interactivo */}
          <div className="lg:w-1/3 p-4 mb-4 lg:mb-0">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">Ubicaciones</h2>
            <div className="w-full h-64">
              {/* Mapa con múltiples ubicaciones */}
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
          <div className="lg:w-1/3 p-4">
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
          </div>
        </div>
  
        {/* Footer en la parte inferior */}
        <Footer />
      </div>
    );
  }
  