import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    if (!data.date_repro) {
      return NextResponse.json({ error: "Date de reproduction manquante" }, { status: 400 });
    }

    const dateRepro = new Date(data.date_repro);
    console.log("Date de base :", dateRepro);

    if (isNaN(dateRepro)) {
      return NextResponse.json({ error: "Date invalide reçue" }, { status: 400 });
    }

    let nidDate = null;
    let parturitionDate = null;
    let lap_nes = null;
    let lap_mort = null;

    // Conditions selon le diagnostic
    if (data.diagnostique === "Positif") {
      nidDate = new Date(dateRepro);
      nidDate.setDate(nidDate.getDate() + 25);

      parturitionDate = new Date(dateRepro);
      parturitionDate.setDate(parturitionDate.getDate() + 31);
    }

    // ✅ Mise à jour dans la BDD
    const update = await prisma.repro.update({
      where: { id },
      data: {
        diagnostic: data.diagnostique,
        startnid: nidDate,
        date_parturition: parturitionDate,
        lap_nes: lap_nes,
        lap_mort: lap_mort,
      },
    });

    return NextResponse.json(update, { status: 200 });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json(
      { error: "Erreur mise à jour", details: error.message },
      { status: 500 }
    );
  }
}