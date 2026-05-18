import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const relations = [
  { origin: "Military_Bases", originAr: "القواعد العسكرية", dest: "Military_Personnel", destAr: "الأفراد العسكريون", type: "1:M", color: "green", bg: "bg-green-50", border: "border-green-200", originDot: "bg-green-500", destDot: "bg-green-400", lineColor: "#22c55e", desc: "يمكن للقاعدة أن تضم أفراداً متعددين" },
  { origin: "Military_Bases", originAr: "القواعد العسكرية", dest: "Military_Vehicles", destAr: "الآليات العسكرية", type: "1:M", color: "emerald", bg: "bg-emerald-50", border: "border-emerald-200", originDot: "bg-emerald-500", destDot: "bg-emerald-400", lineColor: "#10b981", desc: "يمكن للقاعدة أن تضم آليات متعددة" },
  { origin: "Military_Warehouses", originAr: "المستودعات العسكرية", dest: "Weapons_Inventory", destAr: "مخزون الأسلحة", type: "1:M", color: "teal", bg: "bg-teal-50", border: "border-teal-200", originDot: "bg-teal-500", destDot: "bg-teal-400", lineColor: "#14b8a6", desc: "يمكن للمستودع أن يحتوي أسلحة متعددة" },
  { origin: "Threat_Areas", originAr: "مناطق التهديد", dest: "Intelligence_Reports", destAr: "التقارير الاستخباراتية", type: "1:M", color: "red", bg: "bg-red-50", border: "border-red-200", originDot: "bg-red-500", destDot: "bg-red-400", lineColor: "#ef4444", desc: "يمكن لمنطقة التهديد أن تحتوي تقارير متعددة" },
  { origin: "Communication_Towers", originAr: "أبراج الاتصال", dest: "Communication_Devices", destAr: "أجهزة الاتصالات", type: "1:M", color: "cyan", bg: "bg-cyan-50", border: "border-cyan-200", originDot: "bg-cyan-500", destDot: "bg-cyan-400", lineColor: "#06b6d4", desc: "يمكن للبرج أن يحتوي أجهزة متعددة" },
  { origin: "Operation_Sectors", originAr: "القطاعات العسكرية", dest: "Military_Incidents", destAr: "الحوادث العسكرية", type: "1:M", color: "orange", bg: "bg-orange-50", border: "border-orange-200", originDot: "bg-orange-500", destDot: "bg-orange-400", lineColor: "#f97316", desc: "يمكن للقطاع أن يحتوي حوادث متعددة" },
];

