/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const SeatSelectionModal = ({ isOpen, onClose }) => {
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

  const handleSeatClick = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (!seat.disponible) return;

    const seatID = seat.asiento;
    setSelectedSeats((prev) =>
      prev.includes(seatID) ? prev.filter((id) => id !== seatID) : [...prev, seatID]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">✖</button>

        <h2 className="text-2xl font-semibold mb-4">Selecciona tus Asientos</h2>

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

        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-yellow-500"></div> <span>Libres</span>
            <div className="w-4 h-4 bg-gray-400 rounded"></div> <span>Ocupados</span>
            <div className="w-4 h-4 bg-green-400 rounded"></div> <span>Seleccionado</span>
          </div>
          <button onClick={onClose} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;
