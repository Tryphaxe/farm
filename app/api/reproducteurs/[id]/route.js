import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE REPRODUCTEUR
export async function PUT (request, {params}) {
    try {
        const {id} = await params
        const data = await request.json()

        const updateReproducteur = await prisma.reproducteur.update({
            where: {id},
            data: {
                nom: data.nom,
                race: data.race,
                sexe: data.sexe,
                date_naissance: new Date(data.date_naissance)
            }
        })

        return NextResponse.json(updateReproducteur, {status: 200})
    } catch (error) {
        console.log("Erreur Modification : ", error);
        return NextResponse.json({error: "Erreur interne du serveur"}, {status: 500})
    }
}

export async function DELETE(request, {params}){
    const {id} = await params

    try {
        await prisma.reproducteur.delete({
            where : { id }
        })
        return NextResponse.json({message : "Delete success"}, {status : 200})
    } catch (error) {
        console.log("Erreur Modification : ", error);
        return NextResponse.json({error: "Erreur interne du serveur"}, {status: 500})
    }
}