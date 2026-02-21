"use client";
import { useScrollReveal } from "./useScrollReveal";

const TECH = [
    "🧠 TensorFlow", "🔥 PyTorch", "👁️ OpenCV", "📊 Pandas",
    "🔢 NumPy", "🤖 scikit-learn", "🐍 Python", "⚡ Keras",
    "🌐 React", "🚀 Next.js", "🟦 TypeScript", "🍃 MongoDB",
    "🐙 Git", "📓 Jupyter", "☕ Java", "🐋 Docker",
];

export default function SkillsSection() {
    const ref = useScrollReveal();

    return (
        <section className="section" id="skills" ref={ref}>
            <div className="container">
                <span className="sec-eye reveal">What I Know</span>
                <h2 className="sec-title reveal delay-1">Skills &amp; Stack</h2>
                <p className="sec-sub reveal delay-2">
                    Built through coursework, personal projects, and relentless curiosity.
                </p>
            </div>

            {/* ── Infinite marquee ticker ── */}
            <div className="marquee-outer reveal delay-3">
                <div className="marquee-track">
                    {/* double the list so the loop is seamless */}
                    {[...TECH, ...TECH].map((t, i) => (
                        <div key={i} className="marquee-pill">{t}</div>
                    ))}
                </div>
            </div>

            {/* ── Cards grid ── */}
            <div className="container">
                <div className="skills-grid" ref={ref}>
                    {[
                        { ico: "🧠", cls: "ico-f", name: "AI / ML", tags: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV"] },
                        { ico: "📊", cls: "ico-v", name: "Data Science", tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"] },
                        { ico: "🌐", cls: "ico-t", name: "Web Dev", tags: ["React", "Next.js", "Node.js", "MongoDB", "Firebase"] },
                        { ico: "🧮", cls: "ico-p", name: "Languages", tags: ["Python", "JavaScript", "TypeScript", "C", "Java"] },
                    ].map((s, i) => (
                        <div key={s.name} className={`skill-card glass reveal delay-${i + 1}`}>
                            <div className="skill-hd">
                                <div className={`skill-ico ${s.cls}`}>{s.ico}</div>
                                <span className="skill-nm">{s.name}</span>
                            </div>
                            <div className="tags">
                                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
