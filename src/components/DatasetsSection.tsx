import React from "react";
import { motion } from "framer-motion";

const datasets = [
  {
    en: "Base_Data",
    ar: "البيانات الأساسية",
    desc: "البيانات العسكرية الأساسية",
    classes: [{ name: "Military_Bases", type: "Point" }, { name: "Checkpoints", type: "Point" }],
    bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500",
    tag: "bg-green-100 text-green-700", header: "from-green-500 to-emerald-600",
  },
  {
    en: "Operations",
    ar: "العمليات",
    desc: "إدارة العمليات العسكرية",
    classes: [{ name: "Operation_Sectors", type: "Polygon" }, { name: "Patrol_Routes", type: "Line" }],
    bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500",
    tag: "bg-orange-100 text-orange-700", header: "from-orange-500 to-red-500",
  },
  {
    en: "Intelligence",
    ar: "الاستخبارات",
    desc: "التهديدات والتحليل الاستخباراتي",
    classes: [{ name: "Threat_Areas", type: "Polygon" }],
    bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500",
    tag: "bg-red-100 text-red-700", header: "from-red-500 to-rose-600",
  },
  {
    en: "Logistics",
    ar: "الإمداد",
    desc: "الإمداد العسكري واللوجستيات",
    classes: [{ name: "Supply_Routes", type: "Line" }, { name: "Military_Warehouses", type: "Point" }],
    bg: "bg-teal-50", border: "border-teal-200", dot: "bg-teal-500",
    tag: "bg-teal-100 text-teal-700", header: "from-teal-500 to-cyan-600",
  },
  {
    en: "Infrastructure",
    ar: "البنية التحتية",
    desc: "المطارات والاتصالات",
    classes: [{ name: "Military_Airports", type: "Point" }, { name: "Communication_Towers", type: "Point" }],
    bg: "bg-cyan-50", border: "border-cyan-200", dot: "bg-cyan-500",
    tag: "bg-cyan-100 text-cyan-700", header: "from-cyan-500 to-sky-600",
  },
  {
    en: "Analysis",
    ar: "التحليل",
    desc: "التحليلات المكانية المتقدمة",
    classes: [{ name: "Spatial_Analysis", type: "Raster" }],
    bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500",
    tag: "bg-violet-100 text-violet-700", header: "from-violet-500 to-purple-600",
  },
];

const geomColor: Record<string, string> = {
  Point: "bg-yellow-100 text-yellow-700",
  Line: "bg-blue-100 text-blue-700",
  Polygon: "bg-purple-100 text-purple-700",
  Raster: "bg-gray-100 text-gray-700",
};

export default function DatasetsSection() {
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
            Database Structure — بنية قاعدة البيانات
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            مجموعات <span className="gradient-text">البيانات المكانية</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-mono text-sm">
            MGOS.gdb — Feature Datasets (6 مجموعات)
          </p>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {datasets.map((ds, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              data-testid={`dataset-card-${ds.en}`}
              className={`bg-white rounded-2xl border ${ds.border} overflow-hidden card-hover group`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${ds.header}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${ds.dot} shadow-sm`} />
                  <code className="font-mono text-sm font-bold text-foreground">{ds.en}</code>
                </div>
                <h3 className="text-xl font-black text-foreground mb-1">{ds.ar}</h3>
                <p className="text-muted-foreground text-sm mb-5">{ds.desc}</p>
                <div className="border-t border-border/60 pt-4 space-y-2">
                  <p className="font-mono text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                    Feature Classes
                  </p>
                  {ds.classes.map((cls, j) => (
                    <div key={j} className={`flex items-center justify-between p-2.5 rounded-lg ${ds.bg}`}>
                      <code className="font-mono text-xs text-foreground font-semibold">{cls.name}</code>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded-full font-medium ${geomColor[cls.type]}`}>
                        {cls.type}
                      </span>
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
