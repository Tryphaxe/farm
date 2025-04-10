import React from 'react'
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";

export default function Exporting({ open, setOpen }) {
  const [reproducteurs, setReproducteurs] = useState([]);

  const fetchReproducteurs = async () => {
    try {
      const response = await fetch(`/api/reproducteurs`);

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setReproducteurs(data.reproducteurs || []);
    } catch (error) {
      console.error("Erreur :", error);
      setReproducteurs([]);
    }
  };

  // Charger les données quand le modal s'ouvre
  useEffect(() => {
    if (open) {
      fetchReproducteurs();
    }
  }, [open]);

  // Export PDF and Excel
  const exportPDF = () => {
    const doc = new jsPDF();
    const logoUrl = '/fav.png';
    doc.addImage(logoUrl, 'PNG', 15, 10, 20, 20);
    doc.text("Liste des Reproducteurs", 70, 20);
    doc.setFontSize(18);
    doc.setTextColor(40);

    const tableData = reproducteurs.map((r) => [r.id, r.nom, r.sexe, r.race]);
    autoTable(doc, {
      head: [["ID", "Nom", "Sexe", "Race"]],
      body: tableData,
      startY: 40,
    })

    const date = new Date().toLocaleDateString();
    doc.save(`reproducteurs- ${date}.pdf`);
    setOpen(false);
    toast.success("Fichier PDF exporté avec succès !", {
      style: {
        background: "#f1f1f1",
        color: "#562731",
        fontSize: "14px",
        fontFamily: "Afacad",
        hideProgressBar: true,
        borderRadius: "10px"
      },
    });
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reproducteurs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reproducteurs");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const date = new Date().toLocaleDateString();
    saveAs(data, `reproducteurs-${date}.xlsx`);
    setOpen(false);
    toast.success("Fichier Excel exporté avec succès !", {
      style: {
        background: "#f1f1f1",
        color: "#562731",
        fontSize: "14px",
        fontFamily: "Afacad",
        hideProgressBar: true,
        borderRadius: "10px"
      },
    });
  };


  return (
    <Modal show={open} size="md" onClose={() => setOpen(false)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <div className="w-full flex items-center justify-center mb-2">
            <Upload color="gray" size={50} />
          </div>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Comment voulez-vous exporter ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="green" onClick={exportExcel}>
              Excel
            </Button>
            <Button color="red" onClick={exportPDF}>
              Pdf
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
