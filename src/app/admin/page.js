'use client';
import { useEffect, useState, useRef } from 'react';
import { FaQrcode } from 'react-icons/fa';
import { toPng } from 'html-to-image';
// import { QRCodeCanvas as QRCode } from 'qrcode.react';
import QRCode from 'react-qr-code';

import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

export default function TicketsAdmin() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null); 
  const qrRef = useRef(null);

  useEffect(() => {
    // Fetch de los tickets desde el endpoint
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/leads');
        const result = await response.json();
        if (result.success) {
          setLeads(result.leads);
        } else {
          console.error('Error al obtener los tickets:', result.error);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    fetchTickets();
  }, []);

  const handleDownloadQR = async () => {
    try {
      const canvas = await toPng(qrRef.current);
      const link = document.createElement('a');
      link.href = canvas;
      link.download = `ticket_${selectedLead.nombre}_${selectedLead.apellido}.png`;
      link.click();
    } catch (error) {
      console.error('Error al generar el QR:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#181407] to-[#4A3F31] text-white">
      <Header />
      <main className="flex flex-col flex-grow items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Administrador de Tickets
        </h1>
        <div className="w-full max-w-5xl overflow-x-auto">
          <table className="w-full border-collapse bg-opacity-50 bg-black rounded-lg shadow-md text-center">
            <thead className="bg-[#30270D] text-yellow-400">
              <tr>
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Apellido</th>
                <th className="py-3 px-4">Mail</th>
                <th className="py-3 px-4">Cine</th>
                {/* <th className="py-3 px-4">Película</th> */}
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Horario</th>
                <th className="py-3 px-4">QR Tickets</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-[#1E1A11] transition">
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.nombre}</td>
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.apellido}</td>
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.correo}</td>
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.cine}</td>
                  {/* <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.pelicula}</td> */}
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{new Date(lead.fecha).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">{lead.hora}</td>
                  <td className="py-3 px-4 border-b border-[#ffffff1a]">
                    <button
                      className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium shadow-md hover:bg-yellow-400 transition transform hover:scale-105"
                      onClick={() => setSelectedLead(lead)}
                    >
                      Ver QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />

      {/* Popup Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-black font-bold"
              onClick={() => setSelectedLead(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Información del Ticket</h2>
            <p><strong>Nombre:</strong> {selectedLead.nombre} {selectedLead.apellido}</p>
            <p><strong>Cine:</strong> {selectedLead.cine}</p>
            {/* <p><strong>Película:</strong> {selectedLead.pelicula}</p> */}
            <p><strong>Fecha:</strong> {new Date(selectedLead.fecha).toLocaleDateString()}</p>
            <p><strong>Horario:</strong> {selectedLead.hora}</p>
            <div className="flex justify-center my-4">
              <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-md">
              <QRCode
                value={`Ticket para ${selectedLead.nombre || 'N/A'} ${selectedLead.apellido || 'N/A'}\nCine: ${selectedLead.cine || 'N/A'}\nFecha: ${
                  selectedLead.fecha ? new Date(selectedLead.fecha).toLocaleDateString() : 'N/A'
                }\nHora: ${selectedLead.hora || 'N/A'}`}
              />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium shadow-md hover:bg-yellow-400 transition"
                onClick={handleDownloadQR}
              >
                Descargar QR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
