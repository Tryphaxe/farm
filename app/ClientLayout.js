"use client";

import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

export default function ClientLayout({children}) {

    useEffect(() => {
        const handleRefresh = () => {
            NextTopLoader.start();
        };
        window.addEventListener('beforeunload', handleRefresh);

        return () => {
            window.removeEventListener('beforeunload', handleRefresh)
        };
    }, []);

    return (
        <>
            <NextTopLoader
                color="#ff6600"
                initialPosition={0.08}
                crawlSpeed={100}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease-in-out"
                speed={100}
                shadow="0 0 10px #ff9677,0 0 5px #ff9677"
                zIndex={1600}
                showAtBottom={false}
            />
            {children}
        </>
    )
}