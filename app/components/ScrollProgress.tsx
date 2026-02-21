"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function update() {
            const doc = document.documentElement;
            const scrolled = window.scrollY;
            const total = doc.scrollHeight - doc.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        }
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div
            id="scroll-progress"
            style={{ width: `${progress}%` }}
        />
    );
}
