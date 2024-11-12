import { NextResponse } from "next/server";
import dbConnect from "@/app/config/dbConnect";
import Lead from "@/app/models/Lead";

export async function POST(req) {
  await dbConnect(); // Conexion a la base de datos
  console.log("Conectado a MongoDB");

  try {
    const data = await req.json(); 
    const { name, lastName, email, selectedCinema, selectedDate, selectedTime, selectedSeats } = data;

    
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
    console.error("Error al guardar la reserva:", error);
    return NextResponse.json({ success: false, error: 'Error al guardar la reserva' }, { status: 400 }); // Respuesta de error
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
}