"use client";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "./useScrollReveal";

const ROLES = [
    "BE AI & ML Student",
    "Machine Learning Engineer",
    "Deep Learning Explorer",
    "Full-Stack Developer",
];

function useTyping(words: string[], speed = 80, pause = 1800) {
    const [display, setDisplay] = useState("");
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[wordIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < word.length) {
            timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
        } else if (!deleting && charIdx === word.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
        } else if (deleting && charIdx === 0) {
            setDeleting(false);
            setWordIdx(i => (i + 1) % words.length);
        }

        setDisplay(word.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, wordIdx, words, speed, pause]);

    return display;
}

// Animated counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let start = 0;
                const step = () => {
                    start += Math.ceil(target / 40);
                    if (start >= target) { setVal(target); return; }
                    setVal(start);
                    requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{val}{suffix}</span>;
}

export default function HeroSection() {
    const role = useTyping(ROLES);
    const ref = useScrollReveal();

    return (
        <section className="hero section" id="home">
            <div className="container" ref={ref}>
                <div style={{ maxWidth: 700 }}>
                    <div className="hero-badge reveal">
                        <span className="badge-dot" />
                        Open to internships &amp; collaborations
                    </div>

                    <h1 className="hero-name reveal delay-1">
                        Hi, I&apos;m<br />
                        <span className="grad">Pratham P N</span>
                    </h1>

                    <p className="hero-role reveal delay-2">
                        {role}<span className="cursor" />
                    </p>

                    <p className="hero-desc reveal delay-3">
                        A passionate AI &amp; ML engineering student who loves building intelligent systems —
                        from deep learning models and computer vision to full-stack web apps.
                        I create solutions that are both smart and impactful.
                    </p>

                    <div className="hero-btns reveal delay-4">
                        <a href="#projects" className="btn-fire">
                            View My Work
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#contact" className="btn-ghost">Get in Touch</a>
                    </div>

                    <div className="hero-stats reveal delay-4">
                        {[
                            { target: 8, suffix: "+", label: "Projects" },
                            { target: 3, suffix: "rd", label: "Year BE" },
                            { target: 5, suffix: "+", label: "Tech Stacks" },
                        ].map(s => (
                            <div key={s.label}>
                                <span className="stat-num">
                                    <Counter target={s.target} suffix={s.suffix} />
                                </span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
