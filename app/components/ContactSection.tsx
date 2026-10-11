"use client";
import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

export default function ContactSection() {
    const ref = useScrollReveal();
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Format direct mailto or submit
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );

        setTimeout(() => {
            setStatus("success");
            // Open user's mail client prefilled as backup
            window.location.href = `mailto:prathampn0@gmail.com?subject=${subject}&body=${body}`;
        }, 600);
    };

    return (
        <section className="section" id="contact" ref={ref}>
            <div className="container">
                <div className="contact-center">
                    <span className="sec-eye reveal">Get In Touch</span>
                    <h2 className="sec-title reveal delay-1">Let&apos;s build something 🔥</h2>
                    <p className="sec-sub reveal delay-2" style={{ margin: "0 auto 36px" }}>
                        Open to full-time roles, internships, and AI/ML collaborations. Drop me a line below!
                    </p>

                    <div className="contact-card glass reveal delay-3" style={{ maxWidth: 650, margin: "0 auto", textAlign: "left" }}>
                        {status === "success" ? (
                            <div style={{ textAlign: "center", padding: "30px 10px" }}>
                                <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
                                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
                                    Message Ready!
                                </h3>
                                <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 24 }}>
                                    Thank you, {formData.name}! Your default email client was opened to deliver your message to <strong>prathampn0@gmail.com</strong>.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStatus("idle");
                                        setFormData({ name: "", email: "", message: "" });
                                    }}
                                    className="btn-ghost"
                                    style={{ margin: "0 auto" }}
                                >
                                    Send Another Note
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        placeholder="e.g. John Doe"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        placeholder="Tell me about your project, idea, or role..."
                                        className="form-input"
                                        style={{ resize: "vertical" }}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="btn-fire"
                                    style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                                >
                                    {status === "submitting" ? "Sending..." : "Send Message"}
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>
                        )}

                        <div className="contact-divider">
                            <span>or connect directly</span>
                        </div>

                        <div className="contact-socials" style={{ marginTop: 0, justifyContent: "center" }}>
                            <a href="mailto:prathampn0@gmail.com" className="social-btn fire">
                                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Email
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                                </svg>
                                LinkedIn
                            </a>
                            <a href="https://github.com/PrathamPN" target="_blank" rel="noreferrer" className="social-btn">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
