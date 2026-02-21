"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="container navbar-inner">
                <a href="#home" className="logo">P<em>.</em></a>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#keyboard">Keyboard</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact" className="nav-cta">Hire Me</a></li>
                </ul>
            </div>
        </nav>
    );
}
