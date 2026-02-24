"use client";

import dynamic from "next/dynamic";

const GeneratePdfContent = dynamic(() => import("./generate-content"), {
    ssr: false,
    loading: () => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                color: "#a78bfa",
                fontFamily: "sans-serif",
                backgroundColor: "#0a0a0a",
            }}
        >
            Loading...
        </div>
    ),
});

export default function GeneratePdfPage() {
    return <GeneratePdfContent />;
}
