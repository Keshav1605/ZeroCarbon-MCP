"use client";

import React from "react";
import KineticTextLoader from "../components/ui/kinetic-text-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F9FBF9] z-50">
      <KineticTextLoader text="ZeroCarbon" />
    </div>
  );
}