export default function RelationshipDiagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 sm:px-8 bg-muted/30 relative" ref={ref}>
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
            Relationship Classes — مخطط العلاقات
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            علاقات <span className="gradient-text">الجداول</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            6 علاقات بين الجداول المكانية والوصفية — نوع العلاقة 1:M
          </p>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 mb-12">
          {relations.map((rel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`relation-row-${i}`}
              className={`${rel.bg} border ${rel.border} rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${rel.originDot} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-muted-foreground">جدول مكاني</p>
                  <code className="font-mono text-sm font-bold text-foreground block truncate">{rel.origin}</code>
                  <p className="text-sm text-foreground/70">{rel.originAr}</p>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col items-center gap-1 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-20 h-0.5 relative overflow-visible" style={{ background: rel.lineColor }}>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: rel.lineColor, opacity: 0.3 }}
                      animate={inView ? { scaleX: [0, 1] } : {}}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs font-black px-3 py-1 rounded-full text-white shadow-sm" style={{ background: rel.lineColor }}>
                      {rel.type}
                    </span>
                  </div>
                  <div className="w-12 sm:w-20 h-0.5" style={{ background: rel.lineColor }} />
                </div>
                <p className="text-xs text-muted-foreground text-center max-w-[160px] hidden sm:block">{rel.desc}</p>
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-0 sm:justify-end">
                <div className="min-w-0 sm:text-left">
                  <p className="text-xs font-mono text-muted-foreground">جدول وصفي</p>
                  <code className="font-mono text-sm font-bold text-foreground block truncate">{rel.dest}</code>
                  <p className="text-sm text-foreground/70">{rel.destAr}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${rel.destDot} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-2xl border border-border p-6 green-glow"
        >
          <h3 className="text-lg font-bold text-foreground mb-5 text-center">مخطط العلاقات الكامل</h3>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 880 420" className="w-full min-w-[600px]" style={{ minHeight: 320 }}>
              <defs>
                {relations.map((r, i) => (
                  <marker key={i} id={`arr-${i}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <path d="M 0 0 L 7 3.5 L 0 7 z" fill={r.lineColor} />
                  </marker>
                ))}
              </defs>

              {[
                { label: "Military_Bases", ar: "القواعد العسكرية", y: 40, color: "#22c55e", type: "GIS" },
                { label: "Military_Warehouses", ar: "المستودعات العسكرية", y: 130, color: "#14b8a6", type: "GIS" },
                { label: "Threat_Areas", ar: "مناطق التهديد", y: 220, color: "#ef4444", type: "GIS" },
                { label: "Communication_Towers", ar: "أبراج الاتصال", y: 310, color: "#06b6d4", type: "GIS" },
                { label: "Operation_Sectors", ar: "القطاعات العسكرية", y: 375, color: "#f97316", type: "GIS" },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={10} y={n.y} width={210} height={54} rx={8} fill={`${n.color}15`} stroke={n.color} strokeWidth="1.5" />
                  <rect x={10} y={n.y} width={5} height={54} rx={2} fill={n.color} />
                  <text x={26} y={n.y + 22} fill="#1a2e1a" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700">{n.label}</text>
                  <text x={26} y={n.y + 39} fill="#4b7a5b" fontSize="9" fontFamily="Cairo, sans-serif">{n.ar}</text>
                  <rect x={188} y={n.y + 4} width={28} height={16} rx={4} fill={`${n.color}25`} stroke={n.color} strokeWidth="1" />
                  <text x={202} y={n.y + 16} fill={n.color} fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">GIS</text>
                </g>
              ))}

              {[
                { label: "Military_Personnel", ar: "الأفراد العسكريون", y: 15, color: "#22c55e" },
                { label: "Military_Vehicles", ar: "الآليات العسكرية", y: 90, color: "#10b981" },
                { label: "Weapons_Inventory", ar: "مخزون الأسلحة", y: 175, color: "#14b8a6" },
                { label: "Intelligence_Reports", ar: "التقارير الاستخباراتية", y: 250, color: "#ef4444" },
                { label: "Communication_Devices", ar: "أجهزة الاتصالات", y: 325, color: "#06b6d4" },
                { label: "Military_Incidents", ar: "الحوادث العسكرية", y: 375, color: "#f97316" },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={650} y={n.y} width={220} height={54} rx={8} fill={`${n.color}15`} stroke={n.color} strokeWidth="1.5" />
                  <rect x={646} y={n.y} width={5} height={54} rx={2} fill={n.color} />
                  <text x={662} y={n.y + 22} fill="#1a2e1a" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700">{n.label}</text>
                  <text x={662} y={n.y + 39} fill="#4b7a5b" fontSize="9" fontFamily="Cairo, sans-serif">{n.ar}</text>
                  <rect x={836} y={n.y + 4} width={28} height={16} rx={4} fill={`${n.color}25`} stroke={n.color} strokeWidth="1" />
                  <text x={850} y={n.y + 16} fill={n.color} fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">TBL</text>
                </g>
              ))}

              {[
                { fromY: 67, toY: 42, color: "#22c55e", label: "1:M" },
                { fromY: 67, toY: 117, color: "#10b981", label: "1:M" },
                { fromY: 157, toY: 202, color: "#14b8a6", label: "1:M" },
                { fromY: 247, toY: 277, color: "#ef4444", label: "1:M" },
                { fromY: 337, toY: 352, color: "#06b6d4", label: "1:M" },
                { fromY: 402, toY: 402, color: "#f97316", label: "1:M" },
              ].map((e, i) => {
                const midX = 440;
                const pathD = `M 220 ${e.fromY} C ${midX} ${e.fromY}, ${midX} ${e.toY}, 646 ${e.toY}`;
                return (
                  <g key={i}>
                    <motion.path
                      d={pathD}
                      stroke={e.color}
                      strokeWidth="1.8"
                      fill="none"
                      strokeDasharray="4 3"
                      opacity="0.7"
                      markerEnd={`url(#arr-${i})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
                      transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                    />
                    <text x={midX} y={Math.min(e.fromY, e.toY) - 6} textAnchor="middle" fill={e.color} fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">
                      {e.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-6 h-0.5 bg-green-500" style={{ borderTop: "2px dashed #22c55e" }} />
              <span className="font-mono">1:M علاقة</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-400" />
              <span>جدول مكاني (GIS)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded bg-teal-100 border border-teal-400" />
              <span>جدول وصفي (TBL)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
