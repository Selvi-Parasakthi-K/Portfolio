import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Selvi Parasakthi K | Software Engineer</title>

        <meta
          name="description"
          content="Selvi Parasakthi K is a Software Engineer specializing in Frontend Development with React, Angular, and modern web technologies."
        />

        <meta property="og:title" content="Selvi Parasakthi K" />

        <meta
          property="og:description"
          content="Software Engineer specializing in modern web development with React and Angular, focused on building scalable, high-performance applications with clean UI and user-centric design."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://selviparasakthi.netlify.app/"
        />

        <meta property="og:image" content="/selvi.jpeg" />
      </Helmet>

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
