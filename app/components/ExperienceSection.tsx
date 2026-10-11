"use client";
import { useScrollReveal } from "./useScrollReveal";

const EXPERIENCES = [
    {
        period: "2025 – 2026",
        role: "AI & Python Developer Intern",
        company: "Codeveda",
        type: "Internship",
        description:
            "Engineered Python automation scripts and machine learning workflows. Built data parsing pipelines, evaluated predictive models, and integrated backend services for production-ready tasks.",
        skills: ["Python", "Machine Learning", "Automation", "REST APIs", "Git"],
        icon: "💼",
    },
    {
        period: "2022 – 2026",
        role: "AI & ML Engineering Scholar & Project Lead",
        company: "Sahyadri College of Engineering & Management",
        type: "Academic & Research",
        description:
            "Spearheaded hands-on projects across computer vision, NLP, and intelligent agents. Authored research on game NPC behavioral decision architectures and built real-time computer vision 3D reconstruction prototypes.",
        skills: ["Computer Vision", "Deep Learning", "Game AI", "PyTorch", "Team Leadership"],
        icon: "🎓",
    },
];

export default function ExperienceSection() {
    const ref = useScrollReveal();

    return (
        <section className="section" id="experience" ref={ref}>
            <div className="container">
                <span className="sec-eye reveal">Career Path</span>
                <h2 className="sec-title reveal delay-1">Experience &amp; Leadership</h2>
                <p className="sec-sub reveal delay-2">
                    Industry experience, technical research, and academic leadership.
                </p>

                <div className="timeline-wrap reveal delay-3">
                    {EXPERIENCES.map((exp, idx) => (
                        <div key={exp.company} className="timeline-item">
                            <div className="timeline-marker">
                                <span className="timeline-icon">{exp.icon}</span>
                                {idx < EXPERIENCES.length - 1 && <div className="timeline-line" />}
                            </div>

                            <div className="timeline-card glass">
                                <div className="timeline-header">
                                    <div>
                                        <span className="timeline-badge">{exp.type}</span>
                                        <h3 className="timeline-role">{exp.role}</h3>
                                        <h4 className="timeline-company">{exp.company}</h4>
                                    </div>
                                    <span className="timeline-period">{exp.period}</span>
                                </div>

                                <p className="timeline-desc">{exp.description}</p>

                                <div className="timeline-skills">
                                    {exp.skills.map(s => (
                                        <span key={s} className="s-chip">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
