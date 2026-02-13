import Link from "next/link";
import { FaLinkedin, FaGithub, FaKaggle } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">Saif Sayes</Link>
        </div>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link href="#education">Education</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#experience">Experience</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>

        {/* Social Icons */}
        <div className={styles.socials}>
          <a 
            href="https://www.linkedin.com/in/saif-sais/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a 
            href="https://github.com/Saifeldinsais" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a 
            href="https://www.kaggle.com/saifsais" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaKaggle />
          </a>
        </div>

      </div>
    </nav>
  );
}
