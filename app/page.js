"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/pages/home');
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-white w-full">
      <div className="flex flex-col flex-wrap items-center gap-3">
      <Image
        src="/favicon.png"  // Chemin relatif depuis "public/"
        alt="Description de l'image"
        width={150}  // Largeur en pixels
        height={150} // Hauteur en pixels
      />
        <span className='text-gray-800 mt-1 font-bold text-4xl'>Ferme admin</span>
        <div className="grid gap-3">
          <div className="flex items-center justify-center">
          <i className="fa-solid fa-spinner fa-spin-pulse text-2xl text-[#ff9011]"></i>
          </div>
        </div>
      </div>
    </div>
  );
}