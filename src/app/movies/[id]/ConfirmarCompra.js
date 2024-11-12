import React from 'react';
import { useRouter } from 'next/router';

const ConfirmarCompra = () => {
  const router = useRouter();

  const handleFinish = () => {
    try {
     
      router.push('/');
    } catch (error) {
      console.error("Error al redirigir:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Compra Confirmada!</h2>
        
        <p className="text-lg text-gray-700">
          Tu compra ha sido exitosa. ¡Disfruta de tu película!
        </p>
        
        <button
          onClick={handleFinish}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors mt-6"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default ConfirmarCompra;
