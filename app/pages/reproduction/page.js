"use client";

import { Alert, Select } from "flowbite-react";
import { CircleFadingPlus, Search, Waypoints, RotateCw, Upload, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import ReproDis from "./reproDis";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Create from "./create";

export default function page() {
    const [loading, setLoading] = useState(true);
    const [reproductions, setReproductions] = useState([]);
    const [total, setTotal] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [currentReproduction, setCurrentReproduction] = useState(null);

    const handleOpenModal = (reproducteur = null) => {
        setCurrentReproduction(reproducteur);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentReproduction(null);
        setOpenModal(false);
    };

    const handleSave = () => {
        handleCloseModal()
        fetchReproductions();
    };

    // Formatage des dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
    };

    // Récupération des reproducteurs avec filtres
    const fetchReproductions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/reproductions`);

            if (!response.ok) {
                throw new Error(`Erreur API Récupération de reproductions : ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            setReproductions(data.reproductions || []);
            setTotal(data.total || 0);
        } catch (error) {
            setReproductions([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReproductions();
    }, []);

    return (
        <div className="w-full">
            {/* SECTION BANNER */}
            <div className="border border-dashed flex flex-wrap items-center justify-between gap-3 px-3 py-2 w-full rounded-md bg-white">
                {/* Title */}
                <div className="flex items-center gap-x-3">
                    <Waypoints color="#562731" size={25} />
                    <div className="flex items-center">
                        <span className="text-lg">Reproductions - &nbsp;</span>
                        {loading ? (
                            <span className="animate-pulse">######</span>
                        ) : (
                            <span className="text-md text-gray-500">{total} résultat(s) trouvé(s)</span>
                        )}
                    </div>
                </div>

                {/* Contrôles de recherche et filtres */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Champ de recherche */}
                    <div className="border-b border-[#762531] flex items-center gap-x-1 py-1 overflow-hidden">
                        <Search size={15} color="gray" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom..."
                            className="bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none focus:outline-none"
                        />
                    </div>

                    {/* Filtre par sexe */}
                    <Select
                        id="filter-sex"
                        sizing="md"
                    >
                        <option value="">Tous les sexes</option>
                        <option value="Mâle">Mâle</option>
                        <option value="Femelle">Femelle</option>
                    </Select>

                    {/* Boutons d'action */}
                    <div className="flex space-x-3">
                        <button
                            onClick={fetchReproductions}
                            disabled={loading}
                            className="flex items-center gap-x-3 bg-[#811d24] px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors"
                        >
                            <RotateCw color="white" size={18} />
                        </button>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-x-3 bg-gray-500 px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <CircleFadingPlus color="white" size={18} />
                            <span className="text-white">Ajouter</span>
                        </button>
                        <button
                            className="flex items-center gap-x-3 bg-[#562731] px-4 py-2 rounded-xl hover:bg-[#6e2e3c] transition-colors"
                        >
                            <Upload color="white" size={18} />
                            <span className="text-white">Exporter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION */}
            <div className="flex flex-col items-center justify-center pt-4">
                {!loading && reproductions.length > 0 ? (
                    reproductions.map((reproduction) => (
                        <ReproDis
                            key={reproduction.id}
                            idf={reproduction.id_femelle}
                            idm={reproduction.id_male}
                            diagnostique={reproduction.diagnostic}
                            createdAt={formatDate(reproduction.createdAt)}
                            startnid={formatDate(reproduction.startnid)}
                            date_parturition={formatDate(reproduction.date_parturition)}
                            lap_mort={reproduction.lap_mort}
                            lap_nes={reproduction.lap_nes}
                        />
                    ))
                ) : !loading ? (
                    <Alert color="light" withBorderAccent>
                        <span>
                            Aucune reproductions n'a été faite !
                        </span>
                    </Alert>
                ) : loading ? (
                    <LoaderCircle className="animate-spin text-[#fc515b]" size={20} />
                ) : null}
            </div>

            {/* SECTION MODAL CREATE OR UPDATE*/}
            <Create open={openModal} close={handleCloseModal}
                onSave={handleSave}
                reproducteur={currentReproduction}
            />
        </div >
    )
}