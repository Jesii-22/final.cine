
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ModalReserva = ({ onClose }) => {
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

  const router = useRouter();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/leads', formData);
      router.push('/admin'); // Redirigir a la página de administración
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };

  return (
    <div className="modal">
      {step === 1 && (
        <div>
          <h2>Información Personal</h2>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
          />
          <button onClick={handleNext}>Siguiente</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Seleccionar Cine y Horario</h2>
          <select
            name="selectedCinema"
            value={formData.selectedCinema}
            onChange={handleChange}
          >
            <option value="">Seleccionar Cine</option>
            <option value="Showcase Haedo">Showcase Haedo</option>
            <option value="Showcase Norcenter">Showcase Norcenter</option>
          </select>
          <input
            type="date"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={handleChange}
          />
          <input
            type="time"
            name="selectedTime"
            value={formData.selectedTime}
            onChange={handleChange}
          />
          <button onClick={handlePrev}>Volver</button>
          <button onClick={handleNext}>Siguiente</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Seleccionar Asientos</h2>
          {/* Aquí puedes implementar la lógica para seleccionar asientos */}
          <button onClick={handlePrev}>Volver</button>
          <button onClick={handleSubmit}>Confirmar Reserva</button>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ModalReserva;
