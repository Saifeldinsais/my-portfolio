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

/* ─── Particle config ─── */
const PARTICLE_COUNT = 80;
const COLORS = [
    "rgba(30, 64, 175, ",   // blue-800
    "rgba(59, 130, 246, ",  // blue-500
    "rgba(37, 99, 235, ",   // blue-600
    "rgba(29, 78, 216, ",   // blue-700
    "rgba(96, 165, 250, ",  // blue-400
    "rgba(30, 58, 138, ",   // blue-900
];

interface Particle {
    x: number;
    y: number;
    r: number;         // radius
    vx: number;        // horizontal sway speed
    vy: number;        // upward drift speed
    alpha: number;
    color: string;
    phase: number;     // random phase for sine sway
}

function createParticle(w: number, h: number): Particle {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.08),
        alpha: Math.random() * 0.5 + 0.15,
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

    // ✅ remount flash layer whenever active section changes (replays animation)
    useEffect(() => {
        setFlashKey((k) => k + 1);
    }, [active]);

    /* ─── Canvas particle system ─── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Create particle pool
        let particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
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
            time += 0.008;

            for (const p of particles) {
                // Drift
                p.x += p.vx + Math.sin(time + p.phase) * 0.12;
                p.y += p.vy;

                // Wrap around edges
                if (p.y < -10) {
                    p.y = h + 10;
                    p.x = Math.random() * w;
                }
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;

                // Twinkle effect
                const twinkle = 0.7 + 0.3 * Math.sin(time * 1.5 + p.phase);
                const a = p.alpha * twinkle;

                // Draw glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = p.color + (a * 0.25).toFixed(3) + ")";
                ctx.fill();

                // Draw core dot
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
