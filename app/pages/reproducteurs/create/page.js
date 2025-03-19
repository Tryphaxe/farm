"use client";

import { Mars, Rabbit, Venus } from "lucide-react";
import React, { useState } from "react";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";

export default function Page() {
    const [form, setForm] = useState({
        nom: "",
        race: "",
        sexe: "",
        date_naissance: "",
        id_mere: "",
        id_pere: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données soumises :", form);
        // Ici, tu peux envoyer `form` à ton API via fetch ou axios.
    };

    return (
        <div className="w-full">
            <span className="flex items-center justify-center gap-x-3">
                <Rabbit color="orange" size={25} />
                Ajout nouveau lapin
            </span>

            {/* Forms */}
            <div className="w-full mt-3 flex justify-center">
                <form onSubmit={handleSubmit} className="w-1/2  p-4 bg-white rounded-md  flex items-center flex-col gap-y-2">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="nom" value="Nom" />
                        </div>
                        <TextInput id="nom" type="text" placeholder="M1" value={form.enclosId} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="race" value="Race" />
                        </div>
                        <Select id="race" required>
                            <option>Rex</option>
                            <option>Géant des flandres</option>
                            <option>Lapin nain de couleur</option>
                            <option>Lapin angora</option>
                            <option>Géant papillon français</option>
                            <option>Havane Hollandais</option>
                            <option>Lièvre belge</option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="sexe" value="Sexe" />
                        </div>
                        <Select id="sexe" required>
                            <option>Mâle</option>
                            <option>Femelle</option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Date de naissance" />
                        </div>
                        <Datepicker language="FR" labelTodayButton="Aujourd'hui" labelClearButton="Annuler" id="date" />
                    </div>
                    <div className="w-full flex items-center gap-x-3">
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="mere" value="Mère" />
                            </div>
                            <Select id="mere" required>
                                <option>F1</option>
                                <option>F2</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="pere" value="Père" />
                            </div>
                            <Select id="pere" required>
                                <option>M1</option>
                                <option>M2</option>
                            </Select>
                        </div>
                    </div>
                    {/* <input
                        type="number"
                        name="enclosId"
                        placeholder="ID de l'enclos"
                        value={form.enclosId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    /> */}
                    <Button type="submit">Enrégistrer</Button>
                </form>
            </div>
        </div>
    );
}