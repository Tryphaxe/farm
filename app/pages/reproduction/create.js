"use client";

import React from 'react'
import { Modal, Button, Label, Spinner } from "flowbite-react";
import { Activity, Mars, Venus, Waypoints } from "lucide-react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

export default function Create({ open, close, onSave, reproduction }) {
    const [isLoading, setIsLoading] = useState(false);
    const [males, setMales] = useState([]);
    const [femelles, setFemelles] = useState([]);

    const [formData, setFormData] = useState({
        id_male: "",
        id_femelle: "",
        date_repro: new Date().toISOString().split("T")[0]
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setFormData({
            id_male: "",
            id_femelle: "",
            date_repro: new Date().toISOString().split("T")[0]
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
                        <Label htmlFor="date_repro" value="Date de reproduction" className="mb-2 block" />
                        <input
                            required
                            className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                            id="date_repro"
                            name="date_repro"
                            type="date"
                            value={formData.date_repro}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <div className='flex flex-col items-center justify-center p-2 gap-2 rounded-lg border border-dashed shadow-sm' >
                            <span className='flex gap-2'><Mars size={20} color="blue" />Mâle</span>
                            <select
                                id="male"
                                name="id_male"
                                value={formData.id_male}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                            >
                                <option value="">Choisir</option>
                                {males.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="border-t border-[#ff9677] border-dashed w-10 animate-pulse" />
                        <Activity color="#ff9677" size={15} className="animate-pulse" />
                        <div className="border-t border-[#ff9677] border-dashed w-10 animate-pulse" />
                        <div className='flex flex-col items-center justify-center p-2 gap-2 rounded-lg border border-dashed shadow-sm' >
                            <span className='flex gap-2'><Venus size={20} color="pink" />Femelle</span>
                            <select
                                id="femelle"
                                name="id_femelle"
                                value={formData.id_femelle}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md bg-gray-50 border-gray-200 p-2 border"
                            >
                                <option value="">Choisir</option>
                                {femelles.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
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