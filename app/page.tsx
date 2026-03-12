"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FadeInSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale";
};

function FadeInSection({
  id,
  className = "",
  children,
  variant = "up",
}: FadeInSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      data-visible={visible}
      className={`transition-all duration-700 ease-out ${
        variant === "up"
          ? visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
          : variant === "left"
          ? visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-8"
          : variant === "right"
          ? visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-8"
          : visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      } ${className}`}
    >
      {children}
    </section>
  );
}

const projects = [
  {
    title: "Product Dashboard",
    description: "Data‑heavy SaaS dashboard with sharp typography and clear hierarchy.",
  },
  {
    title: "Mobile Banking",
    description: "Clean mobile flows focused on trust, clarity, and motion.",
  },
  {
    title: "Portfolio Concept",
    description: "Editorial, brutalist portfolio layout with strong grids.",
  },
  {
    title: "E‑commerce Redesign",
    description: "Conversion‑focused UI with bold visuals and intuitive filters.",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [navScrolled, setNavScrolled] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", "work", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 24);
      setScrollFactor(Math.min(1, y / 600));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 md:px-10 lg:px-20">
        {/* Top navigation */}
        <header
          className={`sticky top-4 z-20 mb-10 flex items-center justify-between rounded-full border border-zinc-800/60 px-5 py-3 text-xs md:text-sm tracking-[0.22em] uppercase backdrop-blur-sm transition-colors ${
            navScrolled ? "bg-black/80" : "bg-black/20"
          }`}
        >
          <span className="font-display text-lg tracking-[0.22em] text-zinc-200">
            Shivam&nbsp;Chowdhary
          </span>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8">
            {["work", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`relative pb-1 text-[0.7rem] font-medium tracking-[0.24em] transition-colors hover:text-yellow-400 ${
                  activeSection === item ? "text-yellow-400" : "text-zinc-400"
                }`}
              >
                <span className="relative z-10">
                  {item === "work"
                    ? "Work"
                    : item === "about"
                    ? "About"
                    : "Contact"}
                </span>
                <span
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center bg-yellow-400 transition-transform duration-200 ease-out ${
                    activeSection === item ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Mobile nav toggle */}
          <button
            type="button"
            className="relative flex h-8 w-9 items-center justify-center md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`absolute h-[2px] w-6 bg-zinc-200 transition-transform duration-200 ${
                isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-zinc-200 transition-opacity duration-150 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-zinc-200 transition-transform duration-200 ${
                isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>

          {/* Mobile nav menu */}
          {isMenuOpen && (
            <nav className="absolute inset-x-2 top-[110%] flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-black/95 px-4 py-3 text-[0.7rem] tracking-[0.24em] md:hidden">
              {["work", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center justify-between text-left transition-colors hover:text-yellow-400 ${
                    activeSection === item ? "text-yellow-400" : "text-zinc-300"
                  }`}
                >
                  <span>
                    {item === "work"
                      ? "Work"
                      : item === "about"
                      ? "About"
                      : "Contact"}
                  </span>
                  <span className="h-[1px] w-6 bg-zinc-700" />
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Hero section */}
        <FadeInSection
          id="hero"
          variant="up"
          className="relative mt-8 scroll-mt-32"
        >
          {/* Heading + description */}
          <div className="space-y-6 text-center">
            <h1 className="font-display text-[3.5rem] leading-[0.86] tracking-[0.3em] sm:text-[4.25rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[8.5rem] uppercase">
              UI/UX DESIGNER
            </h1>
            <div className="mx-auto max-w-xl space-y-3 text-sm md:text-base lg:text-lg leading-relaxed text-zinc-300">
              <p className="text-left md:text-center">
                Designing intuitive digital experiences where creativity meets
                functionality.
              </p>
              <p className="text-left md:text-center">
                I focus on building user-centered products through thoughtful
                design, research, and prototyping.
              </p>
            </div>
          </div>

          {/* Grid container + profile + shapes */}
          <div
            className="relative mt-10 overflow-visible"
            onMouseMove={(event) => {
              const rect = (
                event.currentTarget as HTMLDivElement
              ).getBoundingClientRect();
              const x =
                (event.clientX - rect.left - rect.width / 2) / rect.width;
              const y =
                (event.clientY - rect.top - rect.height / 2) / rect.height;
              setParallax({ x, y });
            }}
            onMouseLeave={() => setParallax({ x: 0, y: 0 })}
          >
            {/* Rounded grid background */}
            <div className="relative mx-auto h-[340px] w-full max-w-md rounded-[3.9rem] border border-zinc-700 bg-zinc-950/95 shadow-[0_40px_120px_rgba(0,0,0,0.85)] overflow-hidden sm:max-w-xl md:max-w-2xl">
              <div className="absolute inset-0 bg-zinc-100/5" />
              <div className="hero-grid-animate pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:40px_40px]" />

              {/* Text on grid */}
              <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 md:px-10 text-center">
                <div className="flex flex-col gap-1 text-[0.65rem] md:text-xs uppercase tracking-[0.25em] text-zinc-300">
                  <span>Selected ui/ux work · 2024 — 2026</span>
                  <span>Product · Web · Mobile · Branding</span>
                </div>
              </div>
            </div>

            {/* Circular profile photo */}
            <div
              className="float-soft absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 translate-y-14 overflow-hidden rounded-full border-[6px] border-black bg-zinc-900 sm:h-52 sm:w-52 md:h-56 md:w-56"
              style={{
                transform: `translate3d(calc(-50% + ${
                  parallax.x * -12
                }px), calc(56px + ${(parallax.y - scrollFactor * 0.6) * -14}px), 0)`,
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                className="object-cover grayscale"
              />
            </div>

            {/* Circular info badge (teal circle top-left) */}
            <div
              className="float-soft-delayed absolute left-[6%] top-[-22px] flex h-32 w-32 items-center justify-center rounded-full bg-teal-400 text-[0.6rem] font-semibold uppercase leading-relaxed text-black sm:left-[10%] md:top-[-30px]"
              style={{
                transform: `translate3d(${parallax.x * 10}px, ${
                  (parallax.y + scrollFactor * 0.8) * 8
                }px, 0)`,
              }}
            >
              <span className="text-center">
                UI/UX Designer
                <br />
                Based in Delhi
                <br />
                Design + Product Thinking
              </span>
            </div>

            {/* Orange rounded rectangle bottom-left */}
            <span
              className="float-soft-rotate pointer-events-none absolute left-[4%] bottom-[-34px] hidden h-16 w-44 items-center justify-center rounded-[1.9rem] bg-orange-500 rotate-[-20deg] shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 hover:scale-110 hover:rotate-[-15deg] hover:shadow-[0_0_25px_rgba(249,115,22,0.45)] sm:flex"
              style={{
                transform: `translate3d(${parallax.x * -20}px, calc(-34px + ${
                  (parallax.y - scrollFactor) * -12
                }px), 0) rotate(-20deg)`,
              }}
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-black">
                Design Systems
              </span>
            </span>

            {/* Pink rounded rectangle right side */}
            <span
              className="float-soft pointer-events-none absolute right-[-6%] top-[26%] hidden h-16 w-44 items-center justify-center rounded-[1.9rem] bg-pink-500 rotate-[18deg] shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 hover:scale-110 hover:rotate-[23deg] hover:shadow-[0_0_25px_rgba(236,72,153,0.45)] sm:flex md:right-[-4%]"
              style={{
                transform: `translate3d(${parallax.x * 14}px, ${
                  (parallax.y + scrollFactor * 0.4) * -14
                }px, 0) rotate(18deg)`,
              }}
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-black">
                Human First
              </span>
            </span>

            {/* Green circle bottom-right */}
            <span
              className="float-soft-delayed pointer-events-none absolute right-[6%] bottom-[-40px] hidden h-32 w-32 items-center justify-center rounded-full bg-lime-400 shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 hover:scale-110 hover:shadow-[0_0_25px_rgba(190,242,100,0.4)] sm:flex"
              style={{
                transform: `translate3d(${parallax.x * 12}px, calc(-40px + ${
                  (parallax.y - scrollFactor * 0.5) * -10
                }px), 0)`,
              }}
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-black text-center">
                Pixel Perfect
              </span>
            </span>

            {/* Teal circle with mantra upper-right */}
            <span
              className="float-soft pointer-events-none absolute right-[32%] top-[-36px] hidden h-24 w-24 items-center justify-center rounded-full bg-teal-400 shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 hover:scale-110 hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] sm:flex"
              style={{
                transform: `translate3d(${parallax.x * -10}px, calc(-36px + ${
                  (parallax.y + scrollFactor * 0.6) * 10
                }px), 0)`,
              }}
            >
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-black text-center">
                Think • Design • Iterate
              </span>
            </span>

            {/* Simplified shapes for mobile (keep behind container) */}
            <span className="float-soft pointer-events-none absolute left-[4%] bottom-[-24px] flex h-10 w-28 items-center justify-center rounded-[1.5rem] bg-orange-500 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-black sm:hidden">
              Design Systems
            </span>
            <span className="float-soft-delayed pointer-events-none absolute right-[6%] top-[-20px] flex h-10 w-28 items-center justify-center rounded-[1.5rem] bg-pink-500 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-black sm:hidden">
              Human First
            </span>
          </div>
        </FadeInSection>

        {/* My work section */}
        <FadeInSection
          id="work"
          variant="up"
          className="mt-32 border-t border-zinc-800 pt-14 scroll-mt-24"
        >
          <div className="mb-10 flex items-center gap-6">
            <div className="h-10 w-10 -ml-4 rotate-[-25deg] rounded-tr-[3rem] rounded-br-[3rem] bg-yellow-400" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.22em] uppercase">
              My Work
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 hover:-translate-y-3 hover:shadow-[0_18px_35px_rgba(0,0,0,0.55)]"
              >
                {/* Image placeholder */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-300 to-zinc-100 transition-transform duration-500 ease-out group-hover:scale-110" />
                </div>

                <div className="flex flex-1 flex-col justify-between px-5 py-5 space-y-3">
                  <div>
                    <h3 className="mb-1 text-lg font-semibold tracking-wide text-[#EDEDED]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {project.description}
                    </p>
                  </div>
                  <button className="mt-1 inline-flex items-center text-xs font-medium uppercase tracking-[0.18em] text-[#EDEDED] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                    View case study
                    <span className="ml-2 h-[1px] w-6 bg-[#EDEDED]" />
                  </button>
                </div>
                <div className="relative h-3 w-full overflow-hidden bg-yellow-400/30">
                  <span className="absolute inset-y-0 left-0 w-full origin-left bg-yellow-400 transition-transform duration-300 ease-out group-hover:scale-x-100 scale-x-0" />
                </div>
              </article>
            ))}
          </div>
        </FadeInSection>

        {/* About section */}
        <FadeInSection
          id="about"
          variant="left"
          className="mt-28 border-t border-zinc-800 pt-14 scroll-mt-24"
        >
          <div className="mb-8 flex items-center gap-4">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.22em] uppercase">
              About Me
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:items-start">
            {/* Portrait placeholder */}
            <div className="relative h-64 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#27272a,_#020617)]" />
              <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="relative flex h-full items-center justify-center text-xs uppercase tracking-[0.25em] text-zinc-400">
                Portrait / Illustration Placeholder
              </div>
            </div>

            {/* About text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="max-w-xl text-sm md:text-base text-zinc-300">
                  I&apos;m a UI/UX designer passionate about creating digital
                  experiences that are intuitive, functional, and visually
                  engaging.
                  <br />
                  <br />
                  My work focuses on understanding user problems and
                  transforming them into simple, effective design solutions. I
                  enjoy bridging the gap between design and development,
                  ensuring that ideas translate smoothly into real products.
                </p>
                <p className="max-w-xl text-sm md:text-base text-zinc-300">
                  I&apos;ve worked with communities and organizations like GDSC
                  and WIE IEEE, and gained industry experience as a technical
                  intern at Hestabit where I contributed to product design and
                  web interfaces.
                  <br />
                  <br />
                  I enjoy designing interfaces that not only look good but also
                  solve real problems.
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "UI Design",
                    "UX Research",
                    "Wireframing",
                    "Prototyping",
                    "Interaction Design",
                    "Figma",
                    "Photoshop",
                    "Lightroom",
                    "Product Thinking",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-200 transition-transform transition-opacity duration-500"
                      style={{
                        transitionDelay: `${[
                          "UI Design",
                          "UX Research",
                          "Wireframing",
                          "Prototyping",
                          "Interaction Design",
                          "Figma",
                          "Photoshop",
                          "Lightroom",
                          "Product Thinking",
                        ].indexOf(skill) * 60}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Experience */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                    Tools
                  </h3>
                  <ul className="space-y-1 text-sm text-zinc-300">
                    <li>Figma / FigJam</li>
                    <li>Adobe XD</li>
                    <li>Notion</li>
                    <li>Framer</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                    Experience
                  </h3>
                  <ul className="space-y-1 text-sm text-zinc-300">
                    <li>Freelance UI/UX Designer</li>
                    <li>Product design for early‑stage startups</li>
                    <li>Design systems & component libraries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Contact section */}
        <FadeInSection
          id="contact"
          variant="scale"
          className="mt-28 border-t border-zinc-800 pt-12 scroll-mt-24"
        >
          <div className="mb-8 space-y-3">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.22em] uppercase">
              Let&apos;s Work Together
            </h2>
            <p className="max-w-md text-sm md:text-base text-zinc-300">
              Have a project in mind or want to collaborate? Feel free to reach
              out.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
            {/* Contact form */}
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-[#EDEDED] outline-none transition-colors focus:border-yellow-400"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-[#EDEDED] outline-none transition-colors focus:border-yellow-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-[#EDEDED] outline-none transition-colors focus:border-yellow-400"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-transform transition-colors hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                Send Message
              </button>
            </form>

            {/* Social links */}
            <div className="space-y-4 md:pl-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Social
              </h3>
              <ul className="space-y-2 text-sm">
                {["LinkedIn", "Behance", "Dribbble", "GitHub"].map((social) => (
                  <li key={social}>
                    <button className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-yellow-400">
                      <span>{social}</span>
                      <span className="h-[1px] w-6 bg-zinc-600 transition-all duration-200 group-hover:w-10 group-hover:bg-yellow-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-900 pt-6 pb-4 text-xs text-zinc-500">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Shivam Choudhary — UI/UX Designer</span>
            <div className="flex gap-5 uppercase tracking-[0.2em]">
              <button
                onClick={() => handleNavClick("work")}
                className="text-zinc-500 transition-colors hover:text-yellow-400"
              >
                Work
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-zinc-500 transition-colors hover:text-yellow-400"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-zinc-500 transition-colors hover:text-yellow-400"
              >
                Contact
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
