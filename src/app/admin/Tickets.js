import { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';

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
    <div style={styles.adminContainer}>
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
                <button style={styles.downloadQRButton} onClick={() => handleDownloadQR(lead)}>
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
    </div>
  );
}

const styles = {
  adminContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  ticketsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f9f9f9',
  },
  tableHeader: {
    padding: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left',
  },
  tableRow: {
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  downloadQRButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
};
