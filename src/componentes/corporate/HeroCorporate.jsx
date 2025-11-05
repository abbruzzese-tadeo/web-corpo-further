"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function HeroCorporate() {
  const t = useTranslations("corporate.hero");
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A1628] text-white"
    >
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/corporate-hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
      >
        <source src="/videos/corporate-hero.webm" type="video/webm" />
        <source src="/videos/corporate-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0C212D]/60 to-[#0A1628]/85 pointer-events-none" />

      {/* 🔆 Luces suaves */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[15%] w-[22rem] h-[22rem] bg-[radial-gradient(circle_at_center,rgba(255,100,50,0.4),transparent_70%)] blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.15, 0.35, 0.15] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[20%] right-[10%] w-[26rem] h-[26rem] bg-[radial-gradient(circle_at_center,rgba(238,114,3,0.45),transparent_70%)] blur-[120px]"
      />

      {/* 🧠 Contenido principal */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-start text-left px-8 md:px-20 max-w-5xl"
      >
        {/* 🔸 Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg px-5 py-2 shadow-[0_0_30px_rgba(255,255,255,0.08)] mb-6 animate-float-slow"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816] opacity-70 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816]" />
          </span>
          <span className="text-sm font-medium text-white/90 tracking-wide">
            {t("badge")}
          </span>
        </motion.div>

        {/* 🧱 Título */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          {t("title.prefix")}{" "}
          <span className="relative inline">
            <span className="bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              {t("title.highlight")}
            </span>
            <span className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-r from-[#EE7203]/60 via-[#FF3816]/60 to-[#EE7203]/60 -z-10"></span>
          </span>
        </motion.h1>

        {/* 💬 Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="mt-7 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed backdrop-blur-[2px]"
        >
          {t("description")}
        </motion.p>

        {/* 🚀 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={() => {
              const el = document.getElementById("contacto");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#EE7203] to-[#FF3816] shadow-[0_0_25px_rgba(238,114,3,0.3)] hover:shadow-[0_0_45px_rgba(238,114,3,0.6)] transition-all overflow-hidden backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center gap-3">
              <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              {t("cta")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </motion.div>

      <ParallaxGlow />
    </section>
  );
}

/* ✨ Parallax reactivo */
function ParallaxGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });

  const rotateX = useTransform(mouseY, [0, viewport.height], [15, -15]);
  const rotateY = useTransform(mouseX, [0, viewport.width], [-15, 15]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("resize", update);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <motion.div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_80%)] blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}

/* 🎨 Animación gradiente */
const styles = `
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
}
`;
