
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Heart,
  Menu,
  Moon,
  Sun,
  Trophy,
  Users,
  X,
} from "lucide-react";
import styles from "./App.module.css";

const images = {
  hero: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=85",
  sports: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=80",
  library: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
};

const links = [
  { label: "Our story", href: "#story" },
  { label: "Learning", href: "#learning" },
  { label: "Campus life", href: "#campus" },
  { label: "Admissions", href: "#admissions" },
];

const programmes = [
  {
    number: "01",
    title: "Academic excellence",
    description:
      "Encourage curiosity, independent thinking and a lifelong love of learning.",
    Icon: BookOpen,
  },
  {
    number: "02",
    title: "Sport and movement",
    description:
      "Build teamwork, discipline and resilience through participation and play.",
    Icon: Trophy,
  },
  {
    number: "03",
    title: "Care and community",
    description:
      "Create a supportive environment where every learner can contribute.",
    Icon: Heart,
  },
];

function Reveal({ children, delay = 0, className }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = (event) => {
      setHovering(Boolean(event.target.closest("a, button")));
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", enter);
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", enter);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className={styles.customCursor}
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.6 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}

function Brand() {
  return (
    <a className={styles.brand} href="#top" aria-label="Tulas home">
      <span className={styles.brandMark}>T<span>.</span></span>
      <span className={styles.brandText}>
        <strong>TULAS</strong>
        <small>INTERNATIONAL SCHOOL</small>
      </span>
    </a>
  );
}

function Header({ dark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={styles.header}>
      <Brand />

      <nav
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a
            href={link.href}
            key={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          className={styles.mobileEnquire}
          href="#admissions"
          onClick={() => setMenuOpen(false)}
        >
          Enquire now <ArrowUpRight size={16} />
        </a>
      </nav>

      <div className={styles.headerActions}>
        <button
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a
          className={`${styles.button} ${styles.buttonDark} ${styles.desktopEnquire}`}
          href="#admissions"
        >
          Enquire now <ArrowUpRight size={16} />
        </a>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.dot} />
          DEHRADUN, INDIA
          <span className={styles.eyebrowRule} />
          LEARN · LIVE · LEAD
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          A place to <em>grow.</em>
          <br />
          A future to <span className={styles.highlight}>shape.</span>
        </motion.h1>

        <motion.p
          className={styles.heroDescription}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          Discover a school experience that encourages curious minds,
          confident voices and compassionate leaders.
        </motion.p>

        <div className={styles.heroActions}>
          <a
            className={`${styles.button} ${styles.buttonDark}`}
            href="#story"
          >
            Discover Tulas <ArrowUpRight size={17} />
          </a>
          <a className={styles.textLink} href="#learning">
            Explore learning <ArrowDownRight size={17} />
          </a>
        </div>

        <div className={styles.heroNote}>
          <div className={styles.avatarStack} aria-hidden="true">
            <span>✦</span><span>学</span><span>◎</span>
          </div>
          <p>
            <strong>Learning for life</strong>
            <br />
            Knowledge. Character. Community.
          </p>
        </div>
      </div>

      <motion.div
        className={styles.heroVisual}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={images.hero}
          alt="School building and learning environment"
          fetchPriority="high"
        />
        <div className={styles.imageShade} />
        <div className={styles.imageCaption}>
          <span>THE TULAS EXPERIENCE</span>
          <strong>More than a school.<br />A world of possibility.</strong>
        </div>
        <div className={styles.seal}>
          <span>THE MODERN</span>
          <strong>GURUKUL</strong>
          <span>LEARN · LIVE · LEAD</span>
        </div>
      </motion.div>

      <div className={styles.heroFooter}>
        <span>01 — INTRODUCTION</span>
        <a href="#story">SCROLL TO EXPLORE ↓</a>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className={`${styles.section} ${styles.story}`} id="story">
      <Reveal>
        <div className={styles.eyebrow}>
          <span className={styles.dot} /> OUR PHILOSOPHY
        </div>
        <h2>Rooted in values.<br /><em>Ready for the world.</em></h2>
      </Reveal>

      <Reveal delay={0.12} className={styles.storyCopy}>
        <p className={styles.lead}>
          Education is about more than what happens in a classroom.
        </p>
        <p>
          Learning is an opportunity to build knowledge, character and
          confidence. We encourage learners to explore their strengths,
          ask questions and grow into thoughtful members of the world.
        </p>
        <a
          className={styles.textLink}
          href="https://tis.edu.in/"
          target="_blank"
          rel="noreferrer"
        >
          Explore the official website <ArrowUpRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}

function Values() {
  const items = [
    { title: "Learn", subtitle: "With curiosity", detail: "Explore new ideas." },
    { title: "Grow", subtitle: "With confidence", detail: "Discover your strengths." },
    { title: "Lead", subtitle: "With empathy", detail: "Make a difference." },
    { title: "Thrive", subtitle: "Together", detail: "Belong to a community." },
  ];

  return (
    <section className={styles.valuesSection} aria-label="Learning values">
      <div className={styles.valuesGrid}>
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.07} className={styles.value}>
            <strong>{item.title}<span>.</span></strong>
            <p>{item.subtitle}</p>
            <small>{item.detail}</small>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className={styles.section} id="learning">
      <Reveal className={styles.sectionHeading}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.dot} /> THE TULAS DIFFERENCE
          </div>
          <h2>Every learner has<br /><em>a spark. Help it shine.</em></h2>
        </div>
        <p>
          Learning beyond textbooks — developing capable minds, strong
          character and a lifelong love of discovery.
        </p>
      </Reveal>

      <div className={styles.programmeGrid}>
        {programmes.map(({ number, title, description, Icon }, index) => (
          <Reveal
            key={number}
            delay={index * 0.08}
            className={styles.programmeCard}
          >
            <div className={styles.cardTop}>
              <span>{number} / 03</span>
              <Icon size={23} strokeWidth={1.5} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="#admissions" aria-label={`Enquire about ${title}`}>
              <ArrowUpRight size={18} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Campus() {
  const cards = [
    {
      image: images.sports,
      alt: "Outdoor sports and physical activity",
      number: "01 — MOVE",
      title: <>Strength in<br />every stride.</>,
      text: "Sport, teamwork and resilience.",
      className: styles.campusLarge,
    },
    {
      image: images.library,
      alt: "Books in a library",
      number: "02 — DISCOVER",
      title: <>Curiosity has<br />no finish line.</>,
      text: "Space to explore new ideas.",
      className: styles.campusSmall,
    },
    {
      image: images.classroom,
      alt: "Students learning together in a classroom",
      number: "03 — BELONG",
      title: <>Better, together.</>,
      text: "A community where every voice matters.",
      className: styles.campusWide,
    },
  ];

  return (
    <section className={styles.campusSection} id="campus">
      <Reveal className={styles.campusHeading}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} /> LIFE AT TULAS
        </div>
        <h2>Find your thing.<br /><em>Discover what’s possible.</em></h2>
      </Reveal>

      <div className={styles.campusGrid}>
        {cards.map((card, index) => (
          <Reveal
            key={card.number}
            delay={index * 0.08}
            className={`${styles.campusCard} ${card.className}`}
          >
            <img src={card.image} alt={card.alt} loading="lazy" />
            <div className={styles.campusShade} />
            <div className={styles.campusCaption}>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section className={styles.admissionsSection} id="admissions">
      <Reveal className={styles.admissionsCard}>
        <div className={styles.admissionsCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} /> YOUR NEXT CHAPTER
          </div>
          <h2>Big futures<br />start <em>somewhere.</em></h2>
          <p>
            Discover whether Tulas is the right place for your child to
            learn, grow and thrive.
          </p>
          <a
            className={`${styles.button} ${styles.buttonLight}`}
            href="https://tis.edu.in/"
            target="_blank"
            rel="noreferrer"
          >
            Visit official website <ArrowUpRight size={17} />
          </a>
        </div>

        <aside className={styles.admissionsAside}>
          <Users size={34} strokeWidth={1.4} />
          <span>TAKE THE FIRST STEP</span>
          <strong>Curiosity today.<br />Possibility tomorrow.</strong>
          <a
            href="https://tis.edu.in/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more <ArrowRight size={15} />
          </a>
        </aside>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <Brand />
        <p>Learning with purpose.<br />Growing with values.</p>
        <div className={styles.contact}>
          <span>OFFICIAL WEBSITE</span>
          <a href="https://tis.edu.in/" target="_blank" rel="noreferrer">
            tis.edu.in <ArrowUpRight size={14} />
          </a>
          <span>LOCATION</span>
          <p>Dehradun, Uttarakhand, India</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Tulas International School concept</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className={styles.app}>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: progress }}
      />
      <CustomCursor />

      <div className={styles.pageWidth}>
        <Header dark={dark} toggleTheme={() => setDark((value) => !value)} />
        <main>
          <Hero />
          <div className={styles.marquee} aria-label="School values">
            <div className={styles.marqueeTrack}>
              {Array.from({ length: 2 }).map((_, index) => (
                <span key={index}>
                  Curiosity <b>✳</b> Character <b>✳</b> Creativity <b>✳</b>
                  Courage <b>✳</b> Community <b>✳</b>
                </span>
              ))}
            </div>
          </div>
          <Story />
          <Values />
          <Learning />
          <Campus />
          <Admissions />
        </main>
        <Footer />
      </div>
    </div>
  );
}
