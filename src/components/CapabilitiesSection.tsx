import React from "react";
import { motion } from "framer-motion";

const capabilities = [
  { ar: "العمليات العسكرية", en: "Military Operations", bg: "bg-green-50", border: "border-green-200", icon: "bg-green-500", text: "text-green-800", sub: "text-green-600" },
  { ar: "الاستخبارات", en: "Intelligence", bg: "bg-red-50", border: "border-red-200", icon: "bg-red-500", text: "text-red-800", sub: "text-red-600" },
  { ar: "الإمداد واللوجستيات", en: "Logistics & Supply", bg: "bg-emerald-50", border: "border-emerald-200", icon: "bg-emerald-500", text: "text-emerald-800", sub: "text-emerald-600" },
  { ar: "البنية التحتية العسكرية", en: "Military Infrastructure", bg: "bg-cyan-50", border: "border-cyan-200", icon: "bg-cyan-500", text: "text-cyan-800", sub: "text-cyan-600" },
  { ar: "مراقبة التهديدات", en: "Threat Monitoring", bg: "bg-orange-50", border: "border-orange-200", icon: "bg-orange-500", text: "text-orange-800", sub: "text-orange-600" },
  { ar: "دعم القرار العملياتي", en: "Decision Support", bg: "bg-violet-50", border: "border-violet-200", icon: "bg-violet-500", text: "text-violet-800", sub: "text-violet-600" },
  { ar: "التحليل المكاني", en: "Spatial Analysis", bg: "bg-teal-50", border: "border-teal-200", icon: "bg-teal-500", text: "text-teal-800", sub: "text-teal-600" },
  { ar: "القيادة والسيطرة", en: "Command & Control", bg: "bg-yellow-50", border: "border-yellow-200", icon: "bg-yellow-500", text: "text-yellow-800", sub: "text-yellow-600" },
];

export default function CapabilitiesSection() {
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
            الوصف العام — General Description
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            قدرات <span className="gradient-text">النظام</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            النظام مصمم لإدارة ثمانية محاور عملياتية رئيسية
          </p>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              data-testid={`capability-card-${i}`}
              className={`${item.bg} border ${item.border} rounded-2xl p-6 card-hover group cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl ${item.icon} mb-4 flex items-center justify-center shadow-sm`}>
                <span className="text-white text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={`text-lg font-bold ${item.text} mb-1 leading-tight`}>{item.ar}</h3>
              <p className={`text-sm ${item.sub} font-medium`}>{item.en}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
