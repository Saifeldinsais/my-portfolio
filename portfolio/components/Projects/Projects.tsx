"use client";

import { useMemo, useState } from "react";
import styles from "./Projects.module.css";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

function uniqueTags(items: Project[]) {
  const set = new Set<string>();
  items.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export default function Projects() {
  const allTags = useMemo(() => uniqueTags(projects), []);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (selected.length === 0) return projects;
    return projects.filter((p) => selected.every((t) => p.tags.includes(t)));
  }, [selected]);

  function toggleTag(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearTags() {
    setSelected([]);
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Projects</h2>
            <p className={styles.subtitle}>
              Selected projects across ML, web, networking, databases, and embedded systems.
            </p>
          </div>

          <div className={styles.counter}>
            <span className={styles.counterLabel}>Showing</span>
            <span className={styles.counterValue}>{filtered.length}</span>
          </div>
        </div>

        {/* Tag Bar */}
        <div className={styles.tagRow}>
          <button
            className={`${styles.tag} ${selected.length === 0 ? styles.tagActive : ""}`}
            onClick={clearTags}
            type="button"
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${selected.includes(tag) ? styles.tagActive : ""}`}
              onClick={() => toggleTag(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}

          {selected.length > 0 && (
            <button className={styles.clearBtn} onClick={clearTags} type="button">
              Clear
            </button>
          )}
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {filtered.map((p) => (
            <article key={p.title} className={styles.card}>
              <div className={styles.imageWrap}>
                <img className={styles.image} src={p.imageUrl} alt={p.title} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>

                  <a
                    className={styles.github}
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} on GitHub`}
                  >
                    <FaGithub />
                  </a>
                </div>

                <p className={styles.desc}>{p.description}</p>

                <div className={styles.tagsInline}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.pill}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No projects match these tags. Try removing a filter.</p>
            <button className={styles.emptyBtn} onClick={clearTags} type="button">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
