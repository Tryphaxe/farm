"use client"

import React, { useState, useEffect } from 'react'
import { ChartNoAxesGantt, Dog, HandCoins, Rabbit, UsersRound, Wallet } from "lucide-react"
import { Progress, Badge, Tooltip } from 'flowbite-react'
import LineChart from '@/components/LineChart'
import Banner from '@/components/Banner'
import Graphome from '@/components/Graphome'

export default function page() {
  const [total, setTotal] = useState(0);

  // Récupération des reproducteurs avec filtres
  const countReproducteurs = async () => {
    try {
      const response = await fetch(`/api/reproducteurs`);

      if (!response.ok) {
        throw new Error(`Erreur API Récupération de count reproducteurs : ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setTotal(data.total || 0);
    } catch (error) {
      setTotal(0);
    }
  };
  useEffect(() => {
    countReproducteurs();
  }, []);

  return (
    <div className='w-full'>
      {/* SECTION CARD */}
      <div className='grid grid-cols-5 gap-4 mb-5'>
        <div className="flex items-center px-5 py-3 bg-[#562731] bg-opacity-10 rounded-xl">
          <Rabbit size={55} color="#562731" strokeWidth={2} />
          <div className='flex flex-col ml-4'>
            <Tooltip content="Nombre de reproducteurs">
              <span className="text-2xl">{total}</span>
            </Tooltip>
            <span className="text-gray-500">Reproducteurs</span>
            {/* <div>
              <LineChart/>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col px-5 py-3 bg-[#fc515b] bg-opacity-5 rounded-xl">
          <div className='flex items-center gap-x-2'>
            <Dog size={25} color="#562731" strokeWidth={2} />
            <span className="text-gray-500">Lapins</span>
          </div>
          <div className=''>
            <Tooltip content="Nombre de lapins">
              <span className="text-4xl">246</span>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col px-5 py-3 bg-[#fc515b] bg-opacity-5 rounded-xl">
          <div className='flex items-center gap-x-2'>
            <HandCoins size={25} color="#562731" strokeWidth={2} />
            <span className="text-gray-500">Ventes</span>
          </div>
          <div className=''>
            <Tooltip content="Nombre de ventes">
              <span className="text-4xl">128</span>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col px-5 py-3 bg-[#fc515b] bg-opacity-5 rounded-xl">
          <div className='flex items-center gap-x-2'>
            <UsersRound size={25} color="#562731" strokeWidth={2} />
            <span className="text-gray-500">Clients</span>
          </div>
          <div className=''>
            <Tooltip content="Nombre de clients">
              <span className="text-4xl">128</span>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center px-5 py-3 border-dashed rounded-xl border">
          <Wallet size={50} color="gray" strokeWidth={2} />
          <div className='flex flex-col ml-4'>
            <span>Balance</span>
            <span className='mb-1 flex items-center'>1 025 000 &nbsp; <Badge color="gray">Fcfa</Badge></span>
            <Progress progress={45} size="sm" color="green" />
          </div>
        </div>
      </div>

      {/* BANNER */}
      <Banner />

      {/* SECTION */}
      <div className='grid grid-cols-2 gap-5'>
        <div className='border-dashed border bg-white rounded-2xl p-3 h-80'>
          <Badge icon={ChartNoAxesGantt} size='md' color='black'>Top products</Badge>
          <Graphome />
        </div>
      </div>

    </div>
  )
}