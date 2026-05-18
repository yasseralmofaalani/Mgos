import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = { ar: string; en: string; type: string; fk?: boolean };
type Table = { ar: string; en: string; icon: string; color: { bg: string; border: string; tag: string; dot: string; header: string }; fields: Field[] };

const T = {
  green: { bg: "bg-green-50", border: "border-green-200", tag: "bg-green-100 text-green-700", dot: "bg-green-500", header: "from-green-500 to-emerald-600" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", tag: "bg-orange-100 text-orange-700", dot: "bg-orange-500", header: "from-orange-500 to-red-500" },
  red: { bg: "bg-red-50", border: "border-red-200", tag: "bg-red-100 text-red-700", dot: "bg-red-500", header: "from-red-500 to-rose-600" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", tag: "bg-teal-100 text-teal-700", dot: "bg-teal-500", header: "from-teal-500 to-cyan-600" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", tag: "bg-violet-100 text-violet-700", dot: "bg-violet-500", header: "from-violet-500 to-purple-600" },
  gray: { bg: "bg-gray-50", border: "border-gray-200", tag: "bg-gray-100 text-gray-700", dot: "bg-gray-400", header: "from-gray-400 to-gray-500" },
};

const tables: Table[] = [
  {
    ar: "الأفراد العسكريون", en: "Military_Personnel", icon: "01", color: T.green,
    fields: [
      { ar: "رقم_العنصر", en: "Personnel_ID", type: "Long" }, { ar: "الاسم_الكامل", en: "Full_Name", type: "Text(150)" },
      { ar: "الاسم_الحركي", en: "Code_Name", type: "Text(100)" }, { ar: "الرتبة", en: "Rank", type: "Short" },
      { ar: "الاختصاص", en: "Specialty", type: "Short" }, { ar: "الوحدة", en: "Unit_Name", type: "Text(100)" },
      { ar: "الرقم_العسكري", en: "Military_No", type: "Text(50)" }, { ar: "الحالة", en: "Status", type: "Short" },
      { ar: "رقم_القاعدة", en: "Base_ID", type: "Long", fk: true }, { ar: "رقم_الحاجز", en: "Checkpoint_ID", type: "Long", fk: true },
      { ar: "رقم_المستودع", en: "Warehouse_ID", type: "Long", fk: true }, { ar: "تاريخ_الالتحاق", en: "Join_Date", type: "Date" },
      { ar: "رقم_الهاتف", en: "Phone", type: "Text(30)" }, { ar: "العنوان", en: "Address", type: "Text(250)" },
      { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "الآليات العسكرية", en: "Military_Vehicles", icon: "02", color: T.green,
    fields: [
      { ar: "رقم_الآلية", en: "Vehicle_ID", type: "Long" }, { ar: "رقم_القاعدة", en: "Base_ID", type: "Long", fk: true },
      { ar: "اسم_الآلية", en: "Vehicle_Name", type: "Text(100)" }, { ar: "النوع", en: "Vehicle_Type", type: "Short" },
      { ar: "الرقم_العسكري", en: "Military_Number", type: "Text(50)" }, { ar: "الحالة", en: "Status", type: "Short" },
      { ar: "استهلاك_الوقود", en: "Fuel_Consumption", type: "Double" }, { ar: "آخر_صيانة", en: "Last_Maintenance", type: "Date" },
      { ar: "الجاهزية", en: "Readiness", type: "Short" }, { ar: "عدد_الطاقم", en: "Crew_Count", type: "Short" },
      { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "مخزون الأسلحة", en: "Weapons_Inventory", icon: "03", color: T.red,
    fields: [
      { ar: "رقم_السلاح", en: "Weapon_ID", type: "Long" }, { ar: "رقم_المستودع", en: "Warehouse_ID", type: "Long", fk: true },
      { ar: "اسم_السلاح", en: "Weapon_Name", type: "Text(100)" }, { ar: "النوع", en: "Weapon_Type", type: "Short" },
      { ar: "الكمية", en: "Quantity", type: "Long" }, { ar: "الحالة", en: "Status", type: "Short" },
      { ar: "تاريخ_التوريد", en: "Supply_Date", type: "Date" }, { ar: "تاريخ_الانتهاء", en: "Expiry_Date", type: "Date" },
      { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "التقارير الاستخباراتية", en: "Intelligence_Reports", icon: "04", color: T.red,
    fields: [
      { ar: "رقم_التقرير", en: "Report_ID", type: "Long" }, { ar: "رقم_التهديد", en: "Threat_ID", type: "Long", fk: true },
      { ar: "عنوان_التقرير", en: "Title", type: "Text(200)" }, { ar: "المصدر", en: "Source_Type", type: "Short" },
      { ar: "مستوى_الموثوقية", en: "Reliability", type: "Short" }, { ar: "تاريخ_التقرير", en: "Report_Date", type: "Date" },
      { ar: "المحتوى", en: "Content", type: "Text(4000)" }, { ar: "المرفقات", en: "Attachments", type: "Text(500)" },
    ],
  },
  {
    ar: "الحوادث العسكرية", en: "Military_Incidents", icon: "05", color: T.orange,
    fields: [
      { ar: "رقم_الحادث", en: "Incident_ID", type: "Long" }, { ar: "رقم_القطاع", en: "Sector_ID", type: "Long", fk: true },
      { ar: "رقم_التهديد", en: "Threat_ID", type: "Long", fk: true }, { ar: "الاسم", en: "Name", type: "Text(100)" },
      { ar: "النوع", en: "Incident_Type", type: "Short" }, { ar: "التاريخ", en: "Incident_Date", type: "Date" },
      { ar: "عدد_الإصابات", en: "Casualties", type: "Short" }, { ar: "عدد_الوفيات", en: "Fatalities", type: "Short" },
      { ar: "الوصف", en: "Description", type: "Text(1000)" },
    ],
  },
  {
    ar: "أجهزة الاتصالات", en: "Communication_Devices", icon: "06", color: T.teal,
    fields: [
      { ar: "رقم_الجهاز", en: "Device_ID", type: "Long" }, { ar: "رقم_البرج", en: "Tower_ID", type: "Long", fk: true },
      { ar: "نوع_الجهاز", en: "Device_Type", type: "Short" }, { ar: "التردد", en: "Frequency", type: "Double" },
      { ar: "المدى", en: "Range_KM", type: "Double" }, { ar: "التشفير", en: "Encryption", type: "Short" },
      { ar: "الحالة", en: "Status", type: "Short" },
    ],
  },
  {
    ar: "سجلات الصيانة", en: "Maintenance_Records", icon: "07", color: T.teal,
    fields: [
      { ar: "رقم_الصيانة", en: "Maintenance_ID", type: "Long" }, { ar: "نوع_الأصل", en: "Asset_Type", type: "Short" },
      { ar: "رقم_الأصل", en: "Asset_ID", type: "Long" }, { ar: "تاريخ_الصيانة", en: "Maintenance_Date", type: "Date" },
      { ar: "نوع_الصيانة", en: "Maintenance_Type", type: "Short" }, { ar: "التكلفة", en: "Cost", type: "Double" },
      { ar: "الفني", en: "Technician", type: "Text(100)" }, { ar: "الملاحظات", en: "Notes", type: "Text(500)" },
    ],
  },
  {
    ar: "مستخدمو النظام", en: "System_Users", icon: "08", color: T.violet,
    fields: [
      { ar: "رقم_المستخدم", en: "User_ID", type: "Long" }, { ar: "اسم_المستخدم", en: "Username", type: "Text(50)" },
      { ar: "كلمة_المرور", en: "Password_Hash", type: "Text(255)" }, { ar: "الدور", en: "Role", type: "Short" },
      { ar: "آخر_دخول", en: "Last_Login", type: "Date" }, { ar: "الحالة", en: "Status", type: "Short" },
    ],
  },
  {
    ar: "سجل العمليات", en: "Audit_Log", icon: "09", color: T.violet,
    fields: [
      { ar: "رقم_السجل", en: "Log_ID", type: "Long" }, { ar: "رقم_المستخدم", en: "User_ID", type: "Long", fk: true },
      { ar: "العملية", en: "Action", type: "Text(100)" }, { ar: "الجدول", en: "Table_Name", type: "Text(100)" },
      { ar: "التاريخ", en: "Action_Date", type: "Date" }, { ar: "الجهاز", en: "Device_IP", type: "Text(50)" },
    ],
  },
  {
    ar: "بيانات المرفقات", en: "Attachments_Metadata", icon: "10", color: T.gray,
    fields: [
      { ar: "رقم_المرفق", en: "Attachment_ID", type: "Long" }, { ar: "اسم_الملف", en: "File_Name", type: "Text(255)" },
      { ar: "المسار", en: "File_Path", type: "Text(500)" }, { ar: "النوع", en: "File_Type", type: "Text(50)" },
      { ar: "الحجم", en: "File_Size", type: "Double" }, { ar: "تاريخ_الرفع", en: "Upload_Date", type: "Date" },
      { ar: "المرجع", en: "Reference_ID", type: "Long" }, { ar: "الجدول_المرجعي", en: "Reference_Table", type: "Text(100)" },
    ],
  },
];

function typeBadge(type: string) {
  if (type === "Date") return "type-badge-date";
  if (type.startsWith("Text")) return "type-badge-text";
  if (type === "Double") return "type-badge-double";
  if (type === "Long") return "type-badge-long";
  return "type-badge-short";
}

function TableCard({ table, index }: { table: Table; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      data-testid={`table-card-${table.en}`}
      className={`bg-white rounded-2xl border ${table.color.border} overflow-hidden shadow-sm`}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${table.color.header}`} />
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors"
        data-testid={`table-toggle-${table.en}`}
      >
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full font-bold ${table.color.tag}`}>
              {table.icon}
            </span>
            <span className="font-mono text-xs text-muted-foreground">Standalone Table</span>
          </div>
          <h4 className="text-lg font-bold text-foreground">{table.ar}</h4>
          <code className="font-mono text-sm text-muted-foreground">{table.en}</code>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{table.fields.filter(f => f.fk).length > 0 ? `${table.fields.filter(f => f.fk).length} FK` : ""} — {table.fields.length} حقل</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${table.color.bg} ${open ? "rotate-90" : ""}`}>
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
                  <tr className={`${table.color.bg} rounded-lg`}>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground rounded-r-lg">عربي</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground">English</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-muted-foreground rounded-l-lg">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {table.fields.map((f, j) => (
                    <tr key={j} className="border-b border-border/30 table-row-hover">
                      <td className="py-2.5 px-3 text-foreground/80 font-mono text-xs">{f.ar}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-foreground/80 font-mono text-xs">{f.en}</span>
                        {f.fk && <span className="mr-2 text-xs font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">FK</span>}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${typeBadge(f.type)}`}>{f.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StandaloneTablesSection() {
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
            Descriptive Tables — الجداول الوصفية
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2">
            <span className="gradient-text">Standalone Tables</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            10 جداول وصفية — اضغط على أي جدول لعرض الحقول التفصيلية
          </p>
          <div className="mt-5 section-divider w-40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {tables.map((t, i) => (
            <TableCard key={i} table={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
