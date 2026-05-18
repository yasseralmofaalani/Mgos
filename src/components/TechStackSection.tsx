import React from "react";
import { motion } from "framer-motion";

const phases = [
  {
    num: "01",
    label: "المرحلة الأولى",
    en: "Phase 1 — Desktop GIS",
    header: "from-green-500 to-emerald-600",
    border: "border-green-200",
    bg: "bg-green-50",
    tag: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    stack: [
      { tech: "ArcGIS Desktop", role: "أداة GIS الرئيسية", role_en: "Primary GIS Tool" },
      { tech: "File Geodatabase", role: "قاعدة البيانات الجغرافية", role_en: "MGOS.gdb" },
    ],
  },
  {
    num: "02",
    label: "المرحلة الثانية",
    en: "Phase 2 — Enterprise GIS",
    header: "from-teal-500 to-cyan-600",
    border: "border-teal-200",
    bg: "bg-teal-50",
    tag: "bg-teal-100 text-teal-700",
    dot: "bg-teal-500",
    stack: [
      { tech: "PostgreSQL", role: "قاعدة البيانات", role_en: "Relational Database" },
      { tech: "PostGIS", role: "البيانات المكانية", role_en: "Spatial Extension" },
      { tech: "GeoServer", role: "نشر الخرائط", role_en: "Map Publishing" },
      { tech: "React", role: "الواجهة الأمامية", role_en: "Frontend Framework" },
      { tech: "Node.js", role: "الخادم الخلفي", role_en: "Backend Runtime" },
    ],
  },
  {
    num: "03",
    label: "المرحلة الثالثة",
    en: "Phase 3 — AI Platform",
    header: "from-emerald-600 to-green-800",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    tag: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-600",
    stack: [
      { tech: "AI Engine", role: "تحليل التهديدات", role_en: "Threat Analysis" },
      { tech: "ML Models", role: "التنبؤ العسكري", role_en: "Military Forecasting" },
      { tech: "Computer Vision", role: "تحليل الصور الجوية", role_en: "Aerial Analysis" },
      { tech: "Drone Analytics", role: "تحليل الطائرات المسيرة", role_en: "UAV Analytics" },
      { tech: "Real-time Engine", role: "التتبع اللحظي", role_en: "Real-time Tracking" },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section className="py-24 px-4 sm:px-8 relative">
      <div className="absolute inset-0 grid-bg-dense" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block tag-green font-mono text-xs tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full">
            Technology Stack — التقنيات
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            التقنيات <span className="gradient-text">المستخدمة</span>
          </h2>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-testid={`tech-phase-${i}`}
              className={`bg-white rounded-2xl border ${phase.border} overflow-hidden card-hover`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${phase.header}`} />
              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className={`font-mono text-xs px-3 py-1 rounded-full font-bold ${phase.tag}`}>
                      PHASE {phase.num}
                    </span>
                    <h3 className="text-xl font-black text-foreground mt-2">{phase.label}</h3>
                    <p className="font-mono text-xs text-muted-foreground">{phase.en}</p>
                  </div>
                  <span className="font-mono text-6xl font-black text-foreground/5 select-none">{phase.num}</span>
                </div>

                <div className="space-y-2">
                  {phase.stack.map((item, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.1 + j * 0.06 }}
                      className={`flex items-center justify-between p-3 rounded-xl ${phase.bg}`}
                    >
                      <div>
                        <p className="text-foreground font-bold text-sm">{item.role}</p>
                        <p className="text-muted-foreground text-xs font-mono">{item.role_en}</p>
                      </div>
                      <code className={`font-mono text-xs px-3 py-1.5 rounded-lg border font-bold ${phase.tag} ${phase.border} whitespace-nowrap`}>
                        {item.tech}
                      </code>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
