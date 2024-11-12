/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import axios from 'axios';


const SeatSelectionModal = ({ isOpen, onClose, selectedMovie }) => {
  const simulatedSeats = [
    [
      { asiento: "A1", disponible: true },
      { asiento: "A2", disponible: false },
      { asiento: "A3", disponible: true },
      { asiento: "A4", disponible: true },
      { asiento: "A5", disponible: false },
      { asiento: "A6", disponible: true },
      { asiento: "A7", disponible: true },
      { asiento: "A8", disponible: false },
      { asiento: "A9", disponible: true },
      { asiento: "A10", disponible: true },
    ],
    [
      { asiento: "B1", disponible: true },
      { asiento: "B2", disponible: true },
      { asiento: "B3", disponible: false },
      { asiento: "B4", disponible: true },
      { asiento: "B5", disponible: true },
      { asiento: "B6", disponible: true },
      { asiento: "B7", disponible: false },
      { asiento: "B8", disponible: true },
      { asiento: "B9", disponible: false },
      { asiento: "B10", disponible: true },
    ],
    [
      { asiento: "C1", disponible: true },
      { asiento: "C2", disponible: false },
      { asiento: "C3", disponible: true },
      { asiento: "C4", disponible: true },
      { asiento: "C5", disponible: true },
      { asiento: "C6", disponible: false },
      { asiento: "C7", disponible: true },
      { asiento: "C8", disponible: true },
      { asiento: "C9", disponible: true },
      { asiento: "C10", disponible: true },
    ],
    [
      { asiento: "D1", disponible: true },
      { asiento: "D2", disponible: true },
      { asiento: "D3", disponible: true },
      { asiento: "D4", disponible: false },
      { asiento: "D5", disponible: true },
      { asiento: "D6", disponible: true },
      { asiento: "D7", disponible: true },
      { asiento: "D8", disponible: false },
      { asiento: "D9", disponible: true },
      { asiento: "D10", disponible: true },
    ],
  ];

 
  const [currentStep, setCurrentStep] = useState(1);
  const [seats, setSeats] = useState(simulatedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  const handleSeatClick = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (!seat.disponible) return;

    const seatID = seat.asiento;
    setSelectedSeats((prev) =>
      prev.includes(seatID) ? prev.filter((id) => id !== seatID) : [...prev, seatID]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCinemaChange = (event) => setSelectedCinema(event.target.value);
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  const handleConfirmPurchase = async () => {
    const reservationData = {
      movie: selectedMovie,
      user: userInfo,
      cinema: selectedCinema,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
    };

    try {
      await axios.post('/api/leads', reservationData);
      alert('Compra confirmada y datos guardados en MongoDB');
      onClose();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un error al confirmar la compra.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">✖</button>

        {/* Paso 1: Información del usuario */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Paso 1: Datos del Usuario</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={userInfo.nombre}
              onChange={handleUserInfoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={userInfo.apellido}
              onChange={handleUserInfoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            <button
              onClick={handleNextStep}
              disabled={!userInfo.nombre || !userInfo.apellido || !userInfo.email}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600 transition duration-200"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Paso 2: Selección de cine, fecha, hora y asientos */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Paso 2: Selección de Cine y Asientos</h2>
            <select onChange={handleCinemaChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black">
              <option value="">Selecciona un Cine</option>
              <option value="Showcase Haedo">Showcase Haedo</option>
              <option value="Showcase Norcenter">Showcase Norcenter</option>
            </select>
            <input type="date" onChange={handleDateChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
            <select onChange={handleTimeChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black">
              <option value="">Selecciona un Horario</option>
              <option value="13:45">13:45</option>
              <option value="15:25">15:25</option>
              <option value="16:20">16:20</option>
              <option value="17:15">17:15</option>
              <option value="20:25">20:25</option>
              <option value="22:00">22:00</option>
              <option value="23:45">23:45</option>
            </select>
            
            {/* Referencias de colores para los asientos */}
            <div className="mt-4 flex justify-between text-black">
              <span className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div> Seleccionado
              </span>
              <span className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div> Disponible
              </span>
              <span className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div> Ocupado
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {/* Asientos con mayor separación */}
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                  {row.map((seat, colIndex) => (
                    <button
                      key={seat.asiento}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      className={`p-2 rounded ${
                        !seat.disponible ? "bg-gray-400 cursor-not-allowed" :
                        selectedSeats.includes(seat.asiento) ? "bg-green-400" : "bg-yellow-500"
                      } text-white font-bold`}
                      disabled={!seat.disponible}
                    >
                      {seat.asiento}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded">Atrás</button>
              <button
                onClick={handleNextStep}
                disabled={!selectedCinema || !selectedDate || !selectedTime || selectedSeats.length === 0}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Confirmación de Compra */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Paso 3: Confirmación de Compra</h2>
            <p className="text-black"><strong>Nombre:</strong> {userInfo.nombre} {userInfo.apellido}</p>
            <p className="text-black"><strong>Email:</strong> {userInfo.email}</p>
            <p className="text-black"><strong>Cine:</strong> {selectedCinema}</p>
            <p className="text-black"><strong>Fecha:</strong> {selectedDate}</p>
            <p className="text-black"><strong>Hora:</strong> {selectedTime}</p>
            <p className="text-black"><strong>Asientos:</strong> {selectedSeats.join(', ')}</p>
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded">Atrás</button>
              <button onClick={handleConfirmPurchase} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">Confirmar Compra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionModal;