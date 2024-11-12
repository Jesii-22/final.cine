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

    const newLead = new Lead({
      name,
      lastName,
      email,
      cine: selectedCinema,
      fecha: selectedDate,
      hora: selectedTime,
      asientos: selectedSeats
    });

    await newLead.save(); // Guardar documento en la base de datos

    return NextResponse.json({ success: true, data: newLead }, { status: 201 }); // Respuesta exitosa
  } catch (error) {
    console.error("Error al guardar la reserva en MongoDB:", error);
    return NextResponse.json({ success: false, error: "Error al guardar la reserva" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Método no permitido, usa POST para crear una reserva' }, { status: 405 });
}
