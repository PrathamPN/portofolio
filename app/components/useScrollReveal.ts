"use client";
import { useEffect, useRef } from "react";

/**
 * Attach this to any element wrapper.
 * All children with class "reveal", "reveal-left", "reveal-right", "reveal-scale"
 * will animate in when they enter the viewport.
 */
export function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = Array.from(
            el.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale")
        );

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
        );

        targets.forEach((t) => obs.observe(t));
        return () => obs.disconnect();
    }, []);

    return ref;
}
