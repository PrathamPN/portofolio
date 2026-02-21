"use client";
import { useScrollReveal } from "./useScrollReveal";

export default function AboutSection() {
    const ref = useScrollReveal();

    return (
        <section className="section" id="about" ref={ref}>
            <div className="container">
                <div className="about-grid">
                    {/* Text */}
                    <div>
                        <span className="sec-eye reveal">About Me</span>
                        <h2 className="sec-title reveal delay-1">Turning ideas into<br />elegant software</h2>
                        <p className="sec-sub reveal delay-2">
                            I&apos;m a BE Artificial Intelligence &amp; Machine Learning student passionate about
                            building intelligent systems, deep learning models, and computer vision pipelines.
                            I love merging AI research with real-world engineering to create impactful solutions.
                        </p>

                        <div className="glass about-edu reveal delay-3" style={{ marginTop: 28, padding: 24 }}>
                            <span className="edu-pill">2022 – 2026</span>
                            <div className="edu-degree">Bachelor of Engineering — AI &amp; Machine Learning</div>
                            <div className="edu-school">Sahyadri College of Engineering &amp; Management · Mangalore</div>
                        </div>

                        <div className="chips reveal delay-4">
                            {["🧠 AI Researcher", "📊 Data Enthusiast", "🚀 Fast Learner", "🤝 Team Player"].map(t => (
                                <div key={t} className="chip">{t}</div>
                            ))}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="reveal-right" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="av-wrap">
                            <div className="av-card glass">
                                <span style={{ position: "relative", zIndex: 1, fontSize: 72 }}>👨‍💻</span>
                            </div>
                            <div className="fl-badge tr glass">⚡ Open to Work</div>
                            <div className="fl-badge bl glass">📍 India</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
