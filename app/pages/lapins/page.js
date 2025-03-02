"use client";

import { TableHome } from "@/components/TableHome";
import { Label, Select } from "flowbite-react";
import { CircleFadingPlus, ListFilter, Rabbit, Search } from "lucide-react";

export default function page() {
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
                <button className="flex items-center gap-x-3 bg-gray-500 px-4 py-2 rounded-xl">
                    <CircleFadingPlus color="white" size={18} />
                    <span className="text-white">Ajouter</span>
                </button>
            </div>

            {/* SECTION */}
            <div className="mt-2 border border-gray-100 rounded-xl">
                <TableHome />
            </div>
        </div >
    )
}