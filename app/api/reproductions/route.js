import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DISPLAY ALL REPRODUCTION
export async function GET() {
    try {
        const [total, reproductions] = await Promise.all([
            prisma.repro.count(),
            prisma.repro.findMany()
        ])

        return NextResponse.json({ reproductions, total}, { status: 200 })
    } catch (error) {
        console.error("Erreur API :", error);
        return NextResponse.json({ error: "All reproductions failded" }, { status: 500 })
    }
}

// ADD REPRODUCTION
export async function POST(request) {
    const data = await request.json();
    console.log("Data reçu côté serveur :", data);

    try {
        const reproduction = await prisma.repro.create({
            data: {
                id_male: data.nom,
                id_femelle: data.race,
                diagnostic: data.sexe,
                startnid: data.startnid,
                date_parturition: data.date_parturition,
                lap_nes: data.lap_nes,
                designation: data.designation,
                lap_mort: data.lap_mort
            }
        })

        return NextResponse.json(reproduction, { status: 201 }
        )
    } catch (error) {
        console.error("Erreur Prisma :", JSON.stringify(error, null, 2));
        return NextResponse.json({ error: "Add reproduction failed", details: error }, { status: 500 });

    }
}