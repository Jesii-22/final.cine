import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  cine: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  asientos: { type: [String], required: true },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

