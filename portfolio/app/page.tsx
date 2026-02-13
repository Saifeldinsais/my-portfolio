import Navbar from "@/components/Navbar/Navbar";
import Home from "@/components/Home/Home";
import Education from "@/components/Education/Education";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <Home />
      <Education />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
