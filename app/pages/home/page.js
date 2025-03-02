"use client"

import React from 'react'
import { BadgeDollarSign, Blocks, ChartNoAxesGantt, Columns4, HandCoins, Rabbit, UsersRound } from "lucide-react"
import { Progress, Badge, Tooltip } from 'flowbite-react'
import LineChart from '@/components/LineChart'
import { TableHome } from '@/components/TableHome'

export default function page() {
  return (
    <div className='w-full'>
      {/* SECTION CARD */}
      <div className='grid grid-cols-5 gap-4 mb-5'>
        <div className="flex items-center px-5 py-3 bg-white rounded-xl">
          <Rabbit size={55} color="orange" strokeWidth={1} />
          <div className='flex flex-col ml-4'>
            <Tooltip content="Nombre de lapins">
              <span className="text-2xl">128</span>
            </Tooltip>
            <span className="text-gray-500">Lapins</span>
            {/* <div>
              <LineChart/>
            </div> */}
          </div>
        </div>
        <div className="flex items-center px-5 py-3 bg-white rounded-xl">
          <Columns4 size={55} color="orange" strokeWidth={1} />
          <div className='flex flex-col ml-4'>
            <Tooltip content="Nombre de cages">
              <span className="text-2xl">12</span>
            </Tooltip>
            <span className="text-gray-500">Enclos</span>
          </div>
        </div>
        <div className="flex items-center px-5 py-3 bg-white rounded-xl">
          <HandCoins size={55} color="orange" strokeWidth={1} />
          <div className='flex flex-col ml-4'>
            <Tooltip content="Nombre de ventes">
              <span className="text-2xl">128</span>
            </Tooltip>
            <span className="text-gray-500">Ventes</span>
          </div>
        </div>
        <div className="flex items-center px-5 py-3 bg-white rounded-xl">
          <UsersRound size={55} color="orange" strokeWidth={1} />
          <div className='flex flex-col ml-4'>
            <Tooltip content="Nombre de clients">
              <span className="text-2xl">128</span>
            </Tooltip>
            <span className="text-gray-500">Clients</span>
          </div>
        </div>
        <div className="flex items-center px-5 py-3 border-dashed rounded-xl border">
          <BadgeDollarSign size={50} color="green" strokeWidth={2} />
          <div className='flex flex-col ml-4'>
            <Progress progress={45} size="md" color="green" />
            <span className='mt-1'>1.025.000 <Badge color="gray">Fcfa</Badge></span>
          </div>
        </div>
      </div>

      {/* SECTION */}
      <div className='grid grid-cols-2 gap-5'>
        <div className='border-dashed border bg-white rounded-2xl p-5'>
          <LineChart />
        </div>
        <div className='border-dashed border bg-white rounded-2xl p-5'>
          <Badge icon={ChartNoAxesGantt} size='md' color='black'>Top products</Badge>
          <TableHome />
        </div>
      </div>

    </div>
  )
}