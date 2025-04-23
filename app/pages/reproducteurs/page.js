"use client";

import { Select, Table, Badge, Button } from "flowbite-react";
import { CircleFadingPlus, Rabbit, Search, RotateCw, Pencil, Trash, Venus, Mars, Upload, LucideRotate3D, Webhook } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Exporting from "./exporting";
import Create from "./create";
import toast from "react-hot-toast";

export default function ReproducteursPage() {
    const [loading, setLoading] = useState(true);
    const [reproducteurs, setReproducteurs] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sexe, setSexe] = useState("");
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [currentReproducteur, setCurrentReproducteur] = useState(null);

    const handleOpenModal = (reproducteur = null) => {
        setCurrentReproducteur(reproducteur);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setCurrentReproducteur(null);
        setOpenModal(false);
    };

    const handleSave = () => {
        handleCloseModal();
        fetchReproducteurs();
    };

    // Formatage des dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
    };

    const deleteReproducteur = async (id) => {
        const confirm = window.confirm("Supprimer ce reproducteur ?")
        if (!confirm) return

        try {
            const response = await fetch(`/api/reproducteurs/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Reproducteur supprimé avec succès !")
                fetchReproducteurs();
            } else {
                toast.error("Erreur lors de la suppression du reproducteur !")
            }
        } catch (error) {
            console.error("Erreur reseau :", error)
        }
    }

    // Récupération des reproducteurs avec filtres
    const fetchReproducteurs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/reproducteurs?search=${search}&sexe=${sexe}&page=${page}`);

            if (!response.ok) {
                throw new Error(`Erreur API Récupération de reproducteurs : ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            setReproducteurs(data.reproducteurs || []);
            setTotalPages(data.totalPages);
            setTotal(data.total || 0);
        } catch (error) {
            setReproducteurs([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReproducteurs();
    }, [search, sexe, page]);

    return (
        <div className="w-full">
            {/* SECTION BANNER */}
            <div className="border border-dashed flex flex-wrap items-center justify-between gap-3 px-3 py-2 w-full rounded-md bg-white">
                {/* Title */}
                <div className="flex items-center gap-x-3">
                    <Rabbit color="#562731" size={25} />
                    <div>
                        <span className="text-lg">Liste des reproducteurs - </span>
                        {loading ? (
                            <span className="animate-pulse">######</span>
                        ) : (
                            <span className="text-md text-gray-500">{total} résultat(s) trouvé(s){search ? ` pour "${search}"` : ""}</span>
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filtre par sexe */}
                    <Select
                        id="filter-sex"
                        value={sexe}
                        onChange={(e) => setSexe(e.target.value)}
                        sizing="md"
                    >
                        <option value="">Tous les sexes</option>
                        <option value="Mâle">Mâle</option>
                        <option value="Femelle">Femelle</option>
                    </Select>

                    {/* Boutons d'action */}
                    <div className="flex space-x-3">
                        <button
                            onClick={fetchReproducteurs}
                            disabled={loading}
                            className="flex items-center gap-x-3 bg-[#811d24] px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors"
                        >
                            <RotateCw color="white" size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-x-3 bg-gray-500 px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <CircleFadingPlus color="white" size={18} />
                            <span className="text-white">Ajouter</span>
                        </button>
                        <button
                            onClick={() => setOpenExport(true)}
                            className="flex items-center gap-x-3 bg-[#562731] px-4 py-2 rounded-xl hover:bg-[#6e2e3c] transition-colors"
                        >
                            <Upload color="white" size={18} />
                            <span className="text-white">Exporter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION TABLEAU */}
            <div className="mt-2">
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Nom</Table.HeadCell>
                            <Table.HeadCell>Race</Table.HeadCell>
                            <Table.HeadCell>Sexe</Table.HeadCell>
                            <Table.HeadCell>Date Naissance</Table.HeadCell>
                            <Table.HeadCell>Date Ajout</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {!loading && reproducteurs.length > 0 ? (
                                reproducteurs.map(reproducteur => (
                                    <Table.Row key={reproducteur.id} className="bg-white hover:bg-gray-50 transition-colors">
                                        <Table.Cell className="font-semibold text-gray-900 text-xl">{reproducteur.nom}</Table.Cell>
                                        <Table.Cell className="text-gray-900 text-md">{reproducteur.race}</Table.Cell>
                                        <Table.Cell>
                                            <Badge size="md" color={reproducteur.sexe === "Mâle" ? "indigo" : "pink"} className="w-fit">
                                                {reproducteur.sexe}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>{formatDate(reproducteur.date_naissance)}</Table.Cell>
                                        <Table.Cell>{formatDate(reproducteur.date_ajout)}</Table.Cell>
                                        <Table.Cell className="flex space-x-2">
                                            <Button size="xs" color="green" onClick={() => handleOpenModal(reproducteur)} outline><Pencil size={15} /></Button>
                                            <Button size="xs" color="red" onClick={() => deleteReproducteur(reproducteur.id)} outline><Trash size={15} /></Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : !loading && search && reproducteurs.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={8} className="text-center py-4 text-gray-500">
                                        Aucun résultat trouvé pour "{search}"
                                    </Table.Cell>
                                </Table.Row>
                            ) : !loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={8} className="text-center py-4 text-gray-500">
                                        Aucun reproducteur disponible
                                    </Table.Cell>
                                </Table.Row>
                            ) : null}
                        </Table.Body>
                    </Table>
                    {loading && (
                        <div className="flex justify-center items-center my-4">
                            <Webhook color="#fc515b" size={30} className={loading ? "animate-spin" : ""} />
                        </div>
                    )}
                    {/* <!-- Pagination --> */}
                    <div className="flex bg-[#fc515b] bg-opacity-10 col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                <li className="mr-2">
                                    <span>Page  {page}/{totalPages}</span>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Previous"
                                        onClick={() => setPages(
                                            prev => Math.max(prev - 1, 1)
                                        )}
                                        disabled={page === 1}
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <li key={p}>
                                        <button
                                            onClick={() => setPages(p)}
                                            className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                        >
                                            {p}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Next"
                                        onClick={() => setPages(
                                            prev => Math.min(prev + 1, totalPages)
                                        )}
                                        disabled={page === totalPages}
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* SECTION MODAL CREATE OR UPDATE*/}
            <Create open={openModal} close={handleCloseModal}
                onSave={handleSave}
                reproducteur={currentReproducteur}
            />

            {/* SECTION MODAL EXPORT */}
            <Exporting open={openExport} setOpen={setOpenExport} />
        </div>
    );
}