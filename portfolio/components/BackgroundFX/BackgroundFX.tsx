"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BackgroundFX.module.css";

type SectionId = "home" | "education" | "projects" | "experience" | "contact";

const SECTION_ORDER: SectionId[] = ["home", "education", "projects", "experience", "contact"];

function getActiveSection(): SectionId {
    const entries = SECTION_ORDER
        .map((id) => {
            const el = document.getElementById(id);
            if (!el) return { id, score: -1 };
            const r = el.getBoundingClientRect();

            const targetY = window.innerHeight * 0.28;
            const dist = Math.abs(r.top - targetY);
            const visible = r.bottom > 120 && r.top < window.innerHeight - 120 ? 1 : 0;

            const score = visible ? 100000 - dist : -1;
            return { id, score };
        })
        .sort((a, b) => b.score - a.score);

    return (entries[0]?.id as SectionId) || "home";
}

/* ─────────────────────────────────────────────
   Particle + Cursor Interaction Config
   ───────────────────────────────────────────── */
const PARTICLE_COUNT = 70;
const CONNECT_DIST = 140;          // max distance to draw lines between particles
const CURSOR_CONNECT_DIST = 180;   // max distance to draw lines from cursor
const CURSOR_REPEL_DIST = 120;     // cursor repulsion radius
const CURSOR_REPEL_FORCE = 0.8;    // how strongly particles are pushed away

const COLORS = [
    "rgba(30, 64, 175, ",   // blue-800
    "rgba(59, 130, 246, ",  // blue-500
    "rgba(37, 99, 235, ",   // blue-600
    "rgba(29, 78, 216, ",   // blue-700
    "rgba(96, 165, 250, ",  // blue-400
    "rgba(30, 58, 138, ",   // blue-900
];

const LINE_COLOR = "rgba(59, 130, 246, ";  // blue-500 for lines

interface Particle {
    x: number;
    y: number;
    baseX: number;     // original position for soft return
    baseY: number;
    r: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    phase: number;
}

function createParticle(w: number, h: number): Particle {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const x = Math.random() * w;
    const y = Math.random() * h;
    return {
        x,
        y,
        baseX: x,
        baseY: y,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        color,
        phase: Math.random() * Math.PI * 2,
    };
}

export default function BackgroundFX() {
    const [active, setActive] = useState<SectionId>("home");
    const [flashKey, setFlashKey] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /* ─── Section tracking ─── */
    useEffect(() => {
        const onScroll = () => setActive(getActiveSection());
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // ✅ remount flash layer whenever active section changes
    useEffect(() => {
        setFlashKey((k) => k + 1);
    }, [active]);

    /* ─── Canvas particle system with cursor interaction ─── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Mouse tracking
        let mouseX = -9999;
        let mouseY = -9999;
        let mouseActive = false;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseActive = true;
        };
        const handleMouseLeave = () => {
            mouseActive = false;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        // Create particle pool
        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
            createParticle(w, h)
        );

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        let frameId: number;
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            time += 0.006;

            /* ── Update particles ── */
            for (const p of particles) {
                // Gentle ambient drift
                p.x += p.vx + Math.sin(time + p.phase) * 0.08;
                p.y += p.vy + Math.cos(time * 0.7 + p.phase) * 0.06;

                // Cursor repulsion
                if (mouseActive) {
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CURSOR_REPEL_DIST && dist > 0) {
                        const force = (1 - dist / CURSOR_REPEL_DIST) * CURSOR_REPEL_FORCE;
                        p.x += (dx / dist) * force;
                        p.y += (dy / dist) * force;
                    }
                }

                // Soft return to base position (keeps particles from drifting off-screen)
                p.x += (p.baseX - p.x) * 0.003;
                p.y += (p.baseY - p.y) * 0.003;

                // Wrap around edges
                if (p.x < -20) { p.x = w + 20; p.baseX = p.x; }
                if (p.x > w + 20) { p.x = -20; p.baseX = p.x; }
                if (p.y < -20) { p.y = h + 20; p.baseY = p.y; }
                if (p.y > h + 20) { p.y = -20; p.baseY = p.y; }
            }

            /* ── Draw constellation lines between nearby particles ── */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        const opacity = (1 - dist / CONNECT_DIST) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = LINE_COLOR + opacity.toFixed(3) + ")";
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            /* ── Draw cursor-to-particle lines ── */
            if (mouseActive) {
                for (const p of particles) {
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CURSOR_CONNECT_DIST) {
                        const opacity = (1 - dist / CURSOR_CONNECT_DIST) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(mouseX, mouseY);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = LINE_COLOR + opacity.toFixed(3) + ")";
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Draw cursor glow dot
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(96, 165, 250, 0.3)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(59, 130, 246, 0.08)";
                ctx.fill();
            }

            /* ── Draw particles ── */
            for (const p of particles) {
                const twinkle = 0.7 + 0.3 * Math.sin(time * 1.5 + p.phase);
                const a = p.alpha * twinkle;

                // Glow halo
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color + (a * 0.15).toFixed(3) + ")";
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + a.toFixed(3) + ")";
                ctx.fill();
            }

            frameId = requestAnimationFrame(draw);
        };

        frameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const themeClass = useMemo(() => {
        switch (active) {
            case "home":
                return styles.home;
            case "education":
                return styles.education;
            case "projects":
                return styles.projects;
            case "experience":
                return styles.experience;
            case "contact":
                return styles.contact;
            default:
                return styles.home;
        }
    }, [active]);

    return (
        <>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
            <div className={`${styles.bg} ${themeClass}`} aria-hidden="true" />
            <div className={`${styles.overlay} ${themeClass}`} aria-hidden="true" />
            <div key={flashKey} className={`${styles.flash} ${themeClass}`} aria-hidden="true" />
        </>
    );
}
