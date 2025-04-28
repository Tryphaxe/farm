import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DISPLAY ALL REPRODUCTION
export async function GET() {

    try {
        const [total, reproductions] = await Promise.all([
            prisma.repro.count(),
            prisma.repro.findMany({
                include: {
                    male: true,
                    femelle: true  
                }
            })
        ])

        return NextResponse.json({ reproductions, total }, { status: 200 })
    } catch (error) {
        console.error("Erreur API :", error);
        return NextResponse.json({ error: "All reproductions failded" }, { status: 500 })
    }
}

// ADD REPRODUCTION
export async function POST(request) {
    const data = await request.json();
    console.log("Data reçu côté serveur :", data);
    const { id_male, id_femelle, date_repro } = data;

    try {
        // Vérifier si les reproducteurs existent dans la base de données
        const male = await prisma.reproducteur.findUnique({ where: { id: id_male } });
        const femelle = await prisma.reproducteur.findUnique({ where: { id: id_femelle } });

        if (!male || !femelle) {
            return NextResponse.json(
                { error: "Un ou les deux reproducteurs n'existent pas." },
                { status: 404 }
            );
        }

        // Créer une nouvelle reproduction
        const reproduction = await prisma.repro.create({
            data: {
                id_male: id_male,
                id_femelle: id_femelle,
                diagnostic: "En attente",
                date_repro: new Date(date_repro),
            },
        });

        return NextResponse.json(reproduction, { status: 201 });
    } catch (error) {
        console.error("Erreur Prisma :", JSON.stringify(error, null, 2));
        return NextResponse.json(
            { error: "Ajout de la reproduction échoué", details: error },
            { status: 500 }
        );
    }
}