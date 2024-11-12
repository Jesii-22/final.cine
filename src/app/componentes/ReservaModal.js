
import React, { useState } from 'react';
import axios from 'axios';

const ReservaModal = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    selectedCinema: '',
    selectedDate: '',
    selectedTime: '',
    selectedSeats: [],
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleComplete = async () => {
    try {
      await axios.post('/api/leads', formData);
      onComplete();
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <div className="modal">
      {step === 1 && (
        <div>
          <h2 className="text-yellow-500">Paso 1: Información de usuario</h2>
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} />
          <input type="email" name="email" placeholder="Correo" onChange={handleChange} />
          <button onClick={handleNext} className="button-next">Siguiente</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-yellow-500">Paso 2: Selección de cine y horario</h2>
          
          <button onClick={handlePrev} className="button-back">Volver</button>
          <button onClick={handleNext} className="button-next">Siguiente</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-yellow-500">Paso 3: Confirmación de compra</h2>
          <button onClick={handlePrev} className="button-back">Volver</button>
          <button onClick={handleComplete} className="button-confirm">Confirmar Compra</button>
        </div>
      )}
      <button onClick={onClose} className="button-close">Cerrar</button>
    </div>
  );
};

export default ReservaModal;
