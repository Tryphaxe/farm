"use client";

import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge, Table } from "flowbite-react";
import { useState, useEffect } from "react";

export function TableHome() {
  const [reproducteurs, setReproducteurs] = useState([]);
  // Formatage des dates
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
  };

  const allReproducteur = async () => {
    const res = await fetch("/api/reproducteurs");
    const data = await res.json();

    // const lastReproducteurs = data.reproducteurs.sort((a,b) => new Date(b.created_At) - new Date(a.created_At)).slice(0, 5);
    setReproducteurs(data.reproducteurs);
  }
  useEffect(() => {
    allReproducteur();
  }, [])

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <Table striped>
        <Table.Head className="sticky">
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Race</Table.HeadCell>
          <Table.HeadCell>Sexe</Table.HeadCell>
          <Table.HeadCell>Date de naissance</Table.HeadCell>
          <Table.HeadCell>Crée il y a</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {reproducteurs.map((r) => (
            <Table.Row key={r.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {r.nom}
              </Table.Cell>
              <Table.Cell>{ r.race }</Table.Cell>
              <Table.Cell>
                <Badge size="sm" color={r.sexe === "Mâle" ? "indigo" : "pink"} className="w-fit">
                  {r.sexe}
                </Badge>
              </Table.Cell>
              <Table.Cell>{formatDate(r.date_naissance)}</Table.Cell>
              <Table.Cell>{formatDistanceToNow(r.date_ajout, { locale: fr })}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}