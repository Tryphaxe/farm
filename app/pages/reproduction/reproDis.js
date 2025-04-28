import React, { useEffect, useState } from 'react'
import { Badge, Button } from "flowbite-react";
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from "flowbite-react";
import { Activity, Eye, CalendarCheck, Container, CalendarClock, EllipsisVertical, CirclePlus, CircleMinus } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function ReproDis({ id, startnid, idm, idf, date_repro, diagnostique, date_parturition, lap_nes, createdAt, lap_mort }) {

    const [diagnosticState, setDiagnosticState] = useState(diagnostique || "En attente");
    const [data, setData] = useState(null);

    // Fetch des données initiales
    const fetchData = async () => {
        const res = await fetch(`/api/repro/${id}`);
        const result = await res.json();
        setData(result);
        setDiagnosticState(result.diagnostic || "En attente");
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Mettre à jour automatiquement lorsque la valeur change
    useEffect(() => {
        if (diagnosticState !== "En attente" && diagnostique !== diagnosticState) {
            fetch(`/api/reproductions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ diagnostique: diagnosticState, date_repro: date_repro })
            })
                .then(response => {
                    if (!response.ok) {
                        toast.error("Erreur de mise à jour du diagnostic");
                        throw new Error("Erreur de mise à jour du diagnostic");
                    } else {
                        toast.success("Diagnostic mis à jour avec succès !");
                        fetchData();
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Diagnostic mis à jour :", data);
                })
                .catch(error => {
                    console.error("Erreur :", error);
                });
        }
    }, [diagnosticState]);

    // Fonction de formatage sécurisée
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Non défini" : format(date, "dd/MM/yyyy", { locale: fr });
    };

    // Date du diagnostic = 10 jours après la reproduction
    const diagnosticDate = date_repro ? new Date(date_repro) : null;
    if (diagnosticDate) diagnosticDate.setDate(diagnosticDate.getDate() + 10);

    return (
        <div className="px-3 py-2 w-full rounded-md border border-dashed mt-5 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-x-3">
                    <span className="relative flex size-3">
                        <span className={clsx(
                            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                            {
                                "bg-yellow-200": diagnostique === "En attente",
                                "bg-green-400": diagnostique === "Positif",
                                "bg-red-500": diagnostique === "Négatif",
                            }
                        )}></span>
                        <span className={clsx(
                            "relative inline-flex size-3 rounded-full",
                            {
                                "bg-yellow-300": diagnostique === "En attente",
                                "bg-green-700": diagnostique === "Positif",
                                "bg-red-700": diagnostique === "Négatif",
                            }
                        )}></span>
                    </span>
                    <Badge size="md" color="light" className="w-fit" icon={CalendarCheck}>
                        Date de reproduction : {formatDate(date_repro)}
                    </Badge>
                    <Badge size="md" color="light" className="w-fit" icon={Container}>
                        Préparation du nid : {formatDate(startnid)}
                    </Badge>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button color="light" size="md">
                        <Eye size={16} />
                    </Button>
                    <Dropdown label={<EllipsisVertical />} arrowIcon={false} inline>
                        <DropdownHeader>
                            <span>Options</span>
                        </DropdownHeader>
                        <DropdownDivider />
                        <DropdownItem>Modifier</DropdownItem>
                        <DropdownItem>Supprimer</DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="flex items-center justify-center mt-2">
                {/* Mère */}
                <div className="bg-white border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Mère</h4>
                    <p className="text-lg text-gray-500">{idf}</p>
                </div>

                {/* Trait + icône */}
                <div className="border-t-2 border-red-500 border-dashed min-w-10" />
                <Badge size="sm" color="failure" className="w-fit" icon={Activity}></Badge>
                <div className="border-t-2 border-red-500 border-dashed min-w-10" />

                {/* Père */}
                <div className="bg-white border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Père</h4>
                    <p className="text-lg text-gray-500">{idm}</p>
                </div>

                <div className="border-t-2 border-red-500 border-dashed min-w-10" />

                {/* Diagnostic */}
                <div className="bg-white flex flex-col items-center justify-center border border-dashed p-4 rounded-lg text-center">
                    <h5 className="font-semibold text-sm text-gray-500 mb-1">
                        {diagnosticDate ? formatDate(diagnosticDate) : "Date du diagnostic inconnue"}
                    </h5>
                    <h4 className="font-bold text-gray-700">Diagnostic</h4>
                    <select
                        value={diagnosticState}
                        onChange={(e) => setDiagnosticState(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        <option value="En attente">En attente</option>
                        <option value="Positif">Positif</option>
                        <option value="Négatif">Négatif</option>
                    </select>
                </div>

                <div className="border-t-2 border-red-500 border-dashed w-full" />

                <Badge size="md" color="failure" className='w-max' icon={CalendarClock}>
                    Parturition : {formatDate(date_parturition)}
                </Badge>

                <div className="border-t border-black border-dashed w-full" />

                {/* Lapins nés */}
                <div className="bg-white border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Nbre Lapins</h4>
                    <p className="text-sm text-gray-500">{lap_nes} - {lap_mort}</p>
                </div>
            </div>
        </div>
    );
}