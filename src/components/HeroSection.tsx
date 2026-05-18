import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 px-4 sm:px-8">
      <div className="absolute inset-0 grid-bg z-0" />
      <div className="absolute inset-0 hero-blob z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 rounded-full tag-green font-mono text-xs tracking-widest uppercase mb-8 green-glow-sm">
            Military Geospatial Operational System
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] font-black mb-0 leading-none tracking-tight gradient-text">
            MGOS
          </h1>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-5 text-foreground/80 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          نظام المعلومات الجغرافية العملياتي العسكري
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          نظام جغرافي عملياتي عسكري متكامل يعتمد على نظم المعلومات الجغرافية GIS لإدارة العمليات العسكرية والاستخبارات والإمداد
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">SYSTEM ONLINE</span>
          </div>
          <span className="text-border">|</span>
          <span className="font-mono text-xs text-muted-foreground">MGOS.gdb — Phase 1</span>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
      >
        {[
          {
            num: "01",
            title: "Desktop GIS",
            desc: "File Geodatabase",
            sub: "MGOS.gdb",
            active: true,
          },
          {
            num: "02",
            title: "Enterprise GIS",
            desc: "PostgreSQL + PostGIS",
            sub: "GeoServer + React + Node.js",
            active: false,
          },
          {
            num: "03",
            title: "AI Platform",
            desc: "Operational Intelligence",
            sub: "Machine Learning + Drone Analytics",
            active: false,
          },
        ].map((phase, i) => (
          <div
            key={i}
            className={`relative bg-white rounded-2xl p-6 border-2 card-hover group overflow-hidden ${
              phase.active
                ? "border-primary green-glow"
                : "border-border"
            }`}
          >
            {phase.active && (
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  نشط
                </span>
              </div>
            )}
            <div className="font-mono text-4xl font-black text-primary/10 absolute bottom-3 left-4 select-none">
              {phase.num}
            </div>
            <div className="inline-block tag-green font-mono text-xs px-2 py-0.5 rounded mb-3">
              PHASE {phase.num}
            </div>
            <h3 className="text-lg font-black text-foreground mb-1">{phase.title}</h3>
            <p className="text-primary font-semibold text-sm mb-1">{phase.desc}</p>
            <p className="text-muted-foreground text-xs font-mono">{phase.sub}</p>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full section-divider" />
    </section>
  );
}
