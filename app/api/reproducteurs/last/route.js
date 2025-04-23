import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lastReproducteurs = await prisma.reproducteur.findMany({
      orderBy: { date_ajout: "desc" },
      take: 5,
    });
    return NextResponse.json(lastReproducteurs, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}