import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DISPLAY ALL REPRODUCTEUR
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search")
        const sexe = searchParams.get("sexe")
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = 6

        const filters = {}
        if (search) { filters.search = search }
        if (sexe) { filters.sexe = sexe }

        const [total, reproducteurs] = await Promise.all([
            prisma.reproducteur.count({
                where: filters
            }),
            prisma.reproducteur.findMany({
                where: filters,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: {
                    date_ajout: "desc",
                }
            })
        ])

        return NextResponse.json({ reproducteurs, total, totalPages: Math.ceil(total / pageSize), currentPage: page }, { status: 200 })
    } catch (error) {
        console.log("Erreur API : ", error);
        return NextResponse.json({ error: "All reproducteur failded" }, { status: 500 })
    }
}

// ADD REPRODUCTEUR
export async function POST(request) {
    const data = await request.json();
    console.log("Data reçu côté serveur :", data);

    try {
        const reproducteur = await prisma.reproducteur.create({
            data: {
                nom: data.nom,
                race: data.race,
                sexe: data.sexe,
                date_naissance: new Date(data.date_naissance)
            }
        })

        return NextResponse.json(reproducteur, { status: 201 }
        )
    } catch (error) {
        console.error("Erreur Prisma :", JSON.stringify(error, null, 2));
        return NextResponse.json({ error: "Add reproducteur failed", details: error }, { status: 500 });

    }
}

// UPDATE REPRODUCTEUR
export async function PUT(request, { params }) {
    try {
        const { id } = await params
        const data = await request.json()

        const updateReproducteur = await prisma.reproducteur.update({
            where: { id },
            data: {
                nom: data.nom,
                race: data.race,
                sexe: data.sexe,
                date_naissance: data.date_naissance
            }
        })

        return NextResponse.json(updateReproducteur, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Update reproducteur failed" }, { status: 500 })
    }
}