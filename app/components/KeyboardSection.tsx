"use client";

// ── Keyboard layout data ─────────────────────────────────────────────────────
// Each key: { label, sub?, type: "skill" | "social" | "special", href? }
const ROWS = [
    // Row 1 — AI/ML core
    [
        { label: "TF", sub: "TensorFlow", type: "skill" },
        { label: "PyTorch", sub: "Deep Learning", type: "skill" },
        { label: "CV", sub: "OpenCV", type: "skill" },
        { label: "sklearn", sub: "scikit-learn", type: "skill" },
        { label: "Pandas", sub: "Data Frames", type: "skill" },
        { label: "NumPy", sub: "Arrays", type: "skill" },
        { label: "Keras", sub: "High-Level", type: "skill" },
        { label: "Jupyter", sub: "Notebooks", type: "skill" },
        { label: "PY", sub: "Python", type: "skill" },
        { label: "⌫", type: "special", wide: true },
    ],
    // Row 2 — Web + Dev tools
    [
        { label: "⇥", type: "special" },
        { label: "React", sub: "Library", type: "skill" },
        { label: "Next", sub: "Next.js", type: "skill" },
        { label: "Node", sub: "Node.js", type: "skill" },
        { label: "Mongo", sub: "MongoDB", type: "skill" },
        { label: "Docker", sub: "Containers", type: "skill" },
        { label: "GIT", sub: "Version Ctrl", type: "skill" },
        { label: "VS", sub: "VS Code", type: "skill" },
        { label: "C / Java", sub: "Languages", type: "skill" },
        { label: "Enter", type: "special", wide: true },
    ],
    // Row 3 — Social links + tools
    [
        { label: "⇪", type: "special" },
        { label: "GitHub", sub: "Profile", type: "social", href: "https://github.com", icon: "🐙" },
        { label: "LinkedIn", sub: "Connect", type: "social", href: "https://linkedin.com", icon: "💼" },
        { label: "Instagram", sub: "Follow", type: "social", href: "https://instagram.com", icon: "📸" },
        { label: "Mail", sub: "Email me", type: "social", href: "mailto:pratham@example.com", icon: "📧" },
        { label: "SQL", sub: "Database", type: "skill" },
        { label: "NLP", sub: "Text AI", type: "skill" },
        { label: "CNN", sub: "Vision AI", type: "skill" },
        { label: "⇪", type: "special" },
    ],
    // Row 4 — spacebar
    [
        { label: "Ctrl", type: "special" },
        { label: "⌘", type: "special" },
        { label: "Alt", type: "special" },
        { label: "AI & ML Student · Sahyadri College", type: "space" },
        { label: "Alt", type: "special" },
        { label: "◂", type: "special" },
        { label: "▴▾", type: "special" },
        { label: "▸", type: "special" },
    ],
] as const;

type KeyType = "skill" | "social" | "special" | "space";

interface KeyDef {
    label: string;
    sub?: string;
    type: KeyType;
    href?: string;
    icon?: string;
    wide?: boolean;
}

function Key({ k }: { k: KeyDef }) {
    const isSkill = k.type === "skill";
    const isSocial = k.type === "social";
    const isSpace = k.type === "space";
    const isSpecial = k.type === "special";

    const inner = (
        <div
            className={[
                "kbd-key",
                isSkill ? "kbd-skill" : "",
                isSocial ? "kbd-social" : "",
                isSpecial ? "kbd-special" : "",
                isSpace ? "kbd-space" : "",
                k.wide ? "kbd-wide" : "",
            ].join(" ")}
        >
            {isSocial && <span className="kbd-icon">{k.icon}</span>}
            <span className="kbd-label">{k.label}</span>
            {k.sub && <span className="kbd-sub">{k.sub}</span>}
        </div>
    );

    if (isSocial && k.href) {
        return (
            <a href={k.href} target="_blank" rel="noreferrer" className="kbd-anchor">
                {inner}
            </a>
        );
    }
    return inner;
}

export default function KeyboardSection() {
    return (
        <section className="section" id="keyboard">
            <div className="container">
                <span className="sec-eye">Interactive</span>
                <h2 className="sec-title">My Skills &amp; Links</h2>
                <p className="sec-sub">
                    Click any glowing key to open my social profiles. Hover skill keys to explore my stack.
                </p>

                <div className="kbd-wrapper">
                    <div className="kbd-body glass">
                        {/* LED strip */}
                        <div className="kbd-leds">
                            {["🔴", "🟡", "🟢"].map(c => <span key={c}>{c}</span>)}
                            <span className="kbd-brand">PRATHAM.DEV</span>
                        </div>

                        <div className="kbd-rows">
                            {(ROWS as readonly (readonly KeyDef[])[]).map((row, ri) => (
                                <div key={ri} className="kbd-row">
                                    {row.map((k, ki) => (
                                        <Key key={ki} k={k as KeyDef} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="kbd-hint">🔥 Orange = Skills &nbsp;|&nbsp; 💜 Purple = Social Links</p>
                </div>
            </div>
        </section>
    );
}
