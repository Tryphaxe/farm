import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer tous les reproducteurs
export async function GET() {
    try {
      const reproducteurs = await prisma.reproducteur.findMany();
      return NextResponse.json(reproducteurs);
    } catch (error) {
      return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
    }
  }