"use client";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ResearchSection from "./components/ResearchSection";
import KeyboardSection from "./components/KeyboardSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import ScrollProgress from "./components/ScrollProgress";

const FireCrystals = dynamic(() => import("./components/FireCrystals"), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <FireCrystals />
      <div id="content">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          <KeyboardSection />
          <ContactSection />
        </main>
        <footer className="footer">
          <div className="container">
            <p>BE AI &amp; ML · Sahyadri College of Engineering &amp; Management · Built with 🔥 by <span>Pratham P N</span> · 2026</p>
          </div>
        </footer>
      </div>
    </>
  );
}