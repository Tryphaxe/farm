"use client";

import { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

export default function ClientLayout({ children }) {
    return (
        <>
            <NextTopLoader
                color="#562731"
                initialPosition={0.08}
                crawlSpeed={100}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease-in-out"
                speed={100}
                shadow="0 0 10px #FC515B,0 0 5px #FC515B"
                zIndex={1600}
                showAtBottom={false}
            />
            {children}
        </>
    )
}