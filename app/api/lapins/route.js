import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer tous les lapins (GET)
export async function GET() {
  try {
    const lapins = await prisma.lapin.findMany();
    return NextResponse.json(lapins);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// Ajouter un lapin (POST)
export async function POST(req) {
  try {
    const { nom, race, age, poids, enclosId } = await req.json();

    if (!nom || !race || !age || !poids || !enclosId) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 });
    }

    const lapin = await prisma.lapin.create({
      data: { nom, race, age: parseInt(age), poids: parseFloat(poids), enclosId: parseInt(enclosId) },
    });

    return NextResponse.json(lapin);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
  }
}
