'use client';
import { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';

// Importa tus componentes Header y Footer
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

export default function TicketsAdmin() {
  const [leads, setLeads] = useState([]);
  const qrRef = useRef(null); // Referencia para el QR

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

  const handleDownloadQR = async (lead) => {
    // Generar QR y descargar como imagen
    try {
      const canvas = await toPng(qrRef.current);
      const link = document.createElement('a');
      link.href = canvas;
      link.download = `ticket_${lead.nombre}_${lead.apellido}.png`;
      link.click();
    } catch (error) {
      console.error('Error al generar el QR:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#181407] to-[#4A3F31] text-white">
    {/* Header en la parte superior */}
     <Header />
    <div style={styles.adminContainer}>
     
      <main style={styles.mainContent}>
        <h1 style={styles.title}>Administrador de Tickets</h1>
        <table style={styles.ticketsTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nombre</th>
              <th style={styles.tableHeader}>Apellido</th>
              <th style={styles.tableHeader}>Mail</th>
              <th style={styles.tableHeader}>Cine</th>
              <th style={styles.tableHeader}>Fecha</th>
              <th style={styles.tableHeader}>Horario</th>
              <th style={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{lead.nombre}</td>
                <td style={styles.tableCell}>{lead.apellido}</td>
                <td style={styles.tableCell}>{lead.correo}</td>
                <td style={styles.tableCell}>{lead.cine}</td>
                <td style={styles.tableCell}>{new Date(lead.fecha).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{lead.hora}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.downloadQRButton}
                    onClick={() => handleDownloadQR(lead)}
                    >
                    Descargar QR
                  </button>
                  {/* QR Code Canvas (oculto) */}
                  <div style={{ display: 'none' }}>
                    <QRCodeCanvas
                      ref={qrRef}
                      value={`Ticket para ${lead.nombre} ${lead.apellido}\nCine: ${lead.cine}\nFecha: ${new Date(lead.fecha).toLocaleDateString()}\nHora: ${lead.hora}`}
                      size={256}
                      />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
            </div>
      <Footer />
    </div>
  );
}

const styles = {
  adminContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    textAlign: 'center',  // Centrar el contenido
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#FFD700',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
  },
  ticketsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris oscuro con opacidad
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '0 auto', // Centrar la tabla
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    padding: '15px',
    fontWeight: 'bold',
    color: '#FFD700', // Texto amarillo
    textAlign: 'center',
    backgroundColor: 'rgba(48, 39, 13, 0.8)',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
  },
  downloadQRButton: {
    backgroundColor: '#FFD700',
    color: '#181407',
    border: 'none',
    padding: '8px 16px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    textAlign: 'center',
  },
};
