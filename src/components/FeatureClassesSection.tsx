import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = { ar: string; en: string; type: string; note?: string };
type FeatureClass = {
  ar: string; en: string; dataset: string;
  geomType: "Point" | "Line" | "Polygon";
  color: { bg: string; border: string; tag: string; dot: string; header: string; light: string };
  fields: Field[];
  domains?: { name: string; values: { code: number; ar: string; en: string }[] }[];
};

const C = {
  green: { bg: "bg-green-50", border: "border-green-200", tag: "bg-green-100 text-green-700", dot: "bg-green-500", header: "from-green-500 to-emerald-600", light: "bg-green-50" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", tag: "bg-orange-100 text-orange-700", dot: "bg-orange-500", header: "from-orange-500 to-red-500", light: "bg-orange-50" },
  red: { bg: "bg-red-50", border: "border-red-200", tag: "bg-red-100 text-red-700", dot: "bg-red-500", header: "from-red-500 to-rose-600", light: "bg-red-50" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", tag: "bg-teal-100 text-teal-700", dot: "bg-teal-500", header: "from-teal-500 to-cyan-600", light: "bg-teal-50" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", tag: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500", header: "from-cyan-500 to-sky-600", light: "bg-cyan-50" },
};

const featureClasses: FeatureClass[] = [
  {
    ar: "القواعد العسكرية", en: "Military_Bases", dataset: "Base_Data", geomType: "Point", color: C.green,
    fields: [
      { ar: "رقم_القاعدة", en: "Base_ID", type: "Long" }, { ar: "اسم_القاعدة", en: "Base_Name", type: "Text(150)" },
      { ar: "نوع_القاعدة", en: "Base_Type", type: "Short", note: "Domain" }, { ar: "مستوى_الأمن", en: "Security_Level", type: "Short" },
      { ar: "الحالة", en: "Status", type: "Short", note: "Domain" }, { ar: "عدد_الجنود", en: "Soldiers_Count", type: "Long" },
      { ar: "عدد_الآليات", en: "Vehicles_Count", type: "Long" }, { ar: "القائد", en: "Commander", type: "Text(100)" },
      { ar: "رمز_النداء", en: "Call_Sign", type: "Text(50)" }, { ar: "المساحة", en: "Area_Size", type: "Double" },
      { ar: "الارتفاع", en: "Elevation", type: "Double" }, { ar: "مصدر_الطاقة", en: "Power_Source", type: "Short" },
      { ar: "توفر_الاتصالات", en: "Communication_Status", type: "Short" }, { ar: "تاريخ_التأسيس", en: "Establish_Date", type: "Date" },
      { ar: "آخر_تحديث", en: "Last_Update", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
    domains: [
      { name: "Base_Type", values: [{ code: 1, ar: "برية", en: "Land Base" }, { code: 2, ar: "جوية", en: "Air Base" }, { code: 3, ar: "بحرية", en: "Naval Base" }, { code: 4, ar: "قيادة", en: "Command Center" }, { code: 5, ar: "تدريب", en: "Training Camp" }] },
      { name: "Status", values: [{ code: 1, ar: "نشط", en: "Active" }, { code: 2, ar: "احتياط", en: "Reserve" }, { code: 3, ar: "متضرر", en: "Damaged" }, { code: 4, ar: "مغلق", en: "Closed" }] },
    ],
  },
  {
    ar: "الحواجز الأمنية", en: "Checkpoints", dataset: "Base_Data", geomType: "Point", color: C.green,
    fields: [
      { ar: "رقم_الحاجز", en: "Checkpoint_ID", type: "Long" }, { ar: "اسم_الحاجز", en: "Name", type: "Text(150)" },
      { ar: "نوع_الحاجز", en: "Type", type: "Short", note: "Domain" }, { ar: "عدد_العناصر", en: "Personnel", type: "Short" },
      { ar: "مستوى_الخطر", en: "Risk_Level", type: "Short" }, { ar: "الحالة", en: "Status", type: "Short" },
      { ar: "الجهة_المسؤولة", en: "Responsible_Unit", type: "Text(100)" }, { ar: "عدد_المركبات_اليومي", en: "Daily_Vehicles", type: "Long" },
      { ar: "ساعات_العمل", en: "Working_Hours", type: "Text(50)" }, { ar: "توفر_الكاميرات", en: "Camera_Available", type: "Short" },
      { ar: "تاريخ_الإنشاء", en: "Created_Date", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
    domains: [
      { name: "Type", values: [{ code: 1, ar: "ثابت", en: "Fixed" }, { code: 2, ar: "متنقل", en: "Mobile" }, { code: 3, ar: "مؤقت", en: "Temporary" }, { code: 4, ar: "حدودي", en: "Border" }] },
    ],
  },
  {
    ar: "القطاعات العسكرية", en: "Operation_Sectors", dataset: "Operations", geomType: "Polygon", color: C.orange,
    fields: [
      { ar: "رقم_القطاع", en: "Sector_ID", type: "Long" }, { ar: "اسم_القطاع", en: "Name", type: "Text(150)" },
      { ar: "نوع_القطاع", en: "Sector_Type", type: "Short", note: "Domain" }, { ar: "مستوى_التهديد", en: "Threat_Level", type: "Short" },
      { ar: "التضاريس", en: "Terrain_Type", type: "Short" }, { ar: "عدد_القوات", en: "Troops_Count", type: "Long" },
      { ar: "عدد_الحواجز", en: "Checkpoints_Count", type: "Long" }, { ar: "مستوى_السيطرة", en: "Control_Level", type: "Short" },
      { ar: "القائد_الميداني", en: "Field_Commander", type: "Text(100)" }, { ar: "نسبة_الأمان", en: "Security_Percentage", type: "Double" },
      { ar: "آخر_عملية", en: "Last_Operation", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
    domains: [
      { name: "Sector_Type", values: [{ code: 1, ar: "حضري", en: "Urban" }, { code: 2, ar: "ريفي", en: "Rural" }, { code: 3, ar: "جبلي", en: "Mountain" }, { code: 4, ar: "صحراوي", en: "Desert" }, { code: 5, ar: "حدودي", en: "Border" }] },
    ],
  },
  {
    ar: "مسارات الدوريات", en: "Patrol_Routes", dataset: "Operations", geomType: "Line", color: C.orange,
    fields: [
      { ar: "رقم_الدورية", en: "Route_ID", type: "Long" }, { ar: "اسم_الدورية", en: "Name", type: "Text(150)" },
      { ar: "نوع_الدورية", en: "Type", type: "Short" }, { ar: "مستوى_الخطر", en: "Risk_Level", type: "Short" },
      { ar: "الطول_كم", en: "Length_KM", type: "Double" }, { ar: "زمن_التحرك", en: "Travel_Time", type: "Double" },
      { ar: "عدد_العناصر", en: "Personnel_Count", type: "Short" }, { ar: "عدد_الآليات", en: "Vehicles_Count", type: "Short" },
      { ar: "حالة_الطريق", en: "Road_Status", type: "Short" }, { ar: "آخر_دورية", en: "Last_Patrol", type: "Date" },
      { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "مناطق التهديد", en: "Threat_Areas", dataset: "Intelligence", geomType: "Polygon", color: C.red,
    fields: [
      { ar: "رقم_التهديد", en: "Threat_ID", type: "Long" }, { ar: "اسم_التهديد", en: "Name", type: "Text(150)" },
      { ar: "نوع_التهديد", en: "Threat_Type", type: "Short" }, { ar: "مستوى_التهديد", en: "Level", type: "Short" },
      { ar: "عدد_الأعداء", en: "Enemy_Count", type: "Long" }, { ar: "نوع_التسليح", en: "Weapon_Type", type: "Text(100)" },
      { ar: "مصدر_المعلومة", en: "Intel_Source", type: "Short" }, { ar: "آخر_رصد", en: "Last_Detected", type: "Date" },
      { ar: "نسبة_الخطورة", en: "Danger_Percentage", type: "Double" }, { ar: "النشاط_الليلي", en: "Night_Activity", type: "Short" },
      { ar: "الملاحظات", en: "Notes", type: "Text(1000)" },
    ],
  },
  {
    ar: "طرق الإمداد", en: "Supply_Routes", dataset: "Logistics", geomType: "Line", color: C.teal,
    fields: [
      { ar: "رقم_الطريق", en: "Route_ID", type: "Long" }, { ar: "اسم_الطريق", en: "Name", type: "Text(150)" },
      { ar: "الحالة", en: "Status", type: "Short" }, { ar: "مستوى_الخطر", en: "Risk", type: "Short" },
      { ar: "الطول_كم", en: "Length_KM", type: "Double" }, { ar: "زمن_الوصول", en: "Arrival_Time", type: "Double" },
      { ar: "عدد_القوافل", en: "Convoys_Count", type: "Long" }, { ar: "قابلية_الاستخدام", en: "Accessibility", type: "Short" },
      { ar: "آخر_إمداد", en: "Last_Supply", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "المستودعات العسكرية", en: "Military_Warehouses", dataset: "Logistics", geomType: "Point", color: C.teal,
    fields: [
      { ar: "رقم_المستودع", en: "Warehouse_ID", type: "Long" }, { ar: "اسم_المستودع", en: "Name", type: "Text(150)" },
      { ar: "نوع_المستودع", en: "Type", type: "Short" }, { ar: "السعة", en: "Capacity", type: "Double" },
      { ar: "مستوى_الحماية", en: "Protection_Level", type: "Short" }, { ar: "نسبة_الامتلاء", en: "Fill_Percentage", type: "Double" },
      { ar: "درجة_الحرارة", en: "Temperature", type: "Double" }, { ar: "توفر_الكهرباء", en: "Electricity", type: "Short" },
      { ar: "آخر_جرد", en: "Last_Inventory", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "المطارات العسكرية", en: "Military_Airports", dataset: "Infrastructure", geomType: "Point", color: C.cyan,
    fields: [
      { ar: "رقم_المطار", en: "Airport_ID", type: "Long" }, { ar: "اسم_المطار", en: "Name", type: "Text(150)" },
      { ar: "نوع_المطار", en: "Type", type: "Short" }, { ar: "عدد_المدارج", en: "Runways", type: "Short" },
      { ar: "طول_المدرج", en: "Runway_Length", type: "Double" }, { ar: "السعة_الطائرات", en: "Aircraft_Capacity", type: "Long" },
      { ar: "مستوى_الحماية", en: "Security_Level", type: "Short" }, { ar: "حالة_المطار", en: "Airport_Status", type: "Short" },
      { ar: "آخر_صيانة", en: "Last_Maintenance", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "أبراج الاتصال", en: "Communication_Towers", dataset: "Infrastructure", geomType: "Point", color: C.cyan,
    fields: [
      { ar: "رقم_البرج", en: "Tower_ID", type: "Long" }, { ar: "اسم_البرج", en: "Name", type: "Text(150)" },
      { ar: "مدى_التغطية", en: "Coverage", type: "Double" }, { ar: "نوع_البرج", en: "Tower_Type", type: "Short" },
      { ar: "التردد", en: "Frequency", type: "Double" }, { ar: "حالة_الطاقة", en: "Power_Status", type: "Short" },
      { ar: "مستوى_الإشارة", en: "Signal_Strength", type: "Double" }, { ar: "حالة_البرج", en: "Status", type: "Short" },
      { ar: "آخر_فحص", en: "Last_Inspection", type: "Date" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
];

const geomBadge = {
  Point: "bg-yellow-100 text-yellow-700",
  Line: "bg-blue-100 text-blue-700",
  Polygon: "bg-purple-100 text-purple-700",
};

function typeBadge(type: string) {
  if (type === "Date") return "type-badge-date";
  if (type.startsWith("Text")) return "type-badge-text";
  if (type === "Double") return "type-badge-double";
  if (type === "Long") return "type-badge-long";
  return "type-badge-short";
}

function FeatureClassCard({ fc, index }: { fc: FeatureClass; index: number }) {
  const [open, setOpen] = useState(false);
  const [showDomains, setShowDomains] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      data-testid={`fc-card-${fc.en}`}
      className={`bg-white rounded-2xl border ${fc.color.border} overflow-hidden shadow-sm`}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${fc.color.header}`} />
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors"
        data-testid={`fc-toggle-${fc.en}`}
      >
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full font-semibold ${geomBadge[fc.geomType]}`}>
              {fc.geomType}
            </span>
            <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full ${fc.color.tag}`}>
              {fc.dataset}
            </span>
          </div>
          <h4 className="text-lg font-bold text-foreground">{fc.ar}</h4>
          <code className="font-mono text-sm text-muted-foreground">{fc.en}</code>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{fc.fields.length} حقل</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${fc.color.bg} ${open ? "rotate-90" : ""}`}>
          <svg className="w-4 h-4 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 pb-5 pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`${fc.color.bg} rounded-lg`}>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground tracking-wide rounded-r-lg">عربي</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground tracking-wide">English</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground tracking-wide rounded-l-lg">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {fc.fields.map((f, j) => (
                    <tr key={j} className="border-b border-border/30 table-row-hover">
                      <td className="py-2.5 px-3 text-foreground/80 font-mono text-xs">{f.ar}</td>
                      <td className="py-2.5 px-3 text-foreground/80 font-mono text-xs">{f.en}</td>
                      <td className="py-2.5 px-3">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${typeBadge(f.type)}`}>{f.type}</span>
                        {f.note && <span className="mr-1 text-xs font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">D</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {fc.domains && fc.domains.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowDomains(!showDomains)}
                    className={`font-mono text-xs px-4 py-1.5 rounded-full border font-semibold transition-colors ${fc.color.tag} border-current/30 hover:opacity-80`}
                    data-testid={`domains-toggle-${fc.en}`}
                  >
                    {showDomains ? "اخفاء Domains" : "عرض Domains"}
                  </button>
                  <AnimatePresence>
                    {showDomains && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {fc.domains.map((d, k) => (
                            <div key={k} className={`${fc.color.bg} rounded-xl p-3 border ${fc.color.border}`}>
                              <p className="font-mono text-xs font-bold text-foreground mb-2">{d.name}</p>
                              {d.values.map((v, l) => (
                                <div key={l} className="flex items-center gap-2 py-1 border-b border-border/30 last:border-0">
                                  <span className="font-mono text-xs text-muted-foreground w-4">{v.code}</span>
                                  <span className="text-xs text-foreground/80 flex-1">{v.ar}</span>
                                  <span className="text-xs text-muted-foreground font-mono">{v.en}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FeatureClassesSection() {
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
            Spatial Tables — الجداول المكانية
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            <span className="gradient-text">Feature Classes</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            9 طبقات مكانية — اضغط على أي بطاقة لعرض الحقول التفصيلية
          </p>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featureClasses.map((fc, i) => (
            <FeatureClassCard key={i} fc={fc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
