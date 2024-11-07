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

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Simula cargar la disponibilidad de asientos cuando se selecciona fecha y hora
  useEffect(() => {
    if (date && time) {
      setSeats(simulatedSeats);
    } else {
      setSeats([]); // Oculta los asientos si no se ha seleccionado fecha y hora
    }
  }, [date, time]);

  const handleSeatClick = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (!seat.disponible) return;

    const seatID = seat.asiento;
    setSelectedSeats((prev) =>
      prev.includes(seatID) ? prev.filter((id) => id !== seatID) : [...prev, seatID]
    );
  };

  const handleConfirm = () => {
    if (!date || !time) {
      alert("Selecciona una fecha y un horario");
      return;
    }
   
    alert(`Compra confirmada:\nFecha: ${date}\nHora: ${time}\nAsientos: ${selectedSeats.join(", ")}`)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Selecciona tus asientos</h2>
        
        <div className="flex space-x-4">
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="border p-2 rounded w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Mostrar asientos solo si se ha seleccionado fecha y hora */}
        {date && time && (
          <div className="grid grid-cols-10 gap-2 mt-4">
            {seats.map((row, rowIndex) =>
              row.map((seat, colIndex) => (
                <button
                  key={seat.asiento}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                  className={`p-2 rounded ${
                    !seat.disponible
                      ? "bg-gray-400"
                      : selectedSeats.includes(seat.asiento)
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } text-white font-bold`}
                  disabled={!seat.disponible}
                >
                  {seat.asiento}
                </button>
              ))
            )}
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-700"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionModal;