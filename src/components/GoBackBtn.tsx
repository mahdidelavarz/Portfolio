"use client";

import React from "react";
import { MdiArrowLeft } from "@/icons/icons";

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="group flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-medium border border-slate-700 hover:border-slate-600 hover:bg-slate-700 transition-all duration-300"
    >
      <MdiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      Go Back
    </button>
  );
}
