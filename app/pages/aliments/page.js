"use client";

import { CircleFadingPlus, Cookie } from "lucide-react";

export default function page() {
    return (
        <div className="w-full">
            {/* SECTION BANNER */}
            <div className="flex items-center justify-between px-3 py-2 w-full rounded-md bg-white">
                {/* Title */}
                <span className="flex items-center gap-x-3">
                    <Cookie color="orange" size={25} />
                    Aliments
                </span>
                {/* Add button */}
                <button className="flex items-center gap-x-3 bg-gray-500 px-4 py-2 rounded-xl">
                    <CircleFadingPlus color="white" size={18} />
                    <span className="text-white">Ajouter</span>
                </button>
            </div>

            {/* SECTION */}
            <div className="mt-2 border border-gray-100 rounded-xl">
                
            </div>
        </div >
    )
}