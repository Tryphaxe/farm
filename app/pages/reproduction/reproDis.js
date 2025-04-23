import React from 'react'
import { Badge, Button } from "flowbite-react";
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from "flowbite-react";
import { Activity, Eye, CalendarCheck, Container, CalendarClock, EllipsisVertical } from "lucide-react";

export default function ReproDis({date_repro, startnid, idm, idf, diagnostique, date_parturition, lap_nes, createdAt, lap_mort}) {
    return (
        <div className="px-3 py-2 w-full rounded-md border border-dashed mt-5 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-x-3">
                    {/*  */}
                    <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-green-700"></span>
                    </span>
                    <Badge size="md" color="light" className="w-fit" icon={CalendarCheck}>Date de reproduction : {createdAt}</Badge>
                    <Badge size="md" color="light" className="w-fit" icon={Container}>Préparation du nid : {startnid}</Badge>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button color="light" size="md">
                        <Eye size={16} />
                    </Button>
                    <Dropdown label={<EllipsisVertical />} arrowIcon={false} inline>
                        <DropdownHeader>
                            <span>Options</span>
                        </DropdownHeader>
                        <DropdownDivider />
                        <DropdownItem>Modifier</DropdownItem>
                        <DropdownItem>Supprimer</DropdownItem>
                    </Dropdown>
                </div>
            </div>
            <div className="flex items-center justify-center mt-2">

                {/* Div de gauche */}
                <div className="bg-white border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Mère</h4>
                    <p className="text-sm text-gray-500">{idf}</p>
                </div>

                {/* Le nœud au centre */}
                <div className="border-t border-[#ff9677] border-dashed w-10" />
                <Activity color="#ff9677" size={40} className="" />
                <div className="border-t border-[#ff9677] border-dashed w-10" />

                {/* Div de droite */}
                <div className="bg-white  border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Père</h4>
                    <p className="text-sm text-gray-500">{idm}</p>
                </div>

                <div className="border-t border-[#ff9677] border-dashed w-10" />

                <div className="bg-white  border border-dashed p-4 rounded-lg text-center">
                    <h4 className="font-bold text-gray-700">Diagnostic</h4>
                    <p className={diagnostique === "Positif" ? "text-lg font-bold text-green-700" : "text-lg font-bold text-red-700"}>{diagnostique}</p>
                </div>

                {/*  */}
                <div className="border-t border-black border-dashed w-full animate-pulse" />
                <Badge size="md" color="indigo" className="w-fit animate-pulse" icon={CalendarClock}>Parturition:&nbsp;{date_parturition}</Badge>
                <div className="border-t border-black border-dashed w-full animate-pulse" />

                {/*  */}
                <div className="bg-white  border border-dashed p-4 rounded-lg text-center animate-pulse">
                    <h4 className="font-bold text-gray-700">Nbre Lapins</h4>
                    <p className="text-sm text-gray-500">{lap_nes} - {lap_mort}</p>
                </div>
            </div>
        </div>
    )
}