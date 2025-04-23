"use client";

import React from 'react'
import { Modal, Button, Label, Spinner } from "flowbite-react";
import { Waypoints } from "lucide-react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

export default function Create({ open, close, onSave, reproduction }) {
    const [isLoading, setIsLoading] = useState(false);
    const [males, setMales] = useState([]);
    const [femelles, setFemelles] = useState([]);

    const [formData, setFormData] = useState({
        id_male: "",
        id_femelle: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setFormData({
            id_male: "",
            id_femelle: ""
        })
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/reproducteurs');
            const data = await res.json();
            setMales(data.males);
            setFemelles(data.femelles);
        };

        fetchData();
    }, []);

    // Validation du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = "/api/reproductions";
            const method = "POST";
            console.log(reproduction);
            console.log("Données envoyées :", formData);

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Reproducteur enregistré avec succès !");
                onSave();
                close();
                console.log("----------------SUCCESS-------------");
            } else {
                toast.error("Enregistrement échoué !");
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
                    <Waypoints color="#562731" size={25} />
                    Enregistrer une reproduction
                </span>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="male" value="Mâle" className="mb-2 block" />
                        <select
                            id="male"
                            name="male"
                            value={formData.id_male}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                        >
                            <option value="">Sélectionner un mâle</option>
                            {males.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="femelle" value="Femelle" className="mb-2 block" />
                        <select
                            id="femelle"
                            name="femelle"
                            value={formData.id_femelle}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                        >
                            <option value="">Sélectionner une femelle</option>
                            {femelles.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading && <Spinner size="sm" className="mr-2" />}
                        Ajouter
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}