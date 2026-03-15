import Header from "../components/header/Header";
import Home from "../components/home/Home";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Experience from "../components/Experience/Experience";
import Contact from "../components/Contact/Contact";
import ScrollIndicator from "../components/common/Scrollindicator";

export default function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <ScrollIndicator />
    </>
  );
}
