import React from 'react'
import { Modal, Button, Label, Spinner } from "flowbite-react";
import { Rabbit } from "lucide-react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
export default function Create({ open, close, onSave, reproducteur }) {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        nom: "",
        race: "",
        sexe: "",
        date_naissance: "",
    })

    // Pré-remplir les champs si on modifie un reproducteur
    useEffect(() => {
        if (reproducteur) {
            setFormData({
                nom: reproducteur.nom || "",
                race: reproducteur.race || "",
                sexe: reproducteur.sexe || "",
                date_naissance: reproducteur.date_naissance?.split("T")[0] || ""
            })
        } else {
            setFormData({
                nom: "",
                race: "",
                sexe: "",
                date_naissance: ""
            })
        }
    }, [reproducteur]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Validation du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = reproducteur ? `/api/reproducteurs/${reproducteur.id}` : "/api/reproducteurs";
            const method = reproducteur ? "PUT" : "POST";
            console.log(reproducteur);
            console.log("Données envoyées :", formData);

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(reproducteur ? "Reproducteur modifié avec succès !" : "Reproducteur enregistré avec succès !");
                onSave();
                close();
                console.log("----------------SUCCESS-------------");
            } else {
                toast.error(reproducteur ? "Modification échouée !" : "Enregistrement échoué !");
                console.log("----------------ERROR-------------")
            }
        } catch (error) {
            console.log('Erreur');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={open} size="md" dismissible onClose={() => close()}>
            <Modal.Header>
                <span className="flex items-center justify-center gap-x-3">
                    <Rabbit color="#562731" size={25} />
                    {reproducteur ? "Modifier" : "Ajouter"} un reproducteur
                </span>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nom" value="Nom" className="mb-2 block" />
                        <input
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                            id="nom"
                            name="nom"
                            type="text"
                            placeholder="Ex: M1"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="race" value="Race" className="mb-2 block" />
                        <select
                            id="race"
                            name="race"
                            value={formData.race}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                        >
                            <option value="">Sélectionner une race</option>
                            <option value="Rex">Rex</option>
                            <option value="Géant des flandres">Géant des flandres</option>
                            <option value="Lapin nain de couleur">Lapin nain de couleur</option>
                            <option value="Lapin angora">Lapin angora</option>
                            <option value="Géant papillon français">Géant papillon français</option>
                            <option value="Havane Hollandais">Havane Hollandais</option>
                            <option value="Lièvre belge">Lièvre belge</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="sexe" value="Sexe" className="mb-2 block" />
                        <select
                            id="sexe"
                            name="sexe"
                            value={formData.sexe}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                        >
                            <option value="">Choisir</option>
                            <option value="Mâle">Mâle</option>
                            <option value="Femelle">Femelle</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="date_naissance" value="Date de naissance" className="mb-2 block" />
                        <input
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                            id="date_naissance"
                            name="date_naissance"
                            type="date"
                            value={formData.date_naissance}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading && <Spinner size="sm" className="mr-2" />}
                        {reproducteur ? "Modifier" : "Ajouter"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}