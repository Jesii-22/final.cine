/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

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

  const [seats, setSeats] = useState(simulatedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSeatClick = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (!seat.disponible) return;

    const seatID = seat.asiento;
    setSelectedSeats((prev) =>
      prev.includes(seatID) ? prev.filter((id) => id !== seatID) : [...prev, seatID]
    );
  };

  const handleCinemaChange = (event) => setSelectedCinema(event.target.value);
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  const handleConfirm = () => {
    alert(`Confirmado: \nCine: ${selectedCinema} \nFecha: ${selectedDate} \nHora: ${selectedTime} \nAsientos: ${selectedSeats.join(', ')}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">✖</button>

        <h2 className="text-2xl font-semibold mb-4 text-black">Selecciona tus Asientos</h2>

        {/* Selección de cine */}
        <div className="mb-4">
          <label htmlFor="cinema" className="block text-sm font-medium text-black">Selecciona el Cine</label>
          <select
            id="cinema"
            value={selectedCinema}
            onChange={handleCinemaChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Elige un cine</option>
            <option value="Showcase Haedo">Showcase Haedo</option>
            <option value="Showcase Norcenter">Showcase Norcenter</option>
          </select>
        </div>

        {/* Selección de fecha */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-black">Selecciona la Fecha</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Selección de hora */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-black">Selecciona el Horario</label>
          <select
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Elige un horario</option>
            <option value="13:45">13:45</option>
            <option value="15:20">15:20</option>
            <option value="17:00">17:00</option>
            <option value="20:25">20:25</option>
            <option value="22:45">22:45</option>
          </select>
        </div>

        {/* Selección de asientos */}
        <div className="flex flex-col items-center space-y-2 mt-4">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
              {row.map((seat, colIndex) => (
                <button
                  key={seat.asiento}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                  className={`p-2 rounded ${
                    !seat.disponible
                      ? "bg-gray-400 cursor-not-allowed"
                      : selectedSeats.includes(seat.asiento)
                      ? "bg-green-400"
                      : "bg-yellow-500"
                  } text-white font-bold`}
                  disabled={!seat.disponible}
                >
                  {seat.asiento}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Leyenda de asientos */}
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-yellow-500 text-gray-900"></div> <span>Libres</span>
            <div className="w-4 h-4 bg-gray-400 text-gray-900 rounded"></div> <span>Ocupados</span>
            <div className="w-4 h-4 bg-green-400 text-gray-900 rounded"></div> <span>Seleccionado</span>
          </div>
          <button
            onClick={handleConfirm}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            disabled={!selectedCinema || !selectedDate || !selectedTime || selectedSeats.length === 0}
          >
            Confirmar
          </button>
        </div>

        {/* Información adicional sobre la película seleccionada */}
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-lg">{selectedMovie}</h3>
          <p>{selectedDate} - {selectedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;
