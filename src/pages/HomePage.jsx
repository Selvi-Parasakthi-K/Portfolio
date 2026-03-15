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
        <title>Selvi Parasakthi | Frontend Developer</title>

        <meta
          name="description"
          content="Selvi Parasakthi is a Frontend Developer specializing in React, Angular, Tailwind CSS, and modern web applications."
        />

        <meta
          name="keywords"
          content="Selvi Parasakthi, Frontend Developer, React Developer, Angular Developer, Shopify Developer"
        />

        <meta name="author" content="Selvi Parasakthi" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Selvi Parasakthi | Frontend Developer"
        />
        <meta
          property="og:description"
          content="Portfolio of Selvi Parasakthi showcasing projects, skills, and experience."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://selviparasakthi.netlify.app" />
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
