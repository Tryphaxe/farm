"use client";

import { Select, Table, Badge } from "flowbite-react";
import { CircleFadingPlus, Rabbit, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {

    const router = useRouter()
    const [reproducteurs, setReproducteurs] = useState([]);
    // Récupérer les lapins au chargement
    useEffect(() => {
        fetchReproducteurs();
    }, []);

    const fetchReproducteurs = async () => {
        const res = await fetch("/api/reproducteurs");
        const data = await res.json();
        setReproducteurs(data);
    };

    return (
        <div className="w-full">
            {/* SECTION BANNER */}
            <div className="flex items-center justify-between px-3 py-2 w-full rounded-md bg-white">
                {/* Title */}
                <span className="flex items-center gap-x-3">
                    <Rabbit color="orange" size={25} />
                    Liste des lapins adultes
                </span>
                {/* Search input */}
                <div className="flex items-center gap-x-1 py-1 px-3 overflow-hidden">
                    <Search size={18} color="gray" />
                    <input type="text" placeholder="Recherche" className="bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none focus:outline-none" />
                </div>
                {/* Filter select */}
                <div className="max-w-md">
                    <Select id="countries" required sizing="sm">
                        <option>Filtrer</option>
                        <option>Mal</option>
                        <option>Femelle</option>
                    </Select>
                </div>
                {/* Add button */}
                <button onClick={() => router.push('/pages/lapins/create')} className="flex items-center gap-x-3 bg-gray-500 px-4 py-2 rounded-xl">
                    <CircleFadingPlus color="white" size={18} />
                    <span className="text-white">Ajouter</span>
                </button>
            </div>

            {/* SECTION */}
            <div className="mt-2 border border-gray-100 rounded-xl">
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Nom</Table.HeadCell>
                            <Table.HeadCell>Race</Table.HeadCell>
                            <Table.HeadCell>Sexe</Table.HeadCell>
                            <Table.HeadCell>Date Naissance</Table.HeadCell>
                            <Table.HeadCell>ID Père</Table.HeadCell>
                            <Table.HeadCell>ID Mère</Table.HeadCell>
                            <Table.HeadCell>Date Ajouter</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {reproducteurs.length > 0 ? (
                                reproducteurs.map(reproducteur => (
                                    <Table.Row key={reproducteur.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {reproducteur.id}
                                        </Table.Cell>
                                        <Table.Cell>{reproducteur.nom}</Table.Cell>
                                        <Table.Cell>{reproducteur.race}</Table.Cell>
                                        <Table.Cell><Badge color="indigo">{reproducteur.sexe}</Badge></Table.Cell>
                                        <Table.Cell>{reproducteur.date_naissance}</Table.Cell>
                                        <Table.Cell>{reproducteur.id_mere}</Table.Cell>
                                        <Table.Cell>{reproducteur.id_pere}</Table.Cell>
                                        <Table.Cell>{reproducteur.date_ajout}</Table.Cell>
                                        <Table.Cell>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                Edit
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))) : (
                                    <div className="w-full p-3 bg-red-200 flex items-center justify-center">
                                        <span>Aucun reproducteurs enrégistrer !</span>
                                    </div>
                                )
                            }

                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div >
    )
}