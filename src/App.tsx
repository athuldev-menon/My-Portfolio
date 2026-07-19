import myAvatar from "./assets/Avatar12.png";
import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Global Styles Injection Component to handle fonts and body background safely
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
      
      html, body, #root {
        background-color: #0C0C0C;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Kanit', sans-serif;
        color: #D7E2EA;
        overflow-x: hidden;
      }

      .hero-heading {
        background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
      
      /* Hide scrollbar for a cleaner look */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #0C0C0C;
      }
      ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// Magnetic Hover Effect Component
interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({ children, padding = 150, strength = 3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Check if within padding area
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    if (distance < width / 2 + padding) {
      setIsActive(true);
      setPosition({ x: distanceX / strength, y: distanceY / strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// Fade-In Wrapper
const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll-driven Character Animation
const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => {
            const charTotalIdx = words.slice(0, wordIdx).join('').length + charIdx;
            const totalChars = text.replace(/\s/g, '').length;
            const start = charTotalIdx / totalChars;
            const end = start + (1 / totalChars);

            // Opacity map based on scroll
            const opacity = useTransform(smoothProgress, [start, end], [0.2, 1]);

            return (
              <span key={charIdx} className="relative inline-block">
                <span className="invisible">{char}</span>
                <motion.span style={{ opacity }} className="absolute top-0 left-0">
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

const ContactButton = ({ label = "Contact Me" }) => (
  <button
    className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform duration-300"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, 0 0 0 2px white',
      outlineOffset: '-3px'
    }}
  >
    {label}
  </button>
);

const LiveProjectButton = ({ href, label = "Live Project" }: { href: string, label?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-300 whitespace-nowrap"
  >
    {label}
  </a>
);

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex flex-col relative overflow-hidden">
      <FadeIn delay={0} y={-20} className="w-full">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-70 transition-opacity duration-200">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center w-full px-6 md:px-10 z-20 pointer-events-none mt-6 sm:mt-4 md:-mt-5">
        <div className="overflow-hidden w-full">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[10vw] sm:text-[11vw] md:text-[11.5vw] lg:text-[12vw]">
              Hi, i'm athuldev
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            A Cyber Security student driven by crafting secure & unforgettable web projects.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="pointer-events-auto">
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet Effect */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <Magnet padding={120} strength={4}>
          <img
            src={myAvatar}
            alt="Athuldev Hero Portrait"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </Magnet>
      </FadeIn>
    </section>
  );
};

const MarqueeSection = () => {
  const images = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const row1 = [...images.slice(0, 11), ...images.slice(0, 11), ...images.slice(0, 11)];
  const row2 = [...images.slice(11), ...images.slice(11), ...images.slice(11)];

  const { scrollY } = useScroll();

  // Transform scroll into horizontal movement
  const x1 = useTransform(scrollY, [0, 3000], [0, -1000]);
  const x2 = useTransform(scrollY, [0, 3000], [-500, 500]);

  const smoothX1 = useSpring(x1, { stiffness: 50, damping: 20 });
  const smoothX2 = useSpring(x2, { stiffness: 50, damping: 20 });

  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      <motion.div style={{ x: smoothX1, willChange: 'transform' }} className="flex gap-3 w-max">
        {row1.map((src, i) => (
          <img key={`r1-${i}`} src={src} alt="tech abstract" className="w-[420px] h-[270px] rounded-2xl object-cover opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
        ))}
      </motion.div>
      <motion.div style={{ x: smoothX2, willChange: 'transform' }} className="flex gap-3 w-max">
        {row2.map((src, i) => (
          <img key={`r2-${i}`} src={src} alt="tech abstract" className="w-[420px] h-[270px] rounded-2xl object-cover opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
        ))}
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Corner Decorative Elements */}
      <FadeIn delay={0.1} x={-80} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="moon icon" className="w-full drop-shadow-lg" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3d object" className="w-full drop-shadow-lg" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="lego icon" className="w-full drop-shadow-lg" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3d group" className="w-full drop-shadow-lg" />
      </FadeIn>

      <div className="z-10 flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16 text-center max-w-[560px] flex flex-col items-center">
          <AnimatedText
            text="With hands-on experience in web development, machine learning, and digital marketing, i focus on building secure, data-driven applications. i truly enjoy solving complex problems and working with tools like react, python, and google analytics to optimize performance. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />

          <div className="mt-16 sm:mt-20 md:mt-24">
            <ContactButton />
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { num: "01", title: "Web Development", desc: "Designing clean, modern, and conversion-focused web applications using React, Node.js, and modern frontend frameworks tailored to specific needs." },
    { num: "02", title: "Cybersecurity", desc: "Implementing secure web architectures, conducting vulnerability assessments, and leveraging ethical hacking practices to build robust systems." },
    { num: "03", title: "Machine Learning", desc: "Building predictive models, hyperparameter tuning, and analyzing datasets using Python, Pandas, and Scikit-learn to extract insights." },
    { num: "04", title: "Data Analysis", desc: "Performing exploratory data analysis and generating dynamic visual reports to communicate complex metrics to stakeholders clearly." },
    { num: "05", title: "Digital Marketing", desc: "Executing technical SEO audits, tracking website metrics with GA4, and optimizing digital content for better search engine visibility." }
  ];

  return (
    <section id="skills" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20 relative">
      <h2 className="font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Services
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((srv, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} y={20}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-0 gap-6 sm:gap-10">
              <span className="font-black leading-none text-[clamp(3rem,10vw,140px)]">
                {srv.num}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">
                  {srv.title}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                  {srv.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projects = [
    {
      num: "01",
      tag: "Cybersecurity / DevOps",
      title: "Laksh Honeypot",
      link: "https://github.com/athuldev-menon/laksh",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
      ]
    },
    {
      num: "02",
      tag: "Full-Stack Development",
      title: "BRUspot Platform",
      link: "https://github.com/athuldev-menon/BRUspot",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
      ]
    },
    {
      num: "03",
      tag: "Data Science & AI",
      title: "Python ML Models",
      link: "https://github.com/athuldev-menon/Python-with-ML",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
      ]
    }
  ];

  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-30 relative px-5 sm:px-8 md:px-10 py-24 md:py-32">
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-20">
        Project
      </h2>

      {/* Scroll container that dictates height for the sticky stacking effect */}
      <div ref={containerRef} className="relative w-full max-w-7xl mx-auto pb-[40vh]" style={{ height: `${projects.length * 90}vh` }}>
        {projects.map((proj, idx) => {
          // Dynamic scale based on scroll progress and card index
          const targetScale = 1 - (projects.length - 1 - idx) * 0.03;

          // Calculate when this specific card should start scaling down
          const rangeStart = idx / projects.length;
          const rangeEnd = 1;

          const scale = useTransform(
            scrollYProgress,
            [rangeStart, rangeEnd],
            [1, targetScale]
          );

          const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

          return (
            <motion.div
              key={idx}
              className="sticky top-24 md:top-32 w-full origin-top"
              style={{
                scale: smoothScale,
                top: `calc(6rem + ${idx * 28}px)`
              }}
            >
              <div className="w-full bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 flex flex-col gap-6 shadow-2xl">

                {/* Card Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-6">
                    <span className="font-black text-[clamp(2.5rem,8vw,100px)] leading-none">
                      {proj.num}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="uppercase text-sm tracking-widest opacity-60">
                        {proj.tag}
                      </span>
                      <h3 className="uppercase font-medium text-2xl md:text-4xl">
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                  <LiveProjectButton href={proj.link} label="View Github" />
                </div>

                {/* Card Image Grid */}
                <div className="flex flex-col md:flex-row gap-4 h-full">
                  {/* Left Column (40%) */}
                  <div className="w-full md:w-[40%] flex flex-col gap-4">
                    <img
                      src={proj.images[0]}
                      alt={`${proj.title} view 1`}
                      className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] h-[clamp(130px,16vw,230px)] grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <img
                      src={proj.images[1]}
                      alt={`${proj.title} view 2`}
                      className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] h-[clamp(160px,22vw,340px)] grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  {/* Right Column (60%) */}
                  <div className="w-full md:w-[60%]">
                    <img
                      src={proj.images[2]}
                      alt={`${proj.title} main view`}
                      className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] min-h-[300px] grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyles />
      <main className="w-full bg-[#0C0C0C]">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />

        {/* Simple Footer */}
        <footer className="bg-[#0C0C0C] border-t border-[rgba(215,226,234,0.1)] py-10 text-center flex flex-col items-center justify-center gap-4 z-40 relative">
          <p className="uppercase text-sm tracking-widest text-[#D7E2EA] opacity-60 font-light">
            © 2026 Athuldev Menon. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
};

export default App;