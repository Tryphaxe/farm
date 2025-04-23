"use client";

import { Mars, Venus } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function TableHome() {
  const [reproducteurs, setReproducteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const lastReproducteurs = async () => {
    try {
      const res = await fetch("/api/reproducteurs/last");
      if (!res.ok) { toast.error("Erreur de chargement des reproducteurs"); }

      const data = await res.json();
      setReproducteurs(data);
    } catch (error) {
      toast.error("Erreur de chargement :", error);
    } finally {
      setIsLoading(false); // 👈 Arrêter le chargement
    }
  };
  useEffect(() => {
    lastReproducteurs();
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded animate-pulse w-full"
            />
          ))}
        </div>
      ) : (
        <ul>
          {reproducteurs.map((rep) => (
            <li
              key={rep.id}
              className="px-4 py-2 mb-1 bg-white rounded-xl shadow-md flex items-center gap-2"
            >
              {rep.sexe === "Femelle" ? (
                <Venus size={20} color="#fc515b" />
              ) : (
                <Mars size={20} color="#0c618b" />
              )}
              <div>
                <strong>{rep.nom}</strong> - {rep.race} ({rep.sexe})
                <br />
                <span className="text-sm text-gray-500">
                  Ajouté le {new Date(rep.date_ajout).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}