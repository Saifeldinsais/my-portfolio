"use client";

import { useState } from "react";
import styles from "./Experience.module.css";
import { FaCertificate, FaChevronDown } from "react-icons/fa";

export default function Experience() {
  const [open, setOpen] = useState(false);

  const certificateUrl = "/experience/asurt-certificate.pdf"; // optional

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Experience</h2>
          <p className={styles.subtitle}>
            Hands-on engineering experience through competitive EV development.
          </p>
        </div>

        <button
          type="button"
          className={`${styles.card} ${open ? styles.cardOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div className={styles.accentLine} />

          {/* Always visible top section */}
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.logoWrap}>
                <img
                  className={styles.logo}
                  src="/experience/asurt-logo.png"
                  alt="ASU Racing Team logo"
                />
              </div>

              <div className={styles.meta}>
                <div className={styles.typeChip}>🏁 Team Experience</div>

                <h3 className={styles.role}>ASU Racing Team (ASURT)</h3>
                <p className={styles.org}>
                  Powertrain Subteam • <span className={styles.dim}>Dec 2024 – Present</span>
                </p>

                {!open && (
                  <p className={styles.brief}>
                    Developing an energy-efficient vehicle to compete in Shell Eco-marathon,
                    focusing on telemetry systems and auxiliary vehicle electronics.
                  </p>
                )}
              </div>
            </div>

            <span className={`${styles.chev} ${open ? styles.chevOpen : ""}`}>
              <FaChevronDown />
            </span>
          </div>

          {/* Expandable section */}
          <div className={`${styles.expand} ${open ? styles.expandOpen : ""}`}>
            <div className={styles.divider} />

            <div className={styles.block}>
              <h4 className={styles.blockTitle}>Team Goal</h4>
              <p className={styles.text}>
                ASURT designs and builds a high-efficiency vehicle to compete in the
                <b> Shell Eco-marathon</b> — an international competition where teams
                aim to maximize energy efficiency through innovation in powertrain,
                aerodynamics, and control systems.
              </p>
            </div>

            <div className={styles.grid2}>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Telemetry</h4>
                <p className={styles.text}>
                  Responsible for transmitting vehicle data internally (driver display)
                  and externally (team monitoring dashboard) to observe live vehicle
                  statistics and performance metrics.
                </p>
                <ul className={styles.list}>
                  <li>Real-time sensor data transmission</li>
                  <li>Driver display integration</li>
                  <li>External monitoring dashboard</li>
                </ul>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Auxiliary Systems</h4>
                <p className={styles.text}>
                  Designing and programming supporting vehicle electronics
                  necessary for safe and functional operation.
                </p>
                <ul className={styles.list}>
                  <li>Steering wheel input handling</li>
                  <li>Brake & throttle pedal logic</li>
                  <li>Wipers control system</li>
                  <li>Front & rear lighting systems</li>
                </ul>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                className={styles.primaryBtn}
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaCertificate /> View Certificate
              </a>
            </div>

            <p className={styles.hint}>
              Click again to collapse.
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}
