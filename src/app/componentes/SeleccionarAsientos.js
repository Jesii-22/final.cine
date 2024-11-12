import React, { useState } from 'react';
import ConfirmarCompraModal from './ConfirmarCompraModal';

const SeleccionarAsientos = () => {
  //  visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  almacenar la info de la compra
  const [selectedMovie, setSelectedMovie] = useState('Película Ejemplo');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-11-12');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    
  });

  // Función p/ confirmación de los asientos
  const handleConfirm = () => {
    setIsModalOpen(true); // Abrimos el modal
  };

  //  cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        {/* asientos seleccionados y otros detalles */}
        <h3>Película: {selectedMovie}</h3>
        <p>Asientos seleccionados: {selectedSeats.join(', ')}</p>
        <p>Fecha: {selectedDate}</p>
        <p>Hora: {selectedTime}</p>
      </div>

      <button onClick={handleConfirm} className="bg-yellow-500 text-white px-4 py-2 rounded">
        Confirmar
      </button>

      {/* Modal de confirmación */}
      <ConfirmarCompraModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedMovie={selectedMovie}
        selectedSeats={selectedSeats}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        userData={userData}
      />
    </div>
  );
};

export default SeleccionarAsientos;
