"use client"

import React from 'react';
import { Activity, ChevronsDown, ChevronsUp, Target, Waypoints, Webhook } from 'lucide-react'
import { Button } from 'flowbite-react';

export default function Banner() {
    return (
        <div className='border border-dashed mb-3 p-3 rounded-md grid grid-cols-4 gap-3'>
            <div className='p-2 rounded-lg bg-orange-300 flex items-center justify-between gap-x-2'>
                <Waypoints color='white' size={25} />
                <span className='text-md'>Taux de reproduction</span>
                <div className='flex items-center gap-1 py-1 px-2 rounded-md bg-white'>
                    <ChevronsUp size={25} color='green' strokeWidth={2} />
                    <span className='text-green-600 ml-2 font-semibold'>15%</span>
                </div>
            </div>
            <div className='p-2 rounded-lg bg-yellow-100 flex items-center justify-between gap-x-2'>
                <Target color='black' size={25} />
                <span className='text-md'>Taux de mortalité</span>
                <div className='flex items-center gap-1 py-1 px-2 rounded-md bg-white'>
                    <ChevronsDown size={25} color='red' strokeWidth={2} />
                    <span className='text-red-600 ml-2 font-semibold'>15%</span>
                </div>
            </div>
            <div className='p-2 rounded-lg bg-orange-300 flex items-center justify-between gap-x-2'>
                <Activity color='white' size={25} />
                <span className='text-md'>Rentabilité</span>
                <div className='flex items-center gap-1 py-1 px-2 rounded-md bg-white'>
                    <ChevronsUp size={25} color='green' strokeWidth={1} />
                    <span className='text-green-600 ml-2 font-semibold'>15%</span>
                </div>
            </div>
                <Button color="light">
                    <Webhook className='mr-2' />
                    Actualiser
                </Button>
        </div>
    )
}