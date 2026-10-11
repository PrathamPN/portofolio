"use client";
import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

export default function ResearchSection() {
    const ref = useScrollReveal();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="section" id="research" ref={ref}>
            <div className="container">
                <span className="sec-eye reveal">Academic Research</span>
                <h2 className="sec-title reveal delay-1">Research &amp; Publications</h2>
                <p className="sec-sub reveal delay-2">
                    Investigating intelligent agent architectures, decision systems, and autonomous behaviors.
                </p>

                <div className="research-spotlight glass reveal delay-3">
                    <div className="research-badge-row">
                        <span className="res-tag">📄 Research Paper</span>
                        <span className="res-tag-sub">AI &amp; Game Intelligence</span>
                    </div>

                    <h3 className="res-title">
                        NPC Behavior Analysis: Algorithmic Evolution in Game Artificial Intelligence
                    </h3>

                    <p className="res-excerpt">
                        A rigorous exploration into how modern Non-Player Character (NPC) decision-making paradigms
                        transitioned from rigid finite state machines to dynamic decision trees, utility theory,
                        and adaptive heuristic pathfinding algorithms in simulated virtual worlds.
                    </p>

                    <div className="res-highlights-grid">
                        <div className="res-pill-box">
                            <span className="res-pill-icon">🌲</span>
                            <div>
                                <strong>Decision Trees &amp; FSMs</strong>
                                <p>Hierarchical decision trees for deterministic and branching behavioral triggers.</p>
                            </div>
                        </div>
                        <div className="res-pill-box">
                            <span className="res-pill-icon">🗺️</span>
                            <div>
                                <strong>A* &amp; Dynamic Pathfinding</strong>
                                <p>Optimal heuristic graph navigation with real-time dynamic obstacle avoidance.</p>
                            </div>
                        </div>
                        <div className="res-pill-box">
                            <span className="res-pill-icon">⚖️</span>
                            <div>
                                <strong>Utility &amp; Game Theory</strong>
                                <p>Quantitative weighting of environmental stimuli to select non-scripted actions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="res-actions">
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="btn-fire"
                            style={{ cursor: "pointer" }}
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M12 4v16m8-8H4" />
                            </svg>
                            Read Research Abstract &amp; Takeaways
                        </button>
                        <a
                            href="https://github.com/PrathamPN"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost"
                        >
                            View Repository &amp; Code
                        </a>
                    </div>
                </div>

                {/* Modal for Research Paper Abstract */}
                {modalOpen && (
                    <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
                        <div className="modal-box glass" onClick={e => e.stopPropagation()}>
                            <div className="modal-head">
                                <div>
                                    <span className="res-tag">Research Study</span>
                                    <h3>NPC Behavior Analysis</h3>
                                </div>
                                <button
                                    type="button"
                                    className="modal-close"
                                    onClick={() => setModalOpen(false)}
                                    aria-label="Close modal"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="modal-body">
                                <h4>Abstract</h4>
                                <p>
                                    As virtual game environments become increasingly realistic, the demand for realistic,
                                    reactive Non-Player Characters (NPCs) has surpassed traditional script-based logic.
                                    This study models the transition from hard-coded Finite State Machines (FSMs) toward
                                    hierarchical behavior trees, fuzzy logic, and utility-based systems. We analyze algorithmic
                                    computational overhead vs. perceived intelligence under varying entity counts and latency
                                    constraints.
                                </p>

                                <h4>Key Methodologies Analyzed</h4>
                                <ul>
                                    <li><strong>Heuristic Traversal:</strong> Benchmark evaluation of A* vs. Dijkstra on varying topological grid densities.</li>
                                    <li><strong>Behavior Trees:</strong> Parallel composite node sequencing and decorator conditional evaluation.</li>
                                    <li><strong>Agent Perception Models:</strong> Sensory radius, field-of-view cones, and acoustic attenuation.</li>
                                </ul>

                                <h4>Conclusion &amp; Outlook</h4>
                                <p>
                                    Utility-based decision models deliver superior immersion and emergent behaviors with
                                    manageable computational overhead, laying the foundation for hybrid neural-symbolic
                                    game agents.
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn-fire"
                                    onClick={() => setModalOpen(false)}
                                    style={{ padding: "10px 24px", fontSize: 14 }}
                                >
                                    Close Abstract
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
