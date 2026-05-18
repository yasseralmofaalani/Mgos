import React from "react";
import { motion } from "framer-motion";

const phases = [
  {
    num: "01",
    label: "المرحلة الأولى",
    en: "Phase 1 — Desktop GIS Foundation",
    accent: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    border: "border-green-200",
    tag: "bg-green-100 text-green-700 border-green-300",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    dotColor: "bg-green-500",
    tech: [
      { name: "ArcGIS Desktop", desc: "أداة GIS الرئيسية" },
      { name: "File Geodatabase", desc: "MGOS.gdb — قاعدة البيانات" },
    ],
  },
  {
    num: "02",
    label: "المرحلة الثانية",
    en: "Phase 2 — Enterprise GIS",
    accent: "from-teal-500 to-cyan-600",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    tag: "bg-teal-100 text-teal-700 border-teal-300",
    status: "PLANNED",
    statusColor: "bg-teal-100 text-teal-700",
    dotColor: "bg-teal-500",
    tech: [
      { name: "PostgreSQL + PostGIS", desc: "Spatial Database" },
      { name: "GeoServer", desc: "نشر الخرائط" },
      { name: "React + Node.js", desc: "Frontend + Backend" },
    ],
  },
  {
    num: "03",
    label: "المرحلة الثالثة",
    en: "Phase 3 — AI Operational Platform",
    accent: "from-emerald-600 to-green-800",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    tag: "bg-emerald-100 text-emerald-700 border-emerald-300",
    status: "FUTURE",
    statusColor: "bg-emerald-100 text-emerald-700",
    dotColor: "bg-emerald-600",
    tech: [
      { name: "تحليل التهديدات", desc: "AI-Powered Threat Analysis" },
      { name: "التنبؤ العسكري", desc: "Military Forecasting" },
      { name: "الذكاء المكاني", desc: "Spatial Intelligence" },
      { name: "تحليل الصور الجوية", desc: "Aerial & Drone Analytics" },
      { name: "التتبع اللحظي", desc: "Real-time Tracking" },
    ],
  },
];

export default function PhasesSection() {
  return (
    <section className="py-24 px-4 sm:px-8 bg-muted/30 relative">
      <div className="absolute inset-0 grid-bg" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block tag-green font-mono text-xs tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full">
            Development Roadmap — مراحل التطوير
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            مراحل <span className="gradient-text">المشروع</span>
          </h2>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.14 }}
              data-testid={`phase-card-${i}`}
              className={`bg-white rounded-2xl border ${phase.border} overflow-hidden card-hover group`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${phase.accent}`} />
              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className={`font-mono text-xs px-3 py-1 rounded-full border font-semibold ${phase.tag}`}>
                    {phase.status}
                  </span>
                  <span className="font-mono text-5xl font-black text-foreground/5 select-none">
                    {phase.num}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-1">{phase.label}</h3>
                <p className={`font-mono text-sm mb-6 bg-gradient-to-r ${phase.accent} bg-clip-text text-transparent font-semibold`}>
                  {phase.en}
                </p>
                <div className="space-y-3">
                  {phase.tech.map((t, j) => (
                    <div key={j} className={`flex items-start gap-3 p-3 rounded-xl ${phase.lightBg}`}>
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${phase.dotColor}`} />
                      <div>
                        <p className="text-foreground font-bold text-sm">{t.name}</p>
                        <p className="text-muted-foreground text-xs font-mono">{t.desc}</p>
                      </div>
                    </div>
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
