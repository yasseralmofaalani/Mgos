import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-8 overflow-hidden border-t border-border">
      <div className="absolute inset-0 grid-bg-dense" />
      <div className="absolute inset-0 hero-blob opacity-40" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block tag-green font-mono text-xs px-4 py-1.5 rounded-full mb-6">
            SYSTEM STATUS: INITIALIZED — Phase 1 Active
          </div>

          <h2 className="text-5xl sm:text-7xl font-black mb-3 gradient-text">
            MGOS
          </h2>
          <p className="text-foreground/70 font-sans text-xl font-semibold mb-2">
            نظام المعلومات الجغرافية العملياتي العسكري
          </p>
          <p className="text-muted-foreground font-mono text-sm mb-10">
            Military Geospatial Operational System
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { label: "Database", value: "MGOS.gdb" },
              { label: "Version", value: "Phase 1.0" },
              { label: "Type", value: "Desktop GIS" },
              { label: "Feature Classes", value: "9 طبقات" },
              { label: "Standalone Tables", value: "10 جداول" },
              { label: "Relationships", value: "6 علاقات" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-border px-5 py-3 text-center green-glow-sm">
                <p className="font-mono text-xs text-muted-foreground mb-1 uppercase tracking-widest">{item.label}</p>
                <code className="font-mono text-sm font-bold text-primary">{item.value}</code>
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["Base_Data", "Operations", "Intelligence", "Logistics", "Infrastructure", "Analysis"].map((ds, i) => (
                <span key={i} className="tag-green font-mono text-xs px-2.5 py-1 rounded-full">{ds}</span>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Military Geospatial Operational System © 2024
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
