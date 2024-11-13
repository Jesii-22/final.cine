import { NextResponse } from "next/server";
import dbConnect from "@/app/config/dbConnect";
import Lead from "@/app/models/Lead";

export async function POST(req) {
  await dbConnect(); // Conexión a la base de datos

  try {
    const data = await req.json();
    const { name, lastName, email, selectedCinema, selectedDate, selectedTime, selectedSeats } = data;

    // Validación de datos
    if (!name || !lastName || !email || !selectedCinema || !selectedDate || !selectedTime || !selectedSeats) {
      return NextResponse.json({ success: false, error: "Datos incompletos" }, { status: 400 });
    }

    // Ajuste p/q coincidan con los nombres del esquema
    const newLead = new Lead({
      nombre: name,
      apellido: lastName,
      correo: email,
      cine: selectedCinema,
      fecha: selectedDate,
      hora: selectedTime,
      asientos: selectedSeats
    });

    await newLead.save(); // Guardar documento en la base

    return NextResponse.json({ success: true, data: newLead }, { status: 201 }); 
  } catch (error) {
    console.error("Error al guardar la reserva en MongoDB:", error.message); 
    return NextResponse.json({ success: false, error: "Error al guardar la reserva" }, { status: 500 });
  }
}

// Función GET para obtener todos los tickets
export async function GET() {
  await dbConnect(); // Conexión a la base de datos
  try {
    const leads = await Lead.find({}); // Obtener todos los documentos en la colección Lead
    return NextResponse.json({ success: true, leads }); 
  } catch (error) {
    console.error("Error al obtener los tickets:", error.message); 
    return NextResponse.json({ success: false, error: "Error al obtener los tickets" }, { status: 500 });
  }
}
