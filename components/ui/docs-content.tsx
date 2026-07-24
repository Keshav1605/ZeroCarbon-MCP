"use client";

import React from "react";

export interface DocsContentProps {
  activeSectionId: string;
  onCopy: (text: string, id: string) => void;
  copiedTextId: string | null;
}

function CodeBlock({
  code,
  language,
  copyId,
  onCopy,
  copiedTextId,
}: {
  code: string;
  language: string;
  copyId: string;
  onCopy: (text: string, id: string) => void;
  copiedTextId: string | null;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-sm bg-[#0B0F0D]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121815] border-b border-neutral-800 select-none">
        <span className="text-xs font-bold uppercase text-zinc-300">{language}</span>
        <button
          onClick={() => onCopy(code, copyId)}
          className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">
            {copiedTextId === copyId ? "done" : "content_copy"}
          </span>
        </button>
      </div>
      <div className="p-5 overflow-x-auto bg-[#0A0E0C]">
        <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}

export function DocsContent({
  onCopy,
  copiedTextId,
}: DocsContentProps) {
  return (
    <div className="w-full space-y-20 pb-24 text-[#333] dark:text-[#E2E8F0]">
      {/* ---------------- SECTION 1: INTRODUCTION ---------------- */}
      <section id="introduction" className="scroll-mt-24 space-y-8">
        <div>
          <p className="text-xs font-bold text-accent-green uppercase tracking-wider mb-3">ZeroCarbon Documentation</p>
          <h1 className="font-display-lg text-3xl sm:text-4xl font-bold tracking-tight text-neutral-800 dark:text-text-main mb-4">
            Infrastructure-Grade Carbon Accounting API
          </h1>
          <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
            Not just a calculator—a complete carbon activity ingestion, normalization, verification, and reporting engine that transforms raw operational data into audit-ready emissions intelligence.
          </p>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main mb-4">Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "35+ Standardized Fields" },
              { label: "Confidence Scoring" },
              { label: "Git-like Audit Trail" },
              { label: "Double-Entry Ledger" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 flex items-center justify-center text-center shadow-sm"
              >
                <span className="text-sm font-bold text-accent-green">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Makes ZeroCarbon API Different? */}
        <div className="space-y-5">
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
            What Makes ZeroCarbon API Different?
          </h2>

          <div className="space-y-4">
            {[
              {
                num: "1",
                title: "Canonical Activity Model",
                desc: "Single unbreakable data contract for all emissions. 35+ standardized fields with full type safety and Zod validation.",
              },
              {
                num: "2",
                title: "Confidence Scoring",
                desc: "5-factor weighted algorithm (0–100%) assessing data quality: Source quality, Completeness, Factor quality, Temporal accuracy, Methodological rigor.",
              },
              {
                num: "3",
                title: "Git-like Audit Trail",
                desc: "SHA-256 hash chains for every carbon activity. Complete version history with tamper-proof integrity verification.",
              },
              {
                num: "4",
                title: "Carbon Ledger",
                desc: "Double-entry bookkeeping for emissions. Tracks balance_before, transaction_amount, balance_after for complete transparency.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex flex-col sm:flex-row items-start gap-4 shadow-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-green/10 text-accent-green font-bold shrink-0 text-lg">
                  {item.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-accent-green">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Architecture */}
        <div className="space-y-5">
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
            Core Architecture
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            ZeroCarbon API v3 is built on four foundational pillars that ensure data integrity, compliance, and scalability.
          </p>

          {/* Pillar 1 */}
          <div className="space-y-3 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">1. Canonical Activity Model</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Every emission flows through a single, unbreakable data contract with 35+ standardized fields. This ensures consistency across all data sources—whether from manual entry, CSV uploads, ERP integrations, or IoT sensors.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">2. Confidence Scoring System</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Data quality is quantified using a 5-factor weighted algorithm (0–100% scale).
            </p>

            <div className="grid gap-3">
              {[
                {
                  factor: "Source Quality (25%)",
                  details: "Meter data (95%) → API (90%) → Supplier (80%) → Manual (70%) → Estimate (50%)",
                },
                {
                  factor: "Data Completeness (25%)",
                  details: "Required fields populated + Metadata richness",
                },
                {
                  factor: "Emission Factor Quality (20%)",
                  details: "Region-specific → National → Global defaults",
                },
                {
                  factor: "Temporal Accuracy (15%)",
                  details: "Real-time → Daily → Monthly → Annual",
                },
                {
                  factor: "Methodological Rigor (15%)",
                  details: "GHG Protocol Tier 1–4 classification",
                },
              ].map((row) => (
                <div key={row.factor} className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1">
                  <div className="text-sm font-bold text-accent-green-text">{row.factor}</div>
                  <div className="text-xs text-text-muted leading-relaxed">{row.details}</div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="text-sm font-bold text-text-main mb-2">Confidence Ratings</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { rating: "Excellent (≥85%)", color: "bg-accent-green/15 text-accent-green-text" },
                  { rating: "Good (70–84%)", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                  { rating: "Fair (55–69%)", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
                  { rating: "Poor (<55%)", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
                ].map((r) => (
                  <div key={r.rating} className={`p-2.5 rounded-xl text-center text-xs font-bold ${r.color}`}>
                    {r.rating}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-3 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">3. Audit Trail &amp; Version Control</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Git-like version control for every carbon activity using SHA-256 hash chains.
            </p>
            <div>
              <div className="text-sm font-bold text-text-main mb-2">Tracks every change:</div>
              <div className="flex flex-wrap gap-2">
                {["Create", "Update", "Delete", "Recalculate"].map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-step-bg border border-accent-green-text/15 text-accent-green-text"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Provides tamper-proof integrity verification meeting SEC, CSRD, and BRSR audit requirements.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="space-y-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">4. Carbon Ledger (Double-Entry Bookkeeping)</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Accounting-grade emission tracking with separate ledgers for Scope 1, 2, and 3.
            </p>

            <div>
              <div className="text-sm font-bold text-text-main mb-2">Transaction Types</div>
              <div className="grid grid-cols-2 gap-2">
                {["emission_add", "emission_reduce", "offset_purchase", "offset_retire"].map((t) => (
                  <code
                    key={t}
                    className="px-3 py-2 rounded-xl bg-instructions-bg border border-outline-variant/20 text-xs font-mono font-bold text-accent-green-text text-center"
                  >
                    {t}
                  </code>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-text-main mb-2">Balance Tracking</div>
              <div className="grid grid-cols-3 gap-2">
                {["balance_before", "transaction_amount", "balance_after"].map((b) => (
                  <div
                    key={b}
                    className="px-3 py-2.5 rounded-xl bg-instructions-bg border border-outline-variant/20 text-center"
                  >
                    <code className="text-xs font-mono font-bold text-text-main">{b}</code>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-text-main mb-2">Period Snapshots</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Frozen period-end balances for regulatory reporting
              </p>
            </div>
          </div>
        </div>

        {/* Quick Example */}
        <div className="space-y-4">
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
            Quick Example (Node.js SDK)
          </h2>
          <CodeBlock
            copyId="intro-node"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`import { ZeroCarbon } from 'zerocarbon-nodejs-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize client
const client = new ZeroCarbon({
  apiKey: process.env.ZEROCARBON_API_KEY!,
  baseUrl: 'https://api.zerocarbon.org.in/v1'
});

// Submit electricity activity
const result = await client.emissions.calculate({
  activity_type: 'electricity',
  quantity: 1500,
  unit: 'kWh',
  location: {
    country: 'IN',
    state: 'MH'
  },
  period: {
    start: '2026-02-01',
    end: '2026-02-28'
  }
});

console.log(\`Emissions: \${result.emissions_kg_co2e} kg CO2e\`);
console.log(\`Confidence: \${result.confidence_score}\`);`}
          />
        </div>

        {/* Base URL */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-mint/50 dark:bg-surface-container-low/50 border border-accent-green/10 flex items-start gap-4 shadow-sm backdrop-blur-md">
          <span className="material-symbols-outlined text-accent-green text-[22px] shrink-0 mt-0.5 select-none">
            info
          </span>
          <div>
            <h5 className="text-xs font-bold text-neutral-800 dark:text-text-main">Base URL</h5>
            <p className="text-xs text-text-muted mt-1 font-mono break-all">https://api.zerocarbon.org.in/v1</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
            Next Steps
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                num: "1",
                title: "Quick Start Guide",
                desc: "Install SDKs and submit your first activity in 5 minutes.",
              },
              {
                num: "2",
                title: "Authentication",
                desc: "Learn how to generate and manage API keys.",
              },
              {
                num: "3",
                title: "API Reference",
                desc: "Explore all available endpoints and parameters.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-green text-white text-xs font-bold">
                    {step.num}
                  </span>
                  <h4 className="font-bold text-text-main">{step.title}</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: QUICK START ---------------- */}
      <section id="quickstart" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3 mb-4">
            Quick Start Guide
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Get up and running with the ZeroCarbon API in under 5 minutes.
          </p>
        </div>

        {/* Quick Start 3-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: "1",
              title: "Get API Key",
              desc: "Sign up and generate your API key.",
            },
            {
              num: "2",
              title: "Install SDK",
              desc: "Install the ZeroCarbon SDK using npm, pnpm, yarn, or pip.",
            },
            {
              num: "3",
              title: "Make Request",
              desc: "Submit your first carbon activity and receive emissions data.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <span className="text-3xl font-bold text-accent-green mb-2">{step.num}</span>
              <h3 className="font-bold text-text-main mb-1">{step.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Step 1 */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Step 1: Get Your API Key</h3>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Prerequisites</h4>
            <p className="text-sm text-text-muted mb-2">API access requires one of the following:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li><strong>Professional Plan (₹14,999/month)</strong> + API Add-on Pack (₹999–₹2,999/month)</li>
              <li><strong>Enterprise Plan (₹39,999/month)</strong> (includes unlimited API keys)</li>
            </ul>
            <p className="text-xs text-text-muted mt-3 italic">Note: Trial and Starter plans do not include API access.</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Generate Your API Key</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Log in to your ZeroCarbon dashboard.</li>
              <li>Navigate to: <strong>Settings → Billing → API Keys</strong></li>
              <li>Click <strong>Create New API Key</strong>.</li>
              <li>
                Select either:
                <div className="flex flex-wrap gap-2 mt-2 ml-5">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10">
                    Test (zc_test_)
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-accent-green/10 text-accent-green-text border border-accent-green/10">
                    Live (zc_live_)
                  </span>
                </div>
              </li>
              <li>Copy your API key (it is shown only once).</li>
            </ol>
          </div>

          {/* Security Warning */}
          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-3 mt-3">
            <span className="material-symbols-outlined text-red-500 text-[22px] shrink-0 select-none">
              warning
            </span>
            <div>
              <h5 className="text-xs font-bold text-red-700 dark:text-red-400 mb-1">Security Best Practice</h5>
              <ul className="list-disc list-inside text-xs text-red-600/80 dark:text-red-300 space-y-1 leading-relaxed">
                <li>Never commit API keys to Git.</li>
                <li>Never expose API keys publicly.</li>
                <li>Store keys using environment variables or a secrets manager.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Step 2: Install the SDK</h3>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Node.js / TypeScript</h4>
              <CodeBlock
                copyId="npm-install"
                language="bash"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`npm install zerocarbon-nodejs-sdk dotenv

# or
pnpm add zerocarbon-nodejs-sdk dotenv

# or
yarn add zerocarbon-nodejs-sdk dotenv`}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Python</h4>
              <CodeBlock
                copyId="pip-install"
                language="bash"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`pip install zerocarbon-python-sdk python-dotenv`}
              />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Step 3: Submit Your First Activity</h3>

          <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Node.js / TypeScript Example</h4>
              <CodeBlock
                copyId="node-quickstart"
                language="typescript"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`import { ZeroCarbon } from "zerocarbon-nodejs-sdk";
import * as dotenv from "dotenv";

dotenv.config();

const client = new ZeroCarbon({
  apiKey: process.env.ZEROCARBON_API_KEY!,
  baseUrl: "https://api.zerocarbon.org.in/v1",
});

async function submitActivity() {
  try {
    const result = await client.emissions.calculate({
      activity_type: "electricity",
      quantity: 1500,
      unit: "kWh",

      period: {
        start: "2026-02-01",
        end: "2026-02-28",
      },

      location: {
        country: "IN",
        state: "MH",
        city: "Mumbai",
      },

      source: {
        type: "manual",
        confidence: 0.95,
      },
    });

    console.log("✅ Activity submitted successfully!");
    console.log(\`📊 Emissions: \${result.emissions_kg_co2e} kg CO2e\`);
    console.log(\`🎯 Confidence: \${result.confidence_score}\`);
    console.log(\`🔗 Activity ID: \${result.activity_id}\`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

submitActivity();`}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Python Example</h4>
              <CodeBlock
                copyId="py-quickstart"
                language="python"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`from zerocarbon import ZeroCarbon
import os
from dotenv import load_dotenv

load_dotenv()

client = ZeroCarbon(
    api_key=os.getenv("ZEROCARBON_API_KEY"),
    base_url="https://api.zerocarbon.org.in/v1"
)

result = client.emissions.calculate({
    "activity_type": "electricity",
    "quantity": 1500,
    "unit": "kWh",

    "period": {
        "start": "2026-02-01",
        "end": "2026-02-28"
    },

    "location": {
        "country": "IN",
        "state": "MH",
        "city": "Mumbai"
    },

    "source": {
        "type": "manual",
        "confidence": 0.95
    }
})

print("✅ Activity submitted successfully!")
print(f"📊 Emissions: {result['emissions_kg_co2e']} kg CO2e")
print(f"🎯 Confidence: {result['confidence_score']}")
print(f"🔗 Activity ID: {result['activity_id']}")`}
              />
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                icon: "📋",
                title: "Carbon Activity Model",
                desc: "Understand the complete data model, available activity types, and supported fields.",
              },
              {
                icon: "📚",
                title: "API Reference",
                desc: "Explore every endpoint, request schema, response format, and error code.",
              },
              {
                icon: "📊",
                title: "Generate Reports",
                desc: "Create BRSR, GHG Protocol, and custom compliance reports.",
              },
              {
                icon: "💡",
                title: "Complete Examples",
                desc: "View full end-to-end integration examples for common workflows.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm space-y-2"
              >
                <h4 className="font-bold text-text-main flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Helpful Tips</h3>
          <div className="grid gap-2">
            {[
              {
                label: "Always use environment variables for API keys.",
                sub: "Never hardcode sensitive credentials in your source code.",
              },
              {
                label: "Start development using the sandbox/test environment",
                sub: "before switching to production.",
              },
              {
                label: "Implement proper retry logic and graceful error handling",
                sub: "for API failures.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3"
              >
                <span className="material-symbols-outlined text-accent-green-text text-[20px] shrink-0 mt-0.5 select-none">
                  lightbulb
                </span>
                <div>
                  <div className="text-sm font-bold text-text-main">{tip.label}</div>
                  <div className="text-xs text-text-muted leading-relaxed mt-0.5">{tip.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: CONNECT AI AGENT (MCP) ---------------- */}
      <section id="connect-ai-agent-mcp" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green"></span>
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-accent-green text-white uppercase tracking-wider">
                  MCP LIVE
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Connect AI Agent (MCP)
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Connect the ZeroCarbon MCP (Model Context Protocol) server to your AI agent in 30 seconds for autonomous carbon accounting.
          </p>
        </div>

        {/* 3 Step Quick Connect */}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              n: "1",
              title: "Add Server to Config",
              desc: "Add the ZeroCarbon MCP endpoint to your MCP client config (Claude Desktop / Cline / Cursor / Windsurf / Any MCP-compatible agent).",
            },
            {
              n: "2",
              title: "Paste API Key",
              desc: "Drop in a zc_live_ or zc_test_ key. The agent will use it for all authenticated ledger operations automatically.",
            },
            {
              n: "3",
              title: "Ask Anything",
              desc: 'Start with: "What was our Scope 2 electricity footprint last month?" Your agent will call the MCP server and reason over the ledger.',
            },
          ].map((s) => (
            <div
              key={s.n}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm flex items-start gap-4"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent-green text-white text-sm font-bold shrink-0">
                {s.n}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-text-main leading-snug">{s.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MCP Server Endpoint Banner */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-accent-green/30 bg-gradient-to-br from-[#00875A]/5 via-white to-transparent dark:from-accent-green/10 dark:via-neutral-800 dark:to-transparent shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[22px]">cable</span>
            <h3 className="text-xl font-extrabold text-neutral-800 dark:text-text-main">MCP Server Endpoint</h3>
          </div>
          <div className="rounded-xl border border-accent-green/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-accent-green/5 dark:bg-accent-green/10 border-b border-accent-green/15">
              <div className="flex items-center gap-2">
                <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded-md bg-accent-green text-white uppercase tracking-wider">POST</span>
                <span className="text-xs font-mono font-bold text-text-main">/api/v1/mcp</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-green-text">
                <span className="relative flex h-1.5 w-1.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-green"></span>
                </span>
                Streaming SSE
              </span>
            </div>
            <CodeBlock
              copyId="mcp-endpoint"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "name": "zerocarbon-mcp",
  "url": "https://api.zerocarbon.org.in/api/v1/mcp",
  "transport": "sse",
  "headers": {
    "Authorization": "Bearer ${process.env.ZEROCARBON_API_KEY}"
  }
}`}
            />
          </div>
        </div>

        {/* Client Config Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Client Config Examples</h3>
          <div className="grid gap-4">
            {/* Claude Desktop */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 uppercase">claude_desktop_config.json</span>
              </div>
              <CodeBlock
                copyId="mcp-claude-config"
                language="json"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={JSON.stringify({
                  mcpServers: {
                    zerocarbon: {
                      url: "https://api.zerocarbon.org.in/api/v1/mcp",
                      transport: "sse",
                      headers: {
                        "Authorization": "Bearer ${ZEROCARBON_API_KEY}"
                      }
                    }
                  }
                }, null, 2)}
              />
            </div>
            {/* Cline (VSCode) */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-blue-600 text-white uppercase">Cline (VSCode)</span>
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-violet-600 text-white uppercase">Roo Code</span>
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-cyan-600 text-white uppercase">Cursor</span>
              </div>
              <div className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 text-xs text-text-main leading-relaxed">
                <p>
                  <strong>Settings → MCP Servers → Add Server →</strong> paste:
                </p>
              </div>
              <CodeBlock
                copyId="mcp-cline-config"
                language="json"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={JSON.stringify({
                  "type": "sse",
                  "name": "ZeroCarbon",
                  "url": "https://api.zerocarbon.org.in/api/v1/mcp",
                  "headers": {
                    "Authorization": "Bearer ${ZEROCARBON_API_KEY}"
                  }
                }, null, 2)}
              />
            </div>
          </div>
        </div>

        {/* Exposed MCP Tools */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Exposed MCP Tools</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Every tool is callable by your AI agent with full schema validation and audit logging.
          </p>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Tool Name</th>
                  <th scope="col" className="px-5 py-3 font-bold">Scope</th>
                  <th scope="col" className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["carbon.activities.submit", "Write", "Ingest one or more carbon activities with idempotency protection."],
                  ["carbon.emissions.get", "Read", "Retrieve aggregated emissions with scope & category breakdowns."],
                  ["carbon.ledger.balance", "Read", "Fetch the Scope 1 / 2 / 3 double-entry ledger balance for a period."],
                  ["carbon.reports.generate", "Write", "Generate BRSR / GHG Protocol compliance reports (PDF/CSV/Excel)."],
                  ["carbon.marketplace.checkout", "Write", "Create a Dodo Payments checkout session for offset credits."],
                  ["rag.documents.search", "Read", "Semantic search (pgvector) over your uploaded invoice & bill corpus."],
                  ["mcp.audit.trail", "Read", "Retrieve SHA-256 hash chain audit history for an activity."],
                ].map(([tool, scope, desc], i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800 hover:bg-instructions-bg transition-colors">
                    <td className="px-5 py-3.5">
                      <code className="font-mono text-[11px] font-bold text-accent-green-text break-all block">{tool}</code>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 text-[9.5px] font-extrabold rounded-full uppercase tracking-wider ${
                        scope === "Write" ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/15" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15"
                      }`}>{scope}</span>
                    </td>
                    <td className="px-5 py-3.5 text-text-muted leading-relaxed">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Test Connection */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">check_circle</span>
            Test the Connection
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Once connected, send this prompt to confirm the handshakes:
          </p>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#00875A]/5 via-white to-white dark:from-[#00875A]/10 dark:via-neutral-800 dark:to-neutral-800 border border-accent-green/15 text-xs font-medium text-neutral-800 dark:text-text-main leading-relaxed italic">
            &ldquo;Please use the ZeroCarbon MCP server to list the available carbon accounting tools and retrieve my current Scope 1 / Scope 2 ledger balances for this fiscal year.&rdquo;
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: AI DEVELOPER GUIDE ---------------- */}
      <section id="ai-developer-guide" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-violet-600 text-white uppercase tracking-wider">
                  AI / LLM
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-purple-600 text-white uppercase tracking-wider">
                  DEVELOPER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                AI Developer Guide
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Deep-dive guide for building autonomous carbon accounting agents on top of the ZeroCarbon MCP. Covers ReAct patterns, prompt chaining, RAG over invoices, and self-healing retries.
          </p>
        </div>

        {/* Reasoning Loop Architecture */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-violet-500/25 bg-gradient-to-br from-violet-500/5 via-white to-transparent dark:from-violet-500/10 dark:via-neutral-800 dark:to-transparent shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-600 dark:text-violet-400 text-[22px]">hub</span>
            <h3 className="text-xl font-extrabold text-neutral-800 dark:text-text-main">Autonomous Reasoning Loop</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            The ZeroCarbon MCP runs a <strong className="text-text-main">ReAct-style while loop</strong> (capped at 10 iterations) so the agent can dynamically chain tools instead of firing a single-shot answer.
          </p>
          <div className="rounded-xl border border-violet-500/15 overflow-hidden bg-white dark:bg-neutral-800">
            <div className="px-4 py-2 bg-violet-500/5 dark:bg-violet-500/10 text-[10px] font-extrabold uppercase tracking-wider text-violet-700 dark:text-violet-300 border-b border-violet-500/10">
              Loop Structure
            </div>
            <div className="p-4 space-y-2">
              {[
                { step: "Thought", label: "LLM reasons about the user question, plans which tools to call." },
                { step: "Action", label: "Calls one or more MCP tools (parallelised with Promise.all when independent)." },
                { step: "Observation", label: "Receives the JSON response (or structured error) from the ledger." },
                { step: "Self-Heal (if needed)", label: "On Prisma / validation errors → injects error back into LLM and retries." },
                { step: "Answer", label: "Emits the final grounded answer with SHA-256 audit hashes for every claim." },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-instructions-bg/60 border border-outline-variant/15">
                  <span className="inline-flex items-center justify-center shrink-0 w-20 px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-violet-500 text-white uppercase tracking-wider mt-0.5">
                    {row.step}
                  </span>
                  <span className="text-xs text-text-main leading-relaxed">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Prompt Patterns */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Recommended Prompt Patterns</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Copy paste these system prompt blocks into your favourite agent for best performance.
          </p>

          <div className="grid gap-4">
            {/* Audit-Style */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-[#00875A] text-white uppercase">Pattern 1</span>
                <h4 className="text-sm font-bold text-text-main">Audit-Style Grounded Answers</h4>
              </div>
              <CodeBlock
                copyId="ai-prompt-audit"
                language="markdown"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={"You are ZeroCarbon Auditor, a senior carbon accounting assistant.\n\nRULES — Non-negotiable output contract:\n1. Every emissions number MUST come from a call to the carbon.* MCP tools.\n2. Never estimate, never guess — if the data is missing, CALL THE TOOL.\n3. Every claim MUST be followed by:\n   - [activity_id: act_xxx] or\n   - [ledger_hash: sha256:xxx]\n4. If a Prisma / validation error is returned, read the message, adjust the\n   arguments, and RETRY the same MCP call (self-heal) — do not show errors to the user.\n5. Always break totals into Scope 1 / Scope 2 / Scope 3 percentages."}
              />
            </div>

            {/* RAG Invoice Audit */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-amber-500 text-white uppercase">Pattern 2</span>
                <h4 className="text-sm font-bold text-text-main">RAG + Invoice Audit</h4>
              </div>
              <CodeBlock
                copyId="ai-prompt-rag"
                language="markdown"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={"When asked about a bill, invoice, or utility statement:\n\n  FLOW:\n  1. ALWAYS call rag.documents.search first — search using the supplier name,\n     the month, and the amount.\n  2. If documents match → extract quantity (kWh, liters, kg) from the OCR text.\n  3. Call carbon.activities.submit with the parsed data + idempotency key =\n     SHA256(date + supplier + amount).\n  4. Return: the original invoice snippet + the calculated kg CO2e +\n     confidence score breakdown.\n\n  NEVER submit an activity without first searching the corpus when the user\n  references a physical bill. This is the #1 cause of duplicate writes."}
              />
            </div>

            {/* Offset Flow */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-rose-500 text-white uppercase">Pattern 3</span>
                <h4 className="text-sm font-bold text-text-main">Offset Purchase Flow</h4>
              </div>
              <CodeBlock
                copyId="ai-prompt-offset"
                language="markdown"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={"When the user wants to \"offset\" or \"neutralize\" emissions:\n\n  1. Call carbon.ledger.balance to get the current NET balance (Scope1/2/3).\n  2. Confirm the tonnes CO2e with the user explicitly.\n  3. Call carbon.marketplace.checkout (NEVER create offsets without calling\n     this endpoint — taxes + VAT are computed by Dodo Payments MoR).\n  4. Return: checkout_url + the OffsetCertificate record that will be issued\n     after payment confirmation.\n\n  IMPORTANT: Do NOT skip step 2. Offset purchases are billable and the user\n  MUST confirm tonnage before you emit a checkout link."}
              />
            </div>
          </div>
        </div>

        {/* RAG Pipeline Diagram (text) */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">RAG Pipeline (Invoices → Embeddings → Ledger)</h3>
          <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="grid gap-2 md:grid-cols-5">
              {[
                { t: "1", title: "Upload", desc: "PDF bill via drag-and-drop or API", icon: "upload_file" },
                { t: "2", title: "OCR", desc: "Cloudinary text extraction pipeline", icon: "document_scanner" },
                { t: "3", title: "Embed", desc: "Gemini 2.5 → pgvector (768-dim)", icon: "vectors" },
                { t: "4", title: "Parse", desc: "Agent extracts qty + period + supplier", icon: "data_object" },
                { t: "5", title: "Ledger", desc: "carbon.activities.submit with idempotency", icon: "account_balance" },
              ].map((step) => (
                <div key={step.t} className="relative p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 text-center space-y-1.5">
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-violet-600 text-white text-[11px] font-extrabold">
                      {step.t}
                    </div>
                    <span className="material-symbols-outlined text-violet-600 dark:text-violet-400 text-[18px]">{step.icon}</span>
                  </div>
                  <div className="text-xs font-extrabold text-text-main">{step.title}</div>
                  <div className="text-[10.5px] text-text-muted leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border-2 border-amber-500/25 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[20px]">bug_report</span>
            Agent Self-Healing — Intercepted Errors
          </h3>
          <p className="text-xs text-text-muted leading-relaxed">
            These error classes are <strong>never shown to the user</strong> — the MCP server catches them and sends them privately back into the LLM context with a RETRY instruction.
          </p>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Error Class</th>
                  <th scope="col" className="px-5 py-3 font-bold">Root Cause</th>
                  <th scope="col" className="px-5 py-3 font-bold">Auto-Heal Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["Prisma P2002", "Duplicate unique constraint on idempotency_key", "Return {duplicate: true} + existing record; agent skips write."],
                  ["ZodValidationError", "Activity payload failed schema validation", "Inject field path + reason; agent rebuilds payload."],
                  ["PgVectorIndexError", "RAG embedding was not yet indexed", "Exponential backoff 500ms → 2s → retry same search."],
                  ["DodoRateLimit (429)", "Marketplace checkout throttled", "Exponential backoff up to 3 retries with jitter."],
                  ["ScopeMismatch", "Activity category does not match declared scope", "Agent corrects the scope field based on GHG Protocol matrix."],
                ].map(([ec, rc, hs], i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3.5">
                      <code className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded">{ec}</code>
                    </td>
                    <td className="px-5 py-3.5 text-text-muted leading-relaxed">{rc}</td>
                    <td className="px-5 py-3.5 text-text-main leading-relaxed">{hs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: AUTHENTICATION ---------------- */}
      <section id="authentication" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3 mb-4">
            Authentication
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Learn how to securely authenticate your API requests using API keys.
          </p>
        </div>

        {/* Overview */}
        <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Overview</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            The ZeroCarbon API uses <strong>API Keys</strong> for authentication. Every API request must include your API key in the Authorization header using the Bearer authentication scheme.
          </p>
        </div>

        {/* Getting an API Key */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Getting an API Key</h3>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Prerequisites</h4>
            <p className="text-sm text-text-muted mb-2">API access requires one of the following:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li><strong>Professional Plan (₹14,999/month)</strong> + API Add-on Pack (₹999–₹2,999/month)</li>
              <li><strong>Enterprise Plan (₹39,999/month)</strong> (includes unlimited API keys)</li>
            </ul>
            <p className="text-xs text-text-muted mt-3">
              Note: Trial and Starter plans do not include API access.{" "}
              <a href="#" className="text-accent-green font-bold underline underline-offset-2">
                Upgrade your plan
              </a>{" "}
              to get started.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Generate an API Key</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Log in to your ZeroCarbon dashboard.</li>
              <li>Navigate to: <strong>Settings → Billing → API Keys</strong></li>
              <li>Click <strong>Create New API Key</strong>.</li>
              <li>Choose either:
                <div className="flex flex-wrap gap-2 mt-2 ml-5">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10">
                    Test (zc_test_)
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-accent-green/10 text-accent-green-text border border-accent-green/10">
                    Live (zc_live_)
                  </span>
                </div>
              </li>
              <li>Give the key a descriptive name (e.g., Production API or Development).</li>
              <li>Copy the generated key immediately—it will only be shown once.</li>
            </ol>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-500 text-[22px] shrink-0 select-none">
              error
            </span>
            <div>
              <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">Important Security Notice</h5>
              <p className="text-xs text-amber-600/80 dark:text-amber-300 leading-relaxed">
                Your API key is displayed only once during creation. Store it securely using environment variables or a password manager. If you lose the key, you must generate a new one.
              </p>
            </div>
          </div>
        </div>

        {/* Making Authenticated Requests */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Making Authenticated Requests</h3>
          <p className="text-sm text-text-muted">
            Include your API key in the Authorization header using the Bearer scheme.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-bold text-text-main">cURL Example</h4>
              <CodeBlock
                copyId="auth-curl"
                language="bash"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`curl https://api.zerocarbon.org.in/v1/company/dashboard \\
  -H "Authorization: Bearer zc_live_abc123xyz789..." \\
  -H "Content-Type: application/json"`}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Node.js / TypeScript</h4>
              <CodeBlock
                copyId="auth-node"
                language="typescript"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`import { ZeroCarbon } from "zerocarbon-nodejs-sdk";
import * as dotenv from "dotenv";

dotenv.config();

const client = new ZeroCarbon({
  apiKey: process.env.ZEROCARBON_API_KEY!,
  baseUrl: "https://api.zerocarbon.org.in/v1",
});

// SDK automatically includes the Authorization header
const dashboard = await client.dashboard.get();`}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Python</h4>
              <CodeBlock
                copyId="auth-py"
                language="python"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`import os
from dotenv import load_dotenv
from zerocarbon import ZeroCarbon

load_dotenv()

client = ZeroCarbon(
    api_key=os.getenv("ZEROCARBON_API_KEY"),
    base_url="https://api.zerocarbon.org.in/v1"
)

# SDK automatically includes the Authorization header
dashboard = client.dashboard.get()`}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Raw HTTP Request</h4>
              <CodeBlock
                copyId="auth-fetch"
                language="typescript"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`const response = await fetch(
  "https://api.zerocarbon.org.in/v1/company/dashboard",
  {
    method: "GET",
    headers: {
      Authorization: \`Bearer \${process.env.ZEROCARBON_API_KEY}\`,
      "Content-Type": "application/json",
    },
  }
);

const data = await response.json();`}
              />
            </div>
          </div>
        </div>

        {/* API Key Types */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">API Key Types</h3>
          <p className="text-sm text-text-muted">
            ZeroCarbon provides two types of API keys for different environments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm space-y-2">
              <h4 className="font-bold text-text-main">Live Keys</h4>
              <p className="text-sm text-text-muted">
                Prefix: <code className="font-mono font-bold text-accent-green-text">zc_live_</code>
              </p>
              <p className="text-xs text-text-muted leading-relaxed mt-1">
                Use Live keys in production.
              </p>
              <ul className="list-disc list-inside text-xs text-text-muted space-y-1 mt-2">
                <li>Real data</li>
                <li>Persistent records</li>
                <li>Billing applies</li>
                <li>Production rate limits</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-blue-500/20 bg-white dark:bg-neutral-800 shadow-sm space-y-2">
              <h4 className="font-bold text-text-main">Test Keys</h4>
              <p className="text-sm text-text-muted">
                Prefix: <code className="font-mono font-bold text-blue-500">zc_test_</code>
              </p>
              <p className="text-xs text-text-muted leading-relaxed mt-1">
                Use Test keys during development and testing.
              </p>
              <ul className="list-disc list-inside text-xs text-text-muted space-y-1 mt-2">
                <li>Sandbox environment</li>
                <li>Isolated data</li>
                <li>Resettable database</li>
                <li>No billing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Add-on Packs */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">API Add-on Packs (Professional Plan)</h3>
          <p className="text-sm text-text-muted">
            Professional Plan users must purchase one of the following API access packs.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Pack</th>
                  <th scope="col" className="px-5 py-3 font-bold">Access Level</th>
                  <th scope="col" className="px-5 py-3 font-bold">Endpoints</th>
                  <th scope="col" className="px-5 py-3 font-bold">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  { pack: "Pack 1", access: "Read-only", endpoints: "GET endpoints only", price: "₹999/month", popular: false },
                  { pack: "Pack 2", access: "Read + Write", endpoints: "GET + POST + PUT", price: "₹1,999/month", popular: true },
                  { pack: "Pack 3", access: "Full Access", endpoints: "All endpoints (GET/POST/PUT/DELETE)", price: "₹2,999/month", popular: false },
                ].map((row) => (
                  <tr key={row.pack} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-main">{row.pack}</span>
                        {row.popular && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent-green text-white">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-text-muted font-semibold">{row.access}</td>
                    <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{row.endpoints}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-accent-green-text whitespace-nowrap">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong>Enterprise Plan</strong> includes unlimited API keys with full API access—no additional API packs are required.
          </p>
        </div>

        {/* Security Best Practices */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Security Best Practices</h3>
          <div className="space-y-3">
            {/* 1 */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <h4 className="font-bold text-text-main">Store Keys in Environment Variables</h4>
              <p className="text-sm text-text-muted">
                Never hardcode API keys in your source code.
              </p>
              <div className="mt-2">
                <div className="text-xs font-bold text-text-muted mb-2">Example:</div>
                <CodeBlock
                  copyId="env-example"
                  language="bash"
                  onCopy={onCopy}
                  copiedTextId={copiedTextId}
                  code={`# Add this file to .gitignore
ZEROCARBON_API_KEY=zc_live_abc123xyz789...`}
                />
              </div>
            </div>

            {/* 2 */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <h4 className="font-bold text-text-main">Rotate Keys Regularly</h4>
              <p className="text-sm text-text-muted">
                Periodically rotate API keys to improve security.
              </p>
              <div>
                <div className="text-sm font-bold text-text-main mb-2">Recommended workflow:</div>
                <ol className="list-decimal list-inside space-y-1.5 text-sm text-text-muted">
                  <li>Generate a new key.</li>
                  <li>Update your application.</li>
                  <li>Verify everything works.</li>
                  <li>Delete the old key.</li>
                </ol>
                <p className="text-xs text-text-muted mt-2 italic">This prevents downtime during key rotation.</p>
              </div>
            </div>

            {/* 3 */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <h4 className="font-bold text-text-main">Use Separate Keys per Environment</h4>
              <p className="text-sm text-text-muted">
                Create separate keys for:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Development", "Staging", "Production"].map((env) => (
                  <div
                    key={env}
                    className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 text-center"
                  >
                    <span className="text-xs font-bold text-accent-green-text">{env}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                This reduces risk and simplifies key rotation.
              </p>
            </div>

            {/* 4 */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <h4 className="font-bold text-text-main">Restrict Key Permissions</h4>
              <p className="text-sm text-text-muted">
                When supported, restrict API keys by:
              </p>
              <div className="flex flex-wrap gap-2">
                {["IP address", "Domain", "Environment"].map((r) => (
                  <span
                    key={r}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-step-bg border border-accent-green-text/15 text-accent-green-text"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                to reduce exposure in case a key is compromised.
              </p>
            </div>
          </div>
        </div>

        {/* Authentication Errors */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Authentication Errors</h3>
          <p className="text-sm text-text-muted">
            If authentication fails, the API returns <strong className="text-red-500">401 Unauthorized</strong>.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-text-main">Example Response</h4>
            <CodeBlock
              copyId="auth-error"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked",
    "status": 401
  }
}`}
            />
          </div>

          <div>
            <h4 className="font-bold text-text-main mb-2">Common Authentication Errors</h4>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-bold">Error Code</th>
                    <th scope="col" className="px-5 py-3 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { code: "INVALID_API_KEY", desc: "API key is malformed or does not exist" },
                    { code: "API_KEY_REVOKED", desc: "API key has been deleted or revoked" },
                    { code: "API_KEY_EXPIRED", desc: "API key has expired (if expiration is enabled)" },
                    { code: "RATE_LIMIT_EXCEEDED", desc: "Too many requests. Wait or upgrade your rate limits." },
                  ].map((row) => (
                    <tr key={row.code} className="bg-white dark:bg-neutral-800">
                      <td className="px-5 py-3.5">
                        <code className="font-mono font-bold text-accent-green-text text-xs">{row.code}</code>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: API REFERENCE ---------------- */}
      <section id="api-reference" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3 mb-4">
            API Reference
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Complete reference for all ZeroCarbon API endpoints and request formats.
          </p>
        </div>

        {/* Base URL */}
        <div className="p-4 rounded-xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm flex items-center gap-3">
          <h4 className="font-bold text-text-main shrink-0">Base URL</h4>
          <code className="font-mono text-sm text-accent-green-text break-all select-all">https://api.zerocarbon.org.in/v1</code>
        </div>

        {/* Endpoints Overview */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Endpoints Overview</h3>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Endpoint</th>
                  <th scope="col" className="px-5 py-3 font-bold">Method</th>
                  <th scope="col" className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  { method: "POST", endpoint: "/activities", desc: "Submit carbon emission activities", accent: "bg-blue-500/10 text-blue-500 border-blue-500/10" },
                  { method: "GET", endpoint: "/emissions", desc: "Retrieve aggregated emissions", accent: "bg-accent-green/10 text-accent-green-text border-accent-green/10" },
                  { method: "POST", endpoint: "/reports", desc: "Generate compliance reports", accent: "bg-purple-500/10 text-purple-500 border-purple-500/10" },
                  { method: "Various", endpoint: "Additional endpoints", desc: "Bulk upload, activity management, emission factors", accent: "bg-neutral-500/10 text-neutral-500 border-neutral-500/10" },
                ].map((row) => (
                  <tr key={row.endpoint} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3.5">
                      <code className="font-mono font-bold text-text-main text-xs">{row.endpoint}</code>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${row.accent}`}>
                        {row.method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Activities */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-outline-variant/10">
            <span className="px-3 py-1 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/10 uppercase tracking-wider">
              POST
            </span>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Submit Activities</h3>
          </div>
          <p className="text-sm text-text-muted">
            Submit one or multiple carbon emission activities.
          </p>
          <div>
            <div className="text-sm font-bold text-text-main mb-2">Endpoint</div>
            <div className="px-4 py-2.5 rounded-xl bg-instructions-bg border border-outline-variant/20">
              <code className="font-mono text-sm font-bold text-text-main">POST /activities</code>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Request Body</h4>
            <CodeBlock
              copyId="activity-submission"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`interface ActivitySubmission {
  activity_type: string;     // "electricity", "fuel", "travel", etc.
  scope: "1" | "2" | "3";
  quantity: number;
  unit: string;

  period: {
    start: string;           // ISO 8601
    end: string;
  };

  location: {
    country: string;
    state?: string;
    city?: string;
    grid_region?: string;
  };

  source?: {
    type: string;            // "manual", "api", "csv"
    confidence: number;      // 0.0 - 1.0
    name?: string;
    reference?: string;
  };

  metadata?: Record<string, any>;
}`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Example Request</h4>
            <CodeBlock
              copyId="api-submit-activity"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`const response = await fetch(
  "https://api.zerocarbon.org.in/v1/activities",
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activity_type: "electricity",
      scope: "2",
      quantity: 1500,
      unit: "kWh",

      period: {
        start: "2026-02-01",
        end: "2026-02-28",
      },

      location: {
        country: "IN",
        state: "Maharashtra",
        city: "Mumbai",
      },

      source: {
        type: "manual",
        confidence: 1.0,
        name: "Monthly Utility Bill",
      },
    }),
  }
);

const data = await response.json();`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Response</h4>
            <CodeBlock
              copyId="api-response"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "success": true,
  "data": {
    "activity_id": "act_abc123xyz789",
    "emissions_kg_co2e": 1125.50,
    "confidence_score": 0.95,
    "emission_factor": {
      "value": 0.751,
      "unit": "kg CO2e/kWh",
      "source": "India Central Electricity Authority 2025",
      "region": "Western Grid"
    },
    "created_at": "2026-02-15T10:30:00Z"
  },
  "meta": {
    "timestamp": "2026-02-15T10:30:00Z",
    "request_id": "req_xyz789abc123"
  }
}`}
            />
          </div>
        </div>

        {/* Get Emissions */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-outline-variant/10">
            <span className="px-3 py-1 text-[11px] font-bold rounded-lg bg-accent-green/10 text-accent-green-text border border-accent-green/10 uppercase tracking-wider">
              GET
            </span>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Get Emissions</h3>
          </div>
          <p className="text-sm text-text-muted">
            Retrieve aggregated emissions for a specified period.
          </p>
          <div>
            <div className="text-sm font-bold text-text-main mb-2">Endpoint</div>
            <div className="px-4 py-2.5 rounded-xl bg-instructions-bg border border-outline-variant/20">
              <code className="font-mono text-sm font-bold text-text-main">GET /emissions</code>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Query Parameters</h4>
            <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/10 text-text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-bold">Parameter</th>
                    <th scope="col" className="px-5 py-3 font-bold">Type</th>
                    <th scope="col" className="px-5 py-3 font-bold">Required</th>
                    <th scope="col" className="px-5 py-3 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { param: "start_date", type: "string", required: true, desc: "ISO 8601 start date" },
                    { param: "end_date", type: "string", required: true, desc: "ISO 8601 end date" },
                    { param: "scope", type: "string", required: false, desc: "Filter by Scope (1, 2, or 3)" },
                    { param: "group_by", type: "string", required: false, desc: "day, week, month, year" },
                    { param: "activity_type", type: "string", required: false, desc: "Filter by activity type" },
                  ].map((row) => (
                    <tr key={row.param} className="bg-white dark:bg-neutral-800">
                      <td className="px-5 py-3.5">
                        <code className="font-mono font-bold text-accent-green-text text-xs">{row.param}</code>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-text-muted">{row.type}</td>
                      <td className="px-5 py-3.5">
                        {row.required ? (
                          <span className="text-[11px] font-bold text-green-600 dark:text-green-400">✅</span>
                        ) : (
                          <span className="text-xs text-text-muted">No</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Example Request</h4>
            <CodeBlock
              copyId="get-emissions-curl"
              language="bash"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`curl "https://api.zerocarbon.org.in/v1/emissions?start_date=2026-02-01&end_date=2026-02-28&group_by=month" \\
-H "Authorization: Bearer YOUR_API_KEY"`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Response</h4>
            <CodeBlock
              copyId="get-emissions-resp"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "success": true,
  "data": {
    "total_kg_co2e": 45678.90,

    "period": {
      "start": "2026-02-01",
      "end": "2026-02-28"
    },

    "breakdown": [
      {
        "scope": "1",
        "emissions_kg_co2e": 12345.67,
        "percentage": 27.0
      },
      {
        "scope": "2",
        "emissions_kg_co2e": 23456.78,
        "percentage": 51.3
      },
      {
        "scope": "3",
        "emissions_kg_co2e": 9876.45,
        "percentage": 21.7
      }
    ],

    "by_activity_type": [
      {
        "activity_type": "electricity",
        "emissions_kg_co2e": 20000.00,
        "count": 12
      },
      {
        "activity_type": "fuel",
        "emissions_kg_co2e": 15000.00,
        "count": 8
      }
    ]
  }
}`}
            />
          </div>
        </div>

        {/* Generate Reports */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-outline-variant/10">
            <span className="px-3 py-1 text-[11px] font-bold rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/10 uppercase tracking-wider">
              POST
            </span>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Generate Reports</h3>
          </div>
          <p className="text-sm text-text-muted">
            Generate compliance reports in PDF, CSV, Excel, or JSON format.
          </p>
          <div>
            <div className="text-sm font-bold text-text-main mb-2">Endpoint</div>
            <div className="px-4 py-2.5 rounded-xl bg-instructions-bg border border-outline-variant/20">
              <code className="font-mono text-sm font-bold text-text-main">POST /reports</code>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Request Body</h4>
            <CodeBlock
              copyId="report-request"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`interface ReportRequest {
  report_type: "brsr" | "ghg_protocol" | "custom";

  period: {
    start: string;
    end: string;
  };

  format: "pdf" | "csv" | "excel" | "json";

  include: {
    scope_1?: boolean;
    scope_2?: boolean;
    scope_3?: boolean;
    verification?: boolean;
    audit_trail?: boolean;
  };
}`}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Example Request</h4>
            <CodeBlock
              copyId="report-example"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`const response = await fetch(
  "https://api.zerocarbon.org.in/v1/reports",
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      report_type: "brsr",

      period: {
        start: "2025-04-01",
        end: "2026-03-31",
      },

      format: "pdf",

      include: {
        scope_1: true,
        scope_2: true,
        scope_3: true,
        verification: true,
      },
    }),
  }
);

const data = await response.json();`}
            />
          </div>
        </div>

        {/* Additional Endpoints */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Additional Endpoints</h3>
          <p className="text-sm text-text-muted">
            Additional endpoints available in the API include:
          </p>
          <div className="grid gap-2">
            {[
              "Upload multiple activities via CSV or JSON",
              "Retrieve activity details by ID",
              "Update an existing activity",
              "Soft delete an activity with audit logging",
              "List available emission factors",
              "Manage API keys",
              "Company dashboard",
              "Verification status",
              "Audit history",
            ].map((e, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-sm text-text-main leading-relaxed">{e}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Response Format */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-red-500/15 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-outline-variant/10">
            <span className="material-symbols-outlined text-red-500 text-[22px]">error</span>
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Error Response Format</h3>
          </div>
          <p className="text-sm text-text-muted">
            All API errors follow a consistent structure.
          </p>
          <CodeBlock
            copyId="error-format"
            language="json"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "status": 400,
    "details": {
      "field": "quantity",
      "reason": "Must be a positive number"
    }
  },
  "meta": {
    "timestamp": "2026-02-15T10:30:00Z",
    "request_id": "req_xyz789"
  }
}`}
          />
          <div>
            <h4 className="text-sm font-bold text-text-main mb-2">Common Error Codes</h4>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/10 text-text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-bold">Status</th>
                    <th scope="col" className="px-5 py-3 font-bold">Code</th>
                    <th scope="col" className="px-5 py-3 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { status: "400", code: "BAD_REQUEST", desc: "Invalid request parameters" },
                    { status: "401", code: "UNAUTHORIZED", desc: "Authentication failed" },
                    { status: "403", code: "FORBIDDEN", desc: "Insufficient permissions" },
                    { status: "404", code: "NOT_FOUND", desc: "Requested resource not found" },
                    { status: "429", code: "RATE_LIMIT_EXCEEDED", desc: "Too many requests" },
                    { status: "500", code: "INTERNAL_ERROR", desc: "Internal server error" },
                  ].map((row) => (
                    <tr key={row.code} className="bg-white dark:bg-neutral-800">
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${
                          parseInt(row.status) < 400 ? "bg-accent-green/10 text-accent-green-text border-accent-green/10" :
                          parseInt(row.status) < 500 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10" :
                          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="font-mono font-bold text-accent-green-text text-xs">{row.code}</code>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- INFRASTRUCTURE & LEDGER: CANONICAL ACTIVITY MODEL ---------------- */}
      <section id="canonical-activity-model" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 uppercase tracking-wider">
                  INFRASTRUCTURE &amp; LEDGER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Canonical Activity Model
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Single, unbreakable data contract for all carbon activities. Every emission flowing through the ledger conforms to this exact schema — regardless of whether it arrives via CSV, API, ERP integration, IoT telemetry, or drag-and-drop OCR.
          </p>
        </div>

        {/* 8 Pillars in 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: "Standardized Fields", desc: "activity_type · scope · quantity · unit · period · location · source · metadata — 35+ total typed fields.", icon: "data_object" },
            { title: "Full Type Safety", desc: "TypeScript interfaces + Python dataclasses are generated from the same Zod source of truth.", icon: "verified" },
            { title: "Zod Validation", desc: "Every field has precise min/max, enum, regex, and temporal checks with detailed developer error messages.", icon: "fact_check" },
            { title: "Idempotency Guarantees", desc: "SHA-256 hash of (date + supplier + amount) is enforced at write time — duplicates are skipped atomically.", icon: "lock_reset" },
            { title: "Scope Segregation", desc: "Schema-level enums ensure Scope 1/2/3 records never bleed across ledgers at ingestion time.", icon: "account_balance_wallet" },
            { title: "Temporal Rigor", desc: "period.start and period.end are always ISO 8601; overlaps are detected during ledger append.", icon: "schedule" },
            { title: "Source Provenance", desc: "Every record carries source.type (meter / api / csv / manual) and source.confidence [0–1].", icon: "history" },
            { title: "Extensible Metadata", desc: "Record<string, any> metadata bag for custom attributes (fuel_type, vehicle_count, etc.).", icon: "extension" },
          ].map((p, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-text-main leading-snug">{p.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Contract code */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">The TypeScript Contract</h3>
          <CodeBlock
            copyId="canonical-model-ts"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`export interface CanonicalActivity {
  // Generated by the ledger
  activity_id?: \`act_\${string}\`;
  idempotency_key?: string;       // SHA-256 (unique, enforced)

  // Tenant linkage (auto-injected by API key)
  organization_id: \`org_\${string}\`;

  // Emission identity
  activity_type: ActivityType;     // 8 standard types: electricity | fuel | travel | ...
  scope: "1" | "2" | "3";
  category?: string;               // GHG Protocol category label

  // Consumption
  quantity: number;                // Strictly positive finite
  unit: Unit;                      // "kWh" | "liters" | "kg" | "km" | ...

  // Reporting period (ISO 8601)
  period: { start: string; end: string };

  // Spatial
  location: {
    country: string;               // ISO 3166-1 alpha-2
    state?: string;
    city?: string;
    grid_region?: string;
    facility_id?: \`fac_\${string}\`;
  };

  // Provenance + confidence inputs
  source: {
    type: "meter" | "api" | "supplier" | "csv" | "manual" | "estimate";
    confidence: number;            // 0.0 – 1.0
    name?: string;
    reference?: string;
  };

  // Customer extensibility
  metadata?: Record<string, JsonValue>;
}`}
          />
        </div>

        {/* Idempotency Key Rule */}
        <div className="space-y-2 p-5 sm:p-6 rounded-2xl border-2 border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-500 text-[22px]">gavel</span>
            <h3 className="text-lg font-extrabold text-neutral-800 dark:text-text-main">Non-Negotiable Idempotency Rule</h3>
          </div>
          <p className="text-sm text-text-main font-semibold leading-relaxed">
            The server always computes its own <code className="font-mono font-bold text-rose-600 dark:text-rose-300 text-[11.5px] bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-rose-500/20">idempotency_key</code> and will <em>never</em> trust one sent by the client.
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            This closes a massive audit trail footgun: two clients submitting the same physical bill from different devices or SDK versions will <strong>always collapse to one canonical ledger write</strong> and return the same activity_id, never double-counting tonnes CO2e.
          </p>
        </div>
      </section>

      {/* ---------------- INFRASTRUCTURE & LEDGER: CONFIDENCE SCORING ---------------- */}
      <section id="confidence-scoring" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 uppercase tracking-wider">
                  INFRASTRUCTURE &amp; LEDGER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Confidence Scoring
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            5-factor weighted algorithm (0–100%) that quantifies <em>data quality, not quantity</em>. Every activity record returns a confidence score that downstream reports and audit trails reference explicitly.
          </p>
        </div>

        {/* Factor Table */}
        <div className="rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-bold">Factor</th>
                <th scope="col" className="px-5 py-3 font-bold text-center">Weight</th>
                <th scope="col" className="px-5 py-3 font-bold">Grading Ladder (best → worst)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {[
                { f: "Source Quality", w: "25%", chips: [["Meter", "95%"], ["API", "90%"], ["Supplier", "80%"], ["Manual", "70%"], ["Estimate", "50%"]], chipColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/15" },
                { f: "Data Completeness", w: "25%", chips: [["Required fields populated", "—"], ["Metadata richness", "—"]], chipColor: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/15" },
                { f: "Emission Factor Quality", w: "20%", chips: [["Region-specific", "95%"], ["National", "80%"], ["Global defaults", "60%"]], chipColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/15" },
                { f: "Temporal Accuracy", w: "15%", chips: [["Real-time", "98%"], ["Daily", "90%"], ["Monthly", "75%"], ["Annual", "55%"]], chipColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/15" },
                { f: "Methodological Rigor", w: "15%", chips: [["Tier 4", "98%"], ["Tier 3", "88%"], ["Tier 2", "72%"], ["Tier 1", "55%"]], chipColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/15" },
              ].map((row, i) => (
                <tr key={i} className="bg-white dark:bg-neutral-800">
                  <td className="px-5 py-4">
                    <span className="text-[12.5px] font-extrabold text-text-main">{row.f}</span>
                  </td>
                  <td className="px-5 py-4 text-center align-top">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-[#00875A]/10 text-[#00875A] dark:text-accent-green-text border border-[#00875A]/15">{row.w}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {row.chips.map(([label, pct], j) => (
                        <span
                          key={j}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${row.chipColor}`}
                        >
                          {label}
                          {pct !== "—" && <span className="opacity-75 font-mono">{pct}</span>}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ratings */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-base font-bold text-text-main">Overall Confidence Ratings</h3>
          <div className="grid gap-2 md:grid-cols-4">
            {[
              { label: "Excellent", pct: "≥ 85%", color: "bg-emerald-500", bar: "bg-emerald-500", txt: "text-emerald-700 dark:text-emerald-400" },
              { label: "Good", pct: "70 – 84%", color: "bg-lime-500", bar: "bg-lime-500", txt: "text-lime-700 dark:text-lime-400" },
              { label: "Fair", pct: "55 – 69%", color: "bg-amber-500", bar: "bg-amber-500", txt: "text-amber-700 dark:text-amber-400" },
              { label: "Poor", pct: "< 55%", color: "bg-rose-500", bar: "bg-rose-500", txt: "text-rose-700 dark:text-rose-400" },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${r.txt}`}>{r.label}</span>
                  <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold text-white" style={{ background: i === 0 ? "#10b981" : i === 1 ? "#84cc16" : i === 2 ? "#f59e0b" : "#f43f5e" }}>{r.pct}</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                  <div className={`h-full ${r.bar} rounded-full`} style={{ width: i === 0 ? "92%" : i === 1 ? "78%" : i === 2 ? "62%" : "40%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown response JSON */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Response Shape</h3>
          <CodeBlock
            copyId="confidence-response"
            language="json"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`{
  "confidence": {
    "overall": 89.7,
    "rating": "Good",
    "breakdown": {
      "source_quality":       { "score": 90, "weight": 25 },
      "data_completeness":    { "score": 95, "weight": 25 },
      "emission_factor_qual": { "score": 80, "weight": 20 },
      "temporal_accuracy":    { "score": 85, "weight": 15 },
      "methodological_rigor": { "score": 88, "weight": 15 }
    },
    "recommendations": [
      "Provide sub-monthly meter reads to raise Temporal Accuracy → 95%",
      "Switch from national to state-level grid factor for +12% overall"
    ]
  }
}`}
          />
        </div>
      </section>

      {/* ---------------- INFRASTRUCTURE & LEDGER: CARBON LEDGER ---------------- */}
      <section id="carbon-ledger" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 uppercase tracking-wider">
                  INFRASTRUCTURE &amp; LEDGER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Carbon Ledger (Double-Entry)
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Accounting-grade double-entry bookkeeping for emissions. Three independent scope ledgers (Scope 1 / Scope 2 / Scope 3) — every write records the exact before → delta → after balance, append-only, with SHA-256 chain integrity.
          </p>
        </div>

        {/* Transaction types */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-text-main">Transaction Types</h3>
            <div className="grid gap-2">
              {[
                { t: "emission_add",     dir: "+ DEBIT",  desc: "Increase gross tonnes on the scope ledger.", color: "bg-rose-500" },
                { t: "emission_reduce",  dir: "− CREDIT", desc: "Reduction / avoidance credit on the scope.", color: "bg-emerald-500" },
                { t: "offset_purchase",  dir: "− CREDIT", desc: "Post-purchase, pre-retirement offset accrual.", color: "bg-sky-500" },
                { t: "offset_retire",    dir: "− CREDIT", desc: "Finalized retirement → reduces NET balance.", color: "bg-violet-500" },
              ].map((tx, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold text-white shrink-0 mt-0.5 ${tx.color}`}>{tx.dir}</span>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <code className="font-mono text-[11.5px] font-extrabold text-accent-green-text break-all block">{tx.t}</code>
                    <span className="text-xs text-text-muted leading-relaxed">{tx.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Balance invariant */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-[#00875A]/25 bg-gradient-to-br from-[#00875A]/5 via-white to-white dark:from-[#00875A]/10 dark:via-neutral-800 dark:to-neutral-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00875A] text-[22px]">balance</span>
              <h3 className="text-base font-extrabold text-text-main">Balance Invariant</h3>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-[#00875A]/15 text-center space-y-2 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                <span className="font-extrabold text-slate-500">balance_before</span>
                <span className="text-slate-400">+</span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-300">transaction_amount</span>
                <span className="text-slate-400">=</span>
                <span className="font-extrabold text-[#00875A] dark:text-accent-green-text">balance_after</span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Every append is <strong className="text-text-main">atomic, serialisable, and audit-timestamped</strong>. Two concurrent ingests on the same scope cannot produce a torn read — Postgres <code className="font-mono text-[10.5px] font-bold bg-instructions-bg px-1 py-0.5 rounded border border-outline-variant/20">SERIALIZABLE</code> isolation is mandatory on the ledger writer.
            </p>

            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">Separate Ledgers (per tenant)</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: "Scope 1", c: "bg-emerald-500" },
                  { l: "Scope 2", c: "bg-sky-500" },
                  { l: "Scope 3", c: "bg-violet-500" },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-outline-variant/20 text-center space-y-1">
                    <div className={`mx-auto w-2 h-2 rounded-full ${s.c}`}></div>
                    <div className="text-[11px] font-extrabold text-text-main">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction example */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Example: Ledger Append (1,500 kWh Office Electricity)</h3>
          <CodeBlock
            copyId="ledger-append"
            language="json"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`{
  "ledger_entry_id": "led_2xJ9FkXq7vmc",
  "scope": "2",
  "transaction_type": "emission_add",
  "activity_id": "act_abc123xyz789",
  "period": { "start": "2026-02-01", "end": "2026-02-28" },

  "balance_before":    12450.75,
  "transaction_amount": 1125.50,
  "balance_after":     13576.25,

  "unit": "kg CO2e",
  "recorded_at": "2026-03-05T09:12:44.231Z",

  "integrity": {
    "prev_hash": "sha256:0f9a…c31d",
    "this_hash": "sha256:b27e…14aa",
    "chain_index": 1482
  }
}`}
          />
        </div>
      </section>

      {/* ---------------- INFRASTRUCTURE & LEDGER: INGEST TELEMETRY ---------------- */}
      <section id="ingest-telemetry" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 uppercase tracking-wider">
                  INFRASTRUCTURE &amp; LEDGER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Ingest Telemetry
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Observable ingestion pipeline: every write is tracked from <code className="font-mono font-bold text-[11px]">raw payload</code> through <code className="font-mono font-bold text-[11px]">OCR / validation / emission calc</code> to <code className="font-mono font-bold text-[11px]">ledger append</code>. Debug misaligned numbers in seconds instead of hours.
          </p>
        </div>

        {/* 5 Stage Pipeline */}
        <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-base font-extrabold text-text-main mb-3">5-Stage Ingestion Pipeline</h3>
          <div className="grid gap-2 md:grid-cols-5">
            {[
              { n: "1", name: "Receive",  desc: "Raw payload lands; signed. API key + tenant injection.", icon: "input", color: "bg-slate-700" },
              { n: "2", name: "Validate", desc: "Zod canonical-model pass. Bad fields fail fast.", icon: "fact_check", color: "bg-indigo-600" },
              { n: "3", name: "Dedupe",   desc: "idempotency_key SHA-256 vs ledger; short-circuit dupes.", icon: "filter_alt", color: "bg-rose-500" },
              { n: "4", name: "Calculate",desc: "Emission factor selection × quantity → kg CO2e + confidence.", icon: "calculate", color: "bg-amber-500" },
              { n: "5", name: "Append",   desc: "Ledger write (balance_before → after) + SHA-256 chain.", icon: "check_circle", color: "bg-[#00875A]" },
            ].map((st, i) => (
              <div key={i} className="relative p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 text-center space-y-1.5">
                {i < 4 && <span className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 text-slate-300 dark:text-neutral-600 material-symbols-outlined z-10">chevron_right</span>}
                <div className="flex items-center justify-between w-full mb-1">
                  <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-[11px] font-extrabold ${st.color}`}>{st.n}</div>
                  <span className={`material-symbols-outlined text-white text-[17px] p-0.5 rounded-md ${st.color}`}>{st.icon}</span>
                </div>
                <div className="text-xs font-extrabold text-text-main">{st.name}</div>
                <div className="text-[10.5px] text-text-muted leading-relaxed">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry fields */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Per-Activity Telemetry Record</h3>
          <CodeBlock
            copyId="ingest-tel"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`interface IngestTelemetry {
  ingest_id:      \`ing_\${string}\`;
  activity_id:    \`act_\${string}\` | null;  // null on failure
  status:         "received" | "validated" | "deduped" | "calculated" | "appended" | "failed";
  failure_reason: string | null;

  // Timings (ms) per stage — feed to your APM
  durations_ms: {
    validation:  number;
    dedup:       number;
    calc:        number;
    ledger_append: number;
    total:       number;
  };

  // Input fingerprint for audit reproduction
  input: {
    content_hash:  string;      // SHA-256 of canonical JSON
    size_bytes:    number;
    origin:        "api" | "csv" | "ocr" | "iot" | "mcp-agent";
    caller:        string;      // user_id / api_key_id / "ai-agent:{agent_id}"
  };

  // Chosen factor at calc time (provenance of the number)
  factor: {
    factor_id:     string;
    factor_value:  number;     // e.g. 0.751 kg CO2e / kWh
    factor_region: string;
    factor_source: string;     // "India CEA 2025"
    tier:          1 | 2 | 3 | 4;
  };
}`}
          />
        </div>

        {/* Rate Limits */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Ingest Rate Limits</h3>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Plan</th>
                  <th scope="col" className="px-5 py-3 font-bold">Burst (per min)</th>
                  <th scope="col" className="px-5 py-3 font-bold">Sustained (per hour)</th>
                  <th scope="col" className="px-5 py-3 font-bold">Max batch size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["Professional + Pack 2", "250 / min", "10,000 / hr", "100"],
                  ["Professional + Pack 3", "1,000 / min", "50,000 / hr", "500"],
                  ["Enterprise", "Unlimited", "Unlimited", "5,000"],
                ].map((r, i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3 font-bold text-text-main">{r[0]}</td>
                    <td className="px-5 py-3"><code className="font-mono font-bold text-indigo-700 dark:text-indigo-300 text-[11px]">{r[1]}</code></td>
                    <td className="px-5 py-3"><code className="font-mono font-bold text-violet-700 dark:text-violet-300 text-[11px]">{r[2]}</code></td>
                    <td className="px-5 py-3"><code className="font-mono font-bold text-[#00875A] dark:text-accent-green-text text-[11px]">{r[3]}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- INFRASTRUCTURE & LEDGER: EMISSION FACTORS ---------------- */}
      <section id="emission-factors" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 uppercase tracking-wider">
                  INFRASTRUCTURE &amp; LEDGER
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Emission Factors
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            The ZeroCarbon factor library ships with 18,000+ region-specific factors (2024–2025 data years) and follows a strict, auditable selection precedence. Factors are version-pinned per tenant — new factor releases never silently regrade old reports.
          </p>
        </div>

        {/* Selection Precedence */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-[#00875A]/25 bg-[#00875A]/5 dark:bg-[#00875A]/10 shadow-sm">
          <h3 className="text-base font-extrabold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00875A] text-[20px]">filter_alt</span>
            Factor Selection Precedence (highest → lowest)
          </h3>
          <div className="grid gap-2">
            {[
              ["Tier 1", "Customer-supplied site-specific measurement", "🟣"],
              ["Tier 2", "Sub-national / utility-level factor (state / DISCOM / grid region)", "🟢"],
              ["Tier 3", "National factor (MoEF&CC, EPA, DEFRA, IEA official sources)", "🔵"],
              ["Tier 4", "Global defaults (IEA / IPCC AR6) — fallback only", "🟠"],
            ].map(([tier, desc, dot], i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-[#00875A]/15 flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-7 rounded-lg bg-[#00875A] text-white text-[10.5px] font-extrabold shrink-0 mt-0.5">{tier}</div>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm">{dot}</span>
                    <span className="text-[12.5px] font-extrabold text-text-main">{desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured factors preview */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Featured Factor Samples (India, 2025)</h3>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Activity / Fuel</th>
                  <th scope="col" className="px-5 py-3 font-bold">Unit</th>
                  <th scope="col" className="px-5 py-3 font-bold">Factor (kg CO₂e)</th>
                  <th scope="col" className="px-5 py-3 font-bold">Region</th>
                  <th scope="col" className="px-5 py-3 font-bold">Source</th>
                  <th scope="col" className="px-5 py-3 font-bold">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["Grid electricity (India)",                  "per kWh",     "0.7510", "National",   "CEA 2024 – MoP",         "3"],
                  ["Grid electricity (Western Grid, MH)",       "per kWh",     "0.7284", "State/Disc", "India CEA – WRPC 2025", "2"],
                  ["Diesel (stationary combustion)",            "per liter",   "2.6810", "National",   "MoEF&CC 2024 EIs",       "3"],
                  ["Petrol (mobile, passenger)",                "per liter",   "2.3300", "National",   "AISI / GM India",        "3"],
                  ["Natural Gas (PNG – household)",             "per Nm³",     "2.1580", "National",   "PNGRB 2024",             "3"],
                  ["Air travel, economy domestic (India)",      "per pax-km",  "0.1780", "National",   "DGCA / DEFRA mirror",   "3"],
                  ["Municipal solid waste – landfill",          "per tonne",   "435.0",  "National",   "CPCB 2024 guidelines",  "3"],
                ].map((r, i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3 font-semibold text-text-main whitespace-nowrap">{r[0]}</td>
                    <td className="px-5 py-3 text-text-muted">{r[1]}</td>
                    <td className="px-5 py-3">
                      <code className="font-mono text-[11.5px] font-extrabold text-[#00875A] dark:text-accent-green-text bg-[#00875A]/5 dark:bg-[#00875A]/10 px-2 py-0.5 rounded">{r[2]}</code>
                    </td>
                    <td className="px-5 py-3 text-text-muted">{r[3]}</td>
                    <td className="px-5 py-3 text-text-muted">{r[4]}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white ${
                        r[5] === "2" ? "bg-emerald-500" : "bg-blue-500"
                      }`}>T{r[5]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Version pinning */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-600 dark:text-violet-400 text-[20px]">push_pin</span>
            Version Pinning &amp; Backfilling
          </h3>
          <div className="grid gap-2">
            {[
              { t: "Pinned at ingest-time", d: "Every activity stores the exact factor_id and factor_value used to compute its kg CO2e — updates to the central library never retroactively alter past records." },
              { t: "Opt-in backfill only", d: "A tenant may request a backfill (e.g. CEA releases 2025 factors) via an idempotent /api/v1/factors/backfill job. Every changed record emits a new SHA-256 hash-chain entry in the audit trail." },
              { t: "Full reproducibility", d: "GET /v1/emissions accepts factor_set_id=… so you can regenerate a BRSR report for any past fiscal year using the exact factor set that existed at closing time." },
            ].map((row, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3">
                <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white bg-violet-600 shrink-0 mt-0.5">RULE {i + 1}</span>
                <div className="space-y-0.5">
                  <div className="text-[12.5px] font-extrabold text-text-main">{row.t}</div>
                  <span className="text-xs text-text-muted leading-relaxed">{row.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: CARBON ACTIVITY MODEL ---------------- */}
      <section id="carbon-activity-model" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3 mb-4">
            Carbon Activity Model
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Understanding the canonical data structure used for submitting carbon emission activities.
          </p>
        </div>

        {/* Overview */}
        <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Overview</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            The <strong className="text-accent-green-text">Carbon Activity Model</strong> is the foundational data contract for every emission record submitted to the ZeroCarbon platform.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Regardless of whether emissions originate from electricity, fuel, travel, waste, water, agriculture, or any other source, every activity follows this unified schema.
          </p>
        </div>

        {/* Activity Types Table */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Supported Activity Types</h3>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Activity Type</th>
                  <th scope="col" className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  { type: "electricity", desc: "Grid electricity consumption" },
                  { type: "fuel", desc: "Fuel combustion (diesel, petrol, natural gas, etc.)" },
                  { type: "travel", desc: "Transportation and mobility" },
                  { type: "water", desc: "Water consumption and treatment" },
                  { type: "waste", desc: "Waste generation and disposal" },
                  { type: "spend", desc: "Spend-based emission calculations" },
                  { type: "refrigerants", desc: "Fugitive refrigerant emissions" },
                  { type: "agriculture", desc: "Agricultural activities" },
                ].map((row) => (
                  <tr key={row.type} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3.5">
                      <code className="font-mono font-bold text-accent-green-text text-sm">{row.type}</code>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-text-muted leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schema */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Carbon Activity Schema</h3>
          <CodeBlock
            copyId="carbon-schema"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`interface CarbonActivity {
  // Generated by the platform
  activity_id?: string;

  // Organization
  organization_id: string;

  // Activity
  activity_type: string;
  scope: "1" | "2" | "3";
  category?: string;

  // Consumption
  quantity: number;
  unit: string;

  // Reporting Period
  period: {
    start: string; // ISO 8601
    end: string;
  };

  // Location
  location: {
    country: string;
    state?: string;
    city?: string;
    grid_region?: string;
    facility_id?: string;
  };

  // Data Source
  source: {
    type: string;         // manual, api, csv, meter
    confidence: number;   // 0.0 - 1.0
    name?: string;
    reference?: string;
  };

  // Optional Metadata
  metadata?: Record<string, any>;

  // Managed by the platform
  created_at?: string;
  updated_at?: string;
}`}
          />
        </div>

        {/* Examples */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Example Activities</h3>

          {/* Electricity Example */}
          <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-blue-500/15 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 shrink-0">
                <span className="material-symbols-outlined text-blue-500">bolt</span>
              </div>
              <h4 className="text-base font-bold text-text-main">Electricity</h4>
            </div>
            <CodeBlock
              copyId="example-electricity"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "activity_type": "electricity",
  "scope": "2",
  "quantity": 5000,
  "unit": "kWh",

  "period": {
    "start": "2026-02-01",
    "end": "2026-02-28"
  },

  "location": {
    "country": "IN",
    "state": "Maharashtra",
    "grid_region": "Western"
  },

  "source": {
    "type": "manual",
    "confidence": 1.0,
    "name": "MSEDCL Bill"
  }
}`}
            />
          </div>

          {/* Fuel Combustion Example */}
          <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-orange-500/15 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 shrink-0">
                <span className="material-symbols-outlined text-orange-500">local_gas_station</span>
              </div>
              <h4 className="text-base font-bold text-text-main">Fuel Combustion</h4>
            </div>
            <CodeBlock
              copyId="example-fuel"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "activity_type": "fuel",
  "scope": "1",
  "category": "stationary_combustion",
  "quantity": 500,
  "unit": "liters",

  "period": {
    "start": "2026-02-01",
    "end": "2026-02-28"
  },

  "location": {
    "country": "IN",
    "state": "Karnataka",
    "city": "Bangalore"
  },

  "source": {
    "type": "manual",
    "confidence": 0.95,
    "name": "Fuel Purchase Records"
  },

  "metadata": {
    "fuel_type": "diesel",
    "vehicle_type": "generator"
  }
}`}
            />
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: SCOPES & CATEGORIES ---------------- */}
      <section id="scopes-categories" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3 mb-4">
            Scopes &amp; Categories
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Understand how the GHG Protocol Corporate Standard classifies greenhouse gas emissions into Scope 1, Scope 2, and Scope 3.
          </p>
        </div>

        {/* Overview */}
        <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Overview</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            The <strong>GHG Protocol Corporate Standard</strong> categorizes emissions into three scopes based on where they occur across an organization&apos;s operations and value chain.
          </p>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Scope</th>
                  <th scope="col" className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  { scope: "Scope 1", desc: "Direct emissions from owned or controlled sources", color: "text-accent-green-text" },
                  { scope: "Scope 2", desc: "Indirect emissions from purchased electricity, heat, steam, or cooling", color: "text-blue-600 dark:text-blue-400" },
                  { scope: "Scope 3", desc: "All other indirect emissions across the value chain", color: "text-purple-600 dark:text-purple-400" },
                ].map((row) => (
                  <tr key={row.scope} className="bg-white dark:bg-neutral-800">
                    <td className="px-5 py-3.5">
                      <span className={`font-bold ${row.color}`}>{row.scope}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-text-muted leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scope 1 Details */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-accent-green/10 text-accent-green-text border border-accent-green/10">
              SCOPE 1
            </span>
            <h3 className="text-lg font-bold text-text-main">Direct Emissions</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Emissions generated directly from assets that your organization owns or controls.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-bold text-text-main mb-2">Common Categories</h4>
              <div className="grid gap-2">
                {[
                  "Stationary Combustion",
                  "Mobile Combustion",
                  "Process Emissions",
                  "Fugitive Emissions",
                ].map((e, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-sm font-semibold text-text-main leading-relaxed">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-main mb-2">Examples</h4>
              <div className="grid gap-2">
                {[
                  "Boilers",
                  "Furnaces",
                  "Diesel generators",
                  "Company vehicles",
                  "Industrial chemical processes",
                  "Refrigerant leakage",
                ].map((e, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">
                      circle
                    </span>
                    <span className="text-sm text-text-main leading-relaxed">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-sm font-bold text-text-main mb-2">Example</div>
            <CodeBlock
              copyId="scope1-example"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "activity_type": "fuel",
  "scope": "1",
  "category": "mobile_combustion",
  "quantity": 1000,
  "unit": "liters",

  "metadata": {
    "fuel_type": "diesel",
    "vehicle_count": 10,
    "fleet_type": "delivery_vans"
  }
}`}
            />
          </div>
        </div>

        {/* Scope 2 Details */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-blue-500/20 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10">
              SCOPE 2
            </span>
            <h3 className="text-lg font-bold text-text-main">Indirect Energy Emissions</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Emissions resulting from the generation of purchased energy consumed by your organization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-bold text-text-main mb-2">Common Categories</h4>
              <div className="grid gap-2">
                {[
                  "Purchased Electricity",
                  "Purchased Heat",
                  "Purchased Steam",
                  "Purchased Cooling",
                ].map((e, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-blue-500 text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-sm font-semibold text-text-main leading-relaxed">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-main mb-2">Examples</h4>
              <div className="grid gap-2">
                {[
                  "Office electricity",
                  "Factory electricity",
                  "District heating",
                  "Chilled water systems",
                ].map((e, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-blue-500 text-[18px] shrink-0 mt-0.5">
                      circle
                    </span>
                    <span className="text-sm text-text-main leading-relaxed">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-sm font-bold text-text-main mb-2">Example</div>
            <CodeBlock
              copyId="scope2-example"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "activity_type": "electricity",
  "scope": "2",
  "quantity": 5000,
  "unit": "kWh",

  "location": {
    "country": "IN",
    "state": "Maharashtra"
  }
}`}
            />
          </div>
        </div>

        {/* Scope 3 Details */}
        <div className="space-y-4 p-5 sm:p-6 rounded-2xl border border-purple-500/20 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10">
              SCOPE 3
            </span>
            <h3 className="text-lg font-bold text-text-main">Value Chain Emissions</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            All other indirect emissions occurring throughout your upstream and downstream value chain.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upstream */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-accent-green-text mb-1">
                Upstream Categories (1–8)
              </div>
              <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-bold w-16">Category</th>
                      <th scope="col" className="px-4 py-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { cat: "1", desc: "Purchased Goods & Services" },
                      { cat: "2", desc: "Capital Goods" },
                      { cat: "3", desc: "Fuel & Energy Related Activities" },
                      { cat: "4", desc: "Upstream Transportation & Distribution" },
                      { cat: "5", desc: "Waste Generated in Operations" },
                      { cat: "6", desc: "Business Travel" },
                      { cat: "7", desc: "Employee Commuting" },
                      { cat: "8", desc: "Upstream Leased Assets" },
                    ].map((row) => (
                      <tr key={row.cat} className="bg-white dark:bg-neutral-800">
                        <td className="px-4 py-2.5">
                          <span className="font-mono font-bold text-accent-green-text text-xs">{row.cat}</span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Downstream */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-purple-500 mb-1">
                Downstream Categories (9–15)
              </div>
              <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-bold w-16">Category</th>
                      <th scope="col" className="px-4 py-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { cat: "9", desc: "Downstream Transportation & Distribution" },
                      { cat: "10", desc: "Processing of Sold Products" },
                      { cat: "11", desc: "Use of Sold Products" },
                      { cat: "12", desc: "End-of-Life Treatment of Sold Products" },
                      { cat: "13", desc: "Downstream Leased Assets" },
                      { cat: "14", desc: "Franchises" },
                      { cat: "15", desc: "Investments" },
                    ].map((row) => (
                      <tr key={row.cat} className="bg-white dark:bg-neutral-800">
                        <td className="px-4 py-2.5">
                          <span className="font-mono font-bold text-purple-500 text-xs">{row.cat}</span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-text-muted leading-relaxed">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <div className="text-sm font-bold text-text-main mb-2">Example</div>
            <CodeBlock
              copyId="scope3-example"
              language="json"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`{
  "activity_type": "travel",
  "scope": "3",
  "category": "business_travel",
  "quantity": 2500,
  "unit": "km",

  "metadata": {
    "mode": "flight",
    "class": "economy",
    "route": "domestic"
  }
}`}
            />
          </div>
        </div>

        {/* Decision Flow */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Choosing the Correct Scope</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Use the following decision flow when classifying an activity:
          </p>
          <div className="space-y-3">
            {[
              {
                q: "Do you own or control the emission source?",
                a: "✅ Yes → Scope 1",
                color: "accent-green-text",
              },
              {
                q: "Is it purchased electricity, heat, steam, or cooling?",
                a: "✅ Yes → Scope 2",
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                q: "Is it any other indirect emission within your value chain?",
                a: "✅ Yes → Scope 3",
                color: "text-purple-600 dark:text-purple-400",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-2"
              >
                <p className="text-sm font-bold text-text-main">{s.q}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: NODE.JS SDK ---------------- */}
      <section id="nodejs-sdk" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-accent-green text-white uppercase tracking-wider">
                  OFFICIAL SDK
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Node.js SDK
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            The official ZeroCarbon Node.js SDK provides a TypeScript-first interface for integrating the ZeroCarbon API into Node.js applications with full type safety and modern async/await support.
          </p>
        </div>

        {/* Installation */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Installation</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Using npm:</h4>
              <CodeBlock
                copyId="sdk-install-npm"
                language="bash"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`npm install zerocarbon-nodejs-sdk`}
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-text-main">Using Yarn:</h4>
              <CodeBlock
                copyId="sdk-install-yarn"
                language="bash"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`yarn add zerocarbon-nodejs-sdk`}
              />
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-text-main">Quick Start</h3>

          <div className="space-y-3">
            <h4 className="font-bold text-text-main">Initialize the Client</h4>
            <p className="text-xs text-text-muted leading-relaxed">Create a client using your API key.</p>
            <CodeBlock
              copyId="sdk-init"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`import { ZeroCarbon } from "zerocarbon-nodejs-sdk";

const client = new ZeroCarbon({
  apiKey: process.env.ZEROCARBON_API_KEY!,
});`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-text-main">Submit an Activity</h4>
            <p className="text-xs text-text-muted leading-relaxed">Submit an emission activity for automatic CO₂e calculation.</p>
            <CodeBlock
              copyId="sdk-submit"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`const result = await client.activities.create({
  activity_type: "electricity",
  scope: "2",
  quantity: 1500,
  unit: "kWh",

  period: {
    start: "2026-02-01",
    end: "2026-02-28",
  },

  location: {
    country: "IN",
    state: "Maharashtra",
  },
});

console.log(\`Emissions: \${result.emissions_kg_co2e} kg CO₂e\`);`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-text-main">Retrieve Emissions</h4>
            <p className="text-xs text-text-muted leading-relaxed">Fetch aggregated emissions for a given time period.</p>
            <CodeBlock
              copyId="sdk-get-emissions"
              language="typescript"
              onCopy={onCopy}
              copiedTextId={copiedTextId}
              code={`const emissions = await client.emissions.get({
  start_date: "2026-02-01",
  end_date: "2026-02-28",
  scope: "2",
  group_by: "month",
});

console.log(\`Total: \${emissions.total_kg_co2e} kg CO₂e\`);`}
            />
          </div>
        </div>

        {/* API Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">API Methods</h3>
          <div className="space-y-4">
            {/* 1. activities.create */}
            <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-4">
              <code className="font-mono text-sm font-bold text-accent-green-text break-all">
                client.activities.create(data)
              </code>
              <p className="text-sm text-text-main leading-relaxed">
                Creates a single carbon activity and returns the calculated emissions.
              </p>

              <div>
                <div className="text-xs font-bold text-text-main mb-2">Parameters</div>
                <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-bold">Parameter</th>
                        <th scope="col" className="px-4 py-2.5 font-bold">Type</th>
                        <th scope="col" className="px-4 py-2.5 font-bold">Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="px-4 py-3">
                          <code className="font-mono font-bold text-accent-green-text text-xs">data</code>
                        </td>
                        <td className="px-4 py-3 text-xs text-text-muted">ActivitySubmission</td>
                        <td className="px-4 py-3 text-xs font-bold text-green-600 dark:text-green-400">✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-text-main">Returns</span>
                <code className="font-mono text-xs font-bold text-accent-green-text">ActivityResponse</code>
              </div>
            </div>

            {/* 2. emissions.get */}
            <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-4">
              <code className="font-mono text-sm font-bold text-accent-green-text break-all">
                client.emissions.get(params)
              </code>
              <p className="text-sm text-text-main leading-relaxed">
                Retrieves aggregated emissions data.
              </p>

              <div>
                <div className="text-xs font-bold text-text-main mb-2">Parameters</div>
                <div className="grid gap-2">
                  {[
                    { param: "start_date", desc: "Beginning of reporting period" },
                    { param: "end_date", desc: "End of reporting period" },
                    { param: "scope", desc: "Optional scope filter" },
                    { param: "group_by", desc: "day • week • month • year" },
                  ].map((row) => (
                    <div
                      key={row.param}
                      className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3"
                    >
                      <code className="font-mono font-bold text-accent-green-text text-xs shrink-0 mt-0.5 w-24">
                        {row.param}
                      </code>
                      <span className="text-xs text-text-main leading-relaxed">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-text-main">Returns</span>
                <code className="font-mono text-xs font-bold text-accent-green-text">EmissionsResponse</code>
              </div>
            </div>

            {/* 3. reports.generate */}
            <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-4">
              <code className="font-mono text-sm font-bold text-accent-green-text break-all">
                client.reports.generate(config)
              </code>
              <p className="text-sm text-text-main leading-relaxed">
                Generate compliance or sustainability reports.
              </p>

              <div>
                <div className="text-xs font-bold text-text-main mb-2">Supported formats include:</div>
                <div className="grid grid-cols-3 gap-2">
                  {["PDF", "CSV", "Excel"].map((fmt) => (
                    <div
                      key={fmt}
                      className="p-2.5 rounded-xl bg-instructions-bg border border-outline-variant/20 text-center"
                    >
                      <span className="text-xs font-bold text-accent-green-text">{fmt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-text-main">Returns</span>
                <code className="font-mono text-xs font-bold text-accent-green-text">ReportResponse</code>
              </div>
            </div>
          </div>
        </div>

        {/* TypeScript Support */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">TypeScript Support</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            The SDK ships with complete TypeScript definitions, providing autocomplete, type safety, and request/response interfaces.
          </p>
          <CodeBlock
            copyId="sdk-types"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`import type {
  ActivitySubmission,
  EmissionsResponse,
  ReportConfig,
} from "zerocarbon-nodejs-sdk";

const activity: ActivitySubmission = {
  activity_type: "electricity",
  scope: "2",
  quantity: 1500,
  unit: "kWh",
  // Full autocomplete and type checking
};`}
          />
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "TypeScript-first SDK",
              "Promise-based API",
              "Async/await support",
              "Strongly typed request and response models",
              "Automatic emission calculations",
              "Aggregated emissions retrieval",
              "Report generation",
              "Environment variable support for API keys",
            ].map((feature, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-sm font-semibold text-text-main leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="p-5 sm:p-6 rounded-2xl border border-accent-green/20 bg-white dark:bg-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">
              support_agent
            </span>
            <h3 className="text-lg font-bold text-text-main">Support</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            For assistance, contact:
          </p>
          <a
            href="mailto:support@zerocarbon.org.in"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#006C48] text-white text-sm font-bold transition-all shadow-sm cursor-pointer w-fit"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            support@zerocarbon.org.in
          </a>
        </div>
      </section>

      {/* ---------------- PAYMENTS & MARKETPLACE: CARBON MARKETPLACE (DODO) ---------------- */}
      <section id="carbon-marketplace-dodo" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-rose-600 text-white uppercase tracking-wider">
                  PAYMENTS &amp; MARKETPLACE
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-orange-600 text-white uppercase tracking-wider">
                  DODO MOR
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                Carbon Marketplace (Dodo)
              </h2>
            </div>
          </div>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Native Carbon Offset Marketplace built for global compliance. ZeroCarbon acts as the <strong>Broker</strong> — <strong>Dodo Payments is the Merchant of Record (MoR)</strong>. Taxes, VAT, KYC, invoicing, and localized remittances are handled entirely by Dodo so your ledger stays clean.
          </p>
        </div>

        {/* Role split */}
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { r: "ZeroCarbon", sub: "Broker", d: "Supplies credit inventory, publishes credit vintages and methodologies, emits OffsetCertificate + CarbonCreditRetirement records on the ledger.", color: "emerald" },
            { r: "Dodo Payments", sub: "Merchant of Record", d: "Handles every payment, runs global KYC, issues customer invoices, files tax / VAT returns across 190+ jurisdictions, returns webhooks.", color: "orange" },
            { r: "Buyer (You)", sub: "Customer", d: "Check out via Dodo hosted page. Receive: email receipt + Dodo invoice + ZeroCarbon retirement certificate in your dashboard + Scope 3 ledger credit.", color: "sky" },
          ].map((role, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border bg-white dark:bg-neutral-800 shadow-sm space-y-1.5 ${
                role.color === "emerald" ? "border-emerald-500/20" :
                role.color === "orange"  ? "border-orange-500/20"  :
                                          "border-sky-500/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider" style={{
                  color: role.color === "emerald" ? "#059669" :
                         role.color === "orange"  ? "#ea580c" :
                                                   "#0284c7"
                }}>{role.r}</div>
                <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white ${
                  role.color === "emerald" ? "bg-emerald-500" :
                  role.color === "orange"  ? "bg-orange-500"  :
                                             "bg-sky-500"
                }`}>{role.sub}</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed pt-1.5">{role.d}</p>
            </div>
          ))}
        </div>

        {/* Credit inventory */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">Sample Credit Inventory</h3>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Listing</th>
                  <th scope="col" className="px-5 py-3 font-bold">Methodology</th>
                  <th scope="col" className="px-5 py-3 font-bold">Vintage</th>
                  <th scope="col" className="px-5 py-3 font-bold">Region</th>
                  <th scope="col" className="px-5 py-3 font-bold">Price (₹ / tCO₂e)</th>
                  <th scope="col" className="px-5 py-3 font-bold">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["Afforestation – Western Ghats",  "Verra VCS 4 + CCB",  "2024", "IN-MH", "₹ 1,495", "28,410 t"],
                  ["Wind – Gujarat Kutch",           "Gold Standard VER", "2023", "IN-GJ", "₹   890", "51,000 t"],
                  ["Solar PV – Rajasthan Bhadla",    "Verra VCS 4",       "2024", "IN-RJ", "₹   760", "1,12,850 t"],
                  ["Cookstoves – Odisha LPG swap",   "Gold Standard 3.0", "2022", "IN-OR", "₹   540", "37,000 t"],
                  ["Mangrove Restoration – Sundarbans","Verra VCS 4 + CCB","2024", "IN-WB", "₹ 2,280", "9,450 t"],
                ].map((r, i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800 hover:bg-instructions-bg transition-colors">
                    <td className="px-5 py-3 font-semibold text-text-main whitespace-nowrap">{r[0]}</td>
                    <td className="px-5 py-3 text-text-muted">{r[1]}</td>
                    <td className="px-5 py-3"><span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-instructions-bg px-1.5 py-0.5 rounded border border-outline-variant/15">{r[2]}</span></td>
                    <td className="px-5 py-3 text-text-muted">{r[3]}</td>
                    <td className="px-5 py-3"><code className="font-mono text-[11.5px] font-extrabold text-[#00875A] dark:text-accent-green-text bg-[#00875A]/5 dark:bg-[#00875A]/10 px-2 py-0.5 rounded">{r[4]}</code></td>
                    <td className="px-5 py-3 font-mono font-bold text-violet-700 dark:text-violet-300">{r[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checkout flow */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-[20px]">shopping_cart_checkout</span>
            The Checkout Flow
          </h3>
          <div className="grid md:grid-cols-4 gap-2">
            {[
              { n: "1", title: "Create Session", d: "Your code calls marketplace/checkout.", c: "bg-slate-700" },
              { n: "2", title: "Pricing + 3% fee", d: "Base credit cost + ZeroCarbon 3% platform fee.", c: "bg-indigo-600" },
              { n: "3", title: "Dodo Hosted Page", d: "User pays on dodo.money — tax/VAT auto-computed.", c: "bg-orange-500" },
              { n: "4", title: "Webhook → Ledger", d: "Decrement inventory, issue Certificate + Retirement.", c: "bg-[#00875A]" },
            ].map((st, i) => (
              <div key={i} className="relative p-4 rounded-xl bg-white dark:bg-neutral-800 border border-outline-variant/20 text-center space-y-1.5">
                {i < 3 && <span className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 text-slate-300 dark:text-neutral-600 material-symbols-outlined z-10">chevron_right</span>}
                <div className="flex items-center justify-between w-full mb-1">
                  <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-[11px] font-extrabold ${st.c}`}>{st.n}</div>
                </div>
                <div className="text-xs font-extrabold text-text-main">{st.title}</div>
                <div className="text-[10.5px] text-text-muted leading-relaxed">{st.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Request Example */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-neutral-800 dark:text-text-main">POST /api/v1/marketplace/checkout — Example</h3>
          <CodeBlock
            copyId="dodo-checkout-req"
            language="typescript"
            onCopy={onCopy}
            copiedTextId={copiedTextId}
            code={`const session = await fetch(\`https://api.zerocarbon.org.in/api/v1/marketplace/checkout\`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer zc_live_…",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    items: [
      {
        listing_id: "list_9xAp3QjR6t",   // Wind – Gujarat Kutch
        tonnes: 50,
      }
    ],
    // Either (authenticated user) or (guest checkout)
    company_id: "org_2x3FkQq…",
    // return URL after Dodo hosted page completes
    success_url: "https://app.zerocarbon.org.in/offsets/thanks?order=ord_123",
    cancel_url:  "https://app.zerocarbon.org.in/offsets",

    // MoR (Dodo) will compute GST/IGST/import VAT from buyer_country + billing_address
    buyer: {
      legal_name: "Acme Logistics Pvt. Ltd.",
      country: "IN",
      state:   "MH",
      gstin:   "27AAACA1234B1Z5",
      email:   "billing@acme.in",
    }
  })
}).then(r => r.json());

// Redirect the buyer to:
console.log(session.dodo_checkout_url);
// → https://pay.dodo.money/session/cs_test_Ab1…Cd9`}
          />
        </div>

        {/* Webhook fulfillment */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[22px]">verified</span>
            <h3 className="text-lg font-extrabold text-neutral-800 dark:text-text-main">POST /api/webhooks/dodo-payments — Automated Fulfillment</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            This endpoint is called by Dodo, signed with your webhook shared secret. On successful <code className="font-mono font-bold bg-white dark:bg-neutral-800 px-1 py-0.5 rounded border border-outline-variant/15 text-[10.5px]">payment.succeeded</code> the following ledger side-effects run inside a single transaction:
          </p>
          <div className="grid gap-2">
            {[
              { t: "1️⃣  Decrement Inventory", d: "CarbonCreditListing.available_tonnes -= tonnes sold (row-level lock — prevents oversells)." },
              { t: "2️⃣  OffsetCertificate", d: "Writes a unique certificate with serial, vintage, methodology, buyer, valid_from → valid_to." },
              { t: "3️⃣  CarbonCreditRetirement", d: "Retires the certificate immediately for the reporting period. Scope 3 ledger balance_before → offset_retire → balance_after." },
              { t: "4️⃣  Guest Purchase Fallback", d: "If no company_id was provided (guest checkout): creates a temporary BuyerRecord + mails a secure claim link; buyer can attach it later to their organization account." },
              { t: "5️⃣  Email + Dashboard", d: "Sends retirement PDF to billing email; appends tile to the tenant's offset portfolio view." },
            ].map((row, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-emerald-500/10 flex items-start gap-3">
                <span className="font-bold text-[11px] text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5 w-44">{row.t}</span>
                <span className="text-xs text-text-main leading-relaxed">{row.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fee breakdown card */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500 text-[20px]">receipt_long</span>
              Fee Breakdown (per order)
            </h3>
            <div className="space-y-2 text-xs">
              {[
                ["Base credit cost (market)","— listing.price_tonne × tonnes"],
                ["ZeroCarbon Platform","— flat 3% of base"],
                ["Local taxes / VAT / GST","— calculated by Dodo from jurisdiction"],
                ["Payment processing","— included inside Dodo merchant fee"],
              ].map(([lbl, amt], i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-instructions-bg border border-outline-variant/15">
                  <span className="font-semibold text-text-main">{lbl}</span>
                  <span className="text-text-muted font-mono text-[11px]">{amt}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 mt-1 border-t border-outline-variant/10 flex items-center justify-between text-sm">
              <span className="font-extrabold text-text-main">Invoice issuer</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-orange-500 text-white">Dodo Payments (MoR) · NOT ZeroCarbon</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[20px]">verified_user</span>
              Reporting Artefacts Issued
            </h3>
            <div className="grid gap-2 text-xs">
              {[
                { t: "Dodo Tax Invoice", d: "Tax-compliant receipt sent by Dodo to billing email. Accepted everywhere for IT / GST / VAT filings." },
                { t: "ZeroCarbon OffsetCertificate", d: "PDF certificate + serial number, pinned to vintage & methodology registry." },
                { t: "Retirement Confirmation", d: "Record of permanent retirement, non-tradeable, attached to your tenant ID + reporting period." },
                { t: "Ledger Entry (SHA-256)", d: "offset_retire on Scope 3 ledger — discoverable in the SHA audit trail forever." },
              ].map((row, i) => (
                <div key={i} className="p-3 rounded-xl bg-instructions-bg border border-outline-variant/15 space-y-0.5">
                  <div className="text-[12px] font-extrabold text-text-main">{row.t}</div>
                  <div className="text-[10.5px] text-text-muted leading-relaxed">{row.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: ZEROCARBON MCP PLATFORM OVERVIEW ---------------- */}
      <section id="mcp-platform-overview" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-500 text-white uppercase tracking-wider">
                  ZEROCARBON MCP
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800">
                  Next.js 15.5.12
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                  React 19
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-700 text-white">
                  TypeScript 5.x
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full text-white" style={{ background: "#2D3748" }}>
                  Prisma 5.x
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-500 text-white">
                  Neon pgvector
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                ZeroCarbon MCP — Platform Overview
              </h2>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-accent-green/20 bg-instructions-bg space-y-1">
            <p className="font-body-md text-sm font-bold text-accent-green-text leading-relaxed">
              Production-Ready
            </p>
            <p className="font-body-md text-sm text-text-muted leading-relaxed">
              Enterprise carbon accounting, tracking, and compliance platform with advanced analytics, regulatory automation, and a new AI-powered reasoning engine.
            </p>
          </div>
        </div>

        {/* Overview Paragraph */}
        <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">public</span>
            Overview
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            ZeroCarbon is a comprehensive carbon management platform designed for enterprises to track, analyze, and reduce their carbon footprint while ensuring compliance with global standards (BRSR, SEC, EU ETS, UK regulations). Built with cutting-edge technology and AI-powered insights.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-text-main">Key Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              { icon: "monitoring", title: "Multi-Standard Compliance", desc: "BRSR, GHG Protocol, SEC Climate Disclosure, EU ETS" },
              { icon: "hub", title: "Supply Chain Engagement", desc: "Track Scope 3 emissions across your entire value chain" },
              { icon: "target", title: "Science-Based Targets", desc: "Integrate with SBTi for validated climate commitments" },
              { icon: "smart_toy", title: "AI MCP Reasoning Engine", desc: "Autonomous AI OS with ReAct loops and RAG injection" },
              { icon: "shield", title: "Enterprise Security", desc: "SSO, encryption, and guaranteed idempotency for data protection" },
              { icon: "bolt", title: "Real-time Dashboard", desc: "Live carbon tracking with beautiful data visualizations" },
              { icon: "shopping_cart", title: "Carbon Marketplace", desc: "Compliant offsets powered by Dodo Payments (MoR)" },
              { icon: "api", title: "API-First Design", desc: "Comprehensive REST API with SDKs for Python & Node.js" },
            ].map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm flex items-start gap-3.5"
              >
                <div className="w-9 h-9 shrink-0 rounded-xl bg-accent-green/10 border border-accent-green/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-green text-[18px]">{h.icon}</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-text-main leading-snug">{h.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider Banner */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-accent-green/30 bg-gradient-to-br from-[#00875A]/5 via-white to-transparent dark:from-accent-green/10 dark:via-neutral-800 dark:to-transparent space-y-2 shadow-sm">
          <h3 className="text-xl font-extrabold text-neutral-800 dark:text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[22px]">flash_on</span>
            Infrastructure-Grade API v3
          </h3>
          <p className="text-sm text-text-main font-semibold leading-relaxed">
            Transform your carbon accounting from a calculator to a full-scale emissions intelligence platform.
          </p>
        </div>

        {/* 1. Canonical Activity Model */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h4 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">verified</span>
            Canonical Activity Model
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            Single, unbreakable data contract for all carbon activities across your organization:
          </p>
          <div className="grid gap-2">
            {[
              ["Standardized Fields", "activity_type, scope, quantity, unit, period, location, source, metadata"],
              ["Type Safety", "Full TypeScript & Python dataclass support"],
              ["Validation", "Zod schemas with detailed error messages"],
              ["Idempotency", "Strict SHA-256 hash checks prevent duplicate data ingestions automatically."],
            ].map(([label, desc], i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3"
              >
                <span className="text-[13px] font-extrabold text-accent-green-text shrink-0 w-40">{label}</span>
                <span className="text-xs text-text-main leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Confidence Scoring System */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h4 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">analytics</span>
            Confidence Scoring System
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            Data quality quantified with a <strong className="text-text-main">5-factor weighted algorithm</strong> (0-100% scale):
          </p>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Factor</th>
                  <th scope="col" className="px-5 py-3 font-bold text-center">Weight</th>
                  <th scope="col" className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  ["Source Quality", "25%", "Meter (95%) > API (90%) > Supplier (80%) > Manual (70%) > Estimate (50%)"],
                  ["Data Completeness", "25%", "Required fields populated, metadata richness"],
                  ["Emission Factor Quality", "20%", "Region-specific > national > global defaults"],
                  ["Temporal Accuracy", "15%", "Real-time > daily > monthly > annual"],
                  ["Methodological Rigor", "15%", "GHG Protocol Tier 1-4 classification"],
                ].map(([factor, weight, desc], i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800">
                    <th scope="row" className="px-5 py-3.5 text-xs font-bold text-text-main whitespace-nowrap">{factor}</th>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-accent-green/10 text-accent-green-text border border-accent-green/15">{weight}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-muted leading-relaxed">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Audit Trail & Version Control */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h4 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">fact_check</span>
            Audit Trail &amp; Version Control
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            Git-like version control for every carbon activity:
          </p>
          <div className="grid gap-2">
            <div className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">verified_user</span>
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-text-main">Tamper-Proof Ledger</span>
                <span className="block text-xs text-text-muted leading-relaxed">Every document uploaded via drag-and-drop or API tracks the exact user and AI agent responsible.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-accent-green-text text-[18px] shrink-0 mt-0.5">database</span>
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-text-main">RAG Semantic Search</span>
                <span className="block text-xs text-text-muted leading-relaxed">Uses <code className="font-mono font-bold text-accent-green-text text-[11px] bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-outline-variant/20">pgvector</code> inside Neon Postgres to semantically retrieve uploaded invoices during audits.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Carbon Ledger */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <h4 className="text-base font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">account_balance</span>
            Carbon Ledger (Double-Entry Bookkeeping)
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            Accounting-grade emission tracking:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted mb-0.5">Transaction Types</div>
              <ul className="space-y-1 text-xs text-text-main">
                <li className="flex items-start gap-2"><span className="text-accent-green-text mt-0.5">•</span> <code className="font-mono text-[11px] font-bold text-accent-green-text break-all">emission_add</code></li>
                <li className="flex items-start gap-2"><span className="text-accent-green-text mt-0.5">•</span> <code className="font-mono text-[11px] font-bold text-accent-green-text break-all">emission_reduce</code></li>
                <li className="flex items-start gap-2"><span className="text-accent-green-text mt-0.5">•</span> <code className="font-mono text-[11px] font-bold text-accent-green-text break-all">offset_purchase</code></li>
                <li className="flex items-start gap-2"><span className="text-accent-green-text mt-0.5">•</span> <code className="font-mono text-[11px] font-bold text-accent-green-text break-all">offset_retire</code></li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted mb-0.5">Balance Tracking</div>
              <ul className="space-y-1.5 text-xs text-text-main">
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-accent-green-text text-[16px] shrink-0 mt-0.5">arrow_back</span><span><strong>balance_before</strong></span></li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-accent-green-text text-[16px] shrink-0 mt-0.5">swap_horiz</span><span><strong>transaction_amount</strong></span></li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-accent-green-text text-[16px] shrink-0 mt-0.5">arrow_forward</span><span><strong>balance_after</strong></span></li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-text-muted mb-0.5">Scope Segregation</div>
              <ul className="space-y-1.5 text-xs text-text-main">
                <li className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-accent-green shrink-0"></span>Separate ledgers for <strong>Scope 1</strong></li>
                <li className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>Separate ledgers for <strong>Scope 2</strong></li>
                <li className="flex items-start gap-2"><span className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0"></span>Separate ledgers for <strong>Scope 3</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* MCP AI OS */}
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-white to-transparent dark:from-amber-500/10 dark:via-neutral-800 dark:to-transparent shadow-sm space-y-2">
            <h3 className="text-xl font-extrabold text-neutral-800 dark:text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[22px]">smart_toy</span>
              The ZeroCarbon MCP (AI Operating System)
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              ZeroCarbon is powered by a <strong>Model Context Protocol (MCP)</strong> server (<code className="font-mono font-bold text-amber-700 dark:text-amber-400 text-[11px] bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-amber-500/20">POST /api/v1/mcp</code>) that operates as the brain of the platform.
            </p>
          </div>

          <h4 className="text-base font-bold text-text-main">MCP Features</h4>
          <div className="grid gap-3">
            {[
              {
                n: "1",
                icon: "sync_alt",
                title: "Autonomous ReAct Loop",
                desc: "The AI dynamically chains internal tools together. It can query a database, analyze the response, and call a subsequent tool before returning a final answer (capped at 10 iterations to prevent infinite loops).",
              },
              {
                n: "2",
                icon: "speed",
                title: "High-Performance Parallelization",
                desc: "Complex multi-tool requests are intercepted and executed concurrently using Promise.all(), drastically reducing query latency.",
              },
              {
                n: "3",
                icon: "healing",
                title: "Self-Healing Mechanics",
                desc: "If the AI attempts an invalid database operation (e.g., a Prisma constraint violation), the backend securely intercepts the crash, feeds the raw error log back to the AI, and allows it to autonomously correct its parameters and retry.",
              },
              {
                n: "4",
                icon: "psychology",
                title: "Retrieval-Augmented Generation (RAG)",
                desc: "Uses Neon's pgvector to semantically search uploaded invoices and bills.",
              },
            ].map((feat) => (
              <div
                key={feat.n}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm flex items-start gap-4"
              >
                <div className="shrink-0 space-y-2 items-center flex flex-col">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 text-white text-sm font-extrabold">
                    {feat.n}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">{feat.icon}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h5 className="text-sm font-extrabold text-text-main">{feat.title}</h5>
                  <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dodo Marketplace */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border-2 border-rose-500/20 bg-gradient-to-br from-rose-500/5 via-white to-transparent dark:from-rose-500/10 dark:via-neutral-800 dark:to-transparent shadow-sm">
          <h3 className="text-lg font-extrabold text-neutral-800 dark:text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-500 text-[22px]">storefront</span>
            Carbon Offset Marketplace (Dodo MoR)
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            ZeroCarbon features a native Carbon Offset Marketplace built for global compliance.
          </p>
          <div className="grid gap-2.5">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-outline-variant/20 flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-500 text-[16px]">payments</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-text-main">Merchant of Record (MoR)</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  We utilize <strong className="text-rose-600 dark:text-rose-400">Dodo Payments</strong> as our MoR to automatically handle localized taxes and VAT across the globe.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-outline-variant/20 flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-500 text-[16px]">shopping_cart_checkout</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-text-main">The Checkout Flow</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  <code className="font-mono font-bold text-rose-600 dark:text-rose-400 text-[11px] bg-instructions-bg px-1.5 py-0.5 rounded border border-rose-500/10">POST /api/v1/marketplace/checkout</code> calculates the base credit price + a 3% platform fee, redirecting the user to a compliant checkout session.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-outline-variant/20 flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-500 text-[16px]">verified</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-text-main">Automated Fulfillment</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Upon successful payment, the <code className="font-mono font-bold text-rose-600 dark:text-rose-400 text-[11px] bg-instructions-bg px-1.5 py-0.5 rounded border border-rose-500/10">POST /api/webhooks/dodo-payments</code> webhook decrements inventory and generates strict <strong>OffsetCertificate</strong> and <strong>CarbonCreditRetirement</strong> records. It even supports dynamic guest checkout routing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced SDK Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-neutral-800 dark:text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">rocket_launch</span>
            Advanced SDK Features
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* Python */}
            <div className="p-5 rounded-2xl border border-blue-500/20 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-blue-700 text-white uppercase">Python SDK v3</span>
              </div>
              <CodeBlock
                copyId="zc-mcp-python-sdk"
                language="python"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`from zerocarbon import ZeroCarbon, ActivityBuilder

client = ZeroCarbon(api_key="zc_live_...", environment="production")
builder = ActivityBuilder(org_id="your_org")

# Typed activity creation
activity = builder.electricity(
    kwh=1500,
    period="2026-02",
    location={"country": "IN", "state": "MH"},
    source={"type": "meter", "confidence": 0.95}
)

# Batch ingestion with automatic retry and idempotency protection
result = client.activities.ingest([activity])
print(f"Confidence: {result['data']['activities'][0]['confidence']['overall']}%")`}
              />
            </div>

            {/* Node.js */}
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-white dark:bg-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-emerald-600 text-white uppercase">Node.js SDK v3</span>
              </div>
              <CodeBlock
                copyId="zc-mcp-nodejs-sdk"
                language="typescript"
                onCopy={onCopy}
                copiedTextId={copiedTextId}
                code={`import { ZeroCarbon } from 'zerocarbon-nodejs-sdk';

const client = new ZeroCarbon({
  apiKey: 'zc_live_...',
  retryConfig: { maxRetries: 3, retryDelay: 1000 }
});

// Typed builders with offline queue
const activity = client.activities.electricity({
  kwh: 1500,
  period: '2026-02',
  location: { country: 'IN', state: 'MH' }
});

const result = await client.activities.ingest({ activities: [activity] });`}
              />
            </div>
          </div>
        </div>

        {/* Core API Endpoints */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-neutral-800 dark:text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-green text-[20px]">route</span>
            Core API Endpoints
          </h3>
          <div className="grid gap-4">
            {[
              {
                group: "The MCP Engine",
                color: "amber",
                methods: [
                  ["POST", "/api/v1/mcp", "AI Reasoning Gateway (Accepts Base64 fileContent for RAG)"],
                ],
              },
              {
                group: "Marketplace & Payments",
                color: "rose",
                methods: [
                  ["POST", "/api/v1/marketplace/checkout", "Create Dodo Payments session"],
                  ["POST", "/api/webhooks/dodo-payments", "Webhook fulfillment endpoint"],
                ],
              },
              {
                group: "Authentication",
                color: "slate",
                methods: [
                  ["POST", "/api/v1/company/auth", "Company login"],
                ],
              },
              {
                group: "Emissions",
                color: "green",
                methods: [
                  ["POST", "/v1/activities", "Submit carbon emission activities"],
                  ["GET", "/v1/emissions", "Retrieve aggregated emissions data"],
                  ["POST", "/v1/reports", "Generate compliance reports"],
                ],
              },
            ].map((group) => {
              const chipColors: Record<string, string> = {
                amber: "bg-amber-500 text-white",
                rose: "bg-rose-500 text-white",
                slate: "bg-neutral-700 text-white",
                green: "bg-[#00875A] text-white",
              };
              const methodColors: Record<string, string> = {
                POST: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/15",
                GET: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15",
              };
              return (
                <div
                  key={group.group}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-1 text-[10px] font-extrabold rounded-full uppercase tracking-wider ${chipColors[group.color]}`}>{group.group}</span>
                  </div>
                  <div className="space-y-2">
                    {group.methods.map(([m, p, d], i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex flex-col md:flex-row md:items-center gap-2 md:gap-3"
                      >
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 w-fit ${methodColors[m as string]}`}>{m}</span>
                        <code className="font-mono text-[11px] font-bold text-text-main break-all shrink-0 md:min-w-[280px]">{p}</code>
                        <span className="text-xs text-text-muted leading-relaxed">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Links Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00875A] to-[#006C48] text-white shadow-lg space-y-3 text-center">
          <p className="text-sm font-semibold opacity-95">Built for a sustainable future</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <a href="https://zerocarbon.org.in" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 transition-opacity underline underline-offset-4">zerocarbon.org.in</a>
            <span className="opacity-40">•</span>
            <a href="https://developer.zerocarbon.org.in" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 transition-opacity underline underline-offset-4">developer.zerocarbon.org.in</a>
            <span className="opacity-40">•</span>
            <a href="https://api.zerocarbon.org.in" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 transition-opacity underline underline-offset-4">api.zerocarbon.org.in</a>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 9: AI ARCHITECTURE GUIDE ---------------- */}
      <section id="mcp-ai-architecture" className="scroll-mt-24 space-y-8">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-purple-600 text-white uppercase tracking-wider">
                  AI GUIDE
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800">
                  Architecture Context
                </span>
              </div>
              <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-3">
                ZeroCarbon Architecture Context (AI Guide)
              </h2>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 space-y-1.5">
            <p className="text-xs font-bold text-purple-700 dark:text-purple-300 leading-relaxed">
              Ultra-condensed guide for future AI agents
            </p>
            <p className="font-body-md text-sm text-text-muted leading-relaxed">
              Serves as a rapid reference map to quickly understand the structure, data models, and logic of the ZeroCarbon project without needing to blindly grep the entire codebase, saving thousands of tokens.
            </p>
          </div>
        </div>

        {/* 1. Core Stack */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">1</div>
            <h3 className="text-lg font-bold text-text-main">Core Stack</h3>
          </div>
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wide bg-instructions-bg border-b border-outline-variant/20 text-text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Layer</th>
                  <th scope="col" className="px-4 py-3 font-bold">Technology</th>
                  <th scope="col" className="px-4 py-3 font-bold">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {[
                  ["Framework", "Next.js 15.5.12 (App Router)", "—"],
                  ["Database", "PostgreSQL (via NEON) with Prisma ORM", "prisma/schema.prisma"],
                  ["Styling", "Tailwind CSS", "src/app/globals.css"],
                  ["Payments/Billing", "Dodo Payments SDK", "src/app/api/webhooks/dodo-payments"],
                  ["AI/LLM", "Google Gemini 2.5", "src/lib/ai/gemini.ts"],
                  ["Vector DB", "pgvector inside Postgres", "src/lib/ai/rag.ts"],
                ].map(([layer, tech, ref], i) => (
                  <tr key={i} className="bg-white dark:bg-neutral-800">
                    <td className="px-4 py-3 font-bold text-text-main whitespace-nowrap">{layer}</td>
                    <td className="px-4 py-3 text-text-muted">{tech}</td>
                    <td className="px-4 py-3">
                      {ref !== "—" ? (
                        <code className="font-mono text-[10.5px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/5 dark:bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/10">{ref}</code>
                      ) : (
                        <span className="text-text-muted">{ref}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Key Directories */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">2</div>
            <h3 className="text-lg font-bold text-text-main">Key Directories</h3>
          </div>
          <div className="grid gap-2">
            {[
              { path: "src/app/", desc: "Next.js frontend pages and API routes." },
              { path: "src/app/api/v1/mcp/", desc: "The brain of the application. Contains the AI Operating System (MCP Server)." },
              { path: "src/lib/", desc: "Core backend logic." },
              { path: "src/lib/ai/", desc: "RAG, MCP Reasoning Loop, Prompts." },
              { path: "src/lib/db/", desc: "Prisma Client instance." },
              { path: "src/lib/document/", desc: "OCR and data extraction pipelines (Cloudinary)." },
              { path: "src/lib/core/emissions/", desc: "Emission calculation engines and math formulas." },
            ].map((d, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-instructions-bg border border-outline-variant/20 flex items-start gap-3"
              >
                <div className="w-6 h-6 shrink-0 mt-0.5 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[14px]">folder</span>
                </div>
                <div className="space-y-0.5 flex-1">
                  <code className="font-mono text-[11px] font-bold text-purple-700 dark:text-purple-300 break-all block">{d.path}</code>
                  <p className="text-xs text-text-muted leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Database Schema Overview */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">3</div>
            <h3 className="text-lg font-bold text-text-main">Database Schema Overview</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            The database uses <code className="font-mono font-bold text-purple-700 dark:text-purple-300 text-[10.5px] bg-purple-500/5 dark:bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/10">prisma/schema.prisma</code> and relies heavily on relational UUID strings (<code className="font-mono font-bold text-purple-700 dark:text-purple-300 text-[10.5px] bg-purple-500/5 dark:bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/10">cuid</code>).
          </p>
          <div className="grid gap-2">
            {[
              {
                name: "Company",
                tag: "Core Tenant",
                tagColor: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/15",
                desc: "The core tenant. Everything cascades from here. (No email field—emails belong to User).",
              },
              {
                name: "User",
                tag: "Auth",
                tagColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/15",
                desc: "The authentication model. Linked to a Company.",
              },
              {
                name: "EmissionRecord",
                tag: "Ledger Heart",
                tagColor: "bg-[#00875A]/10 text-[#00875A] dark:text-accent-green-text border border-[#00875A]/15",
                desc: "The heart of the ledger. Stores all Scope 1, 2, and 3 calculations. Uses idempotency_key to prevent duplicate writes during automated AI ingests.",
              },
              {
                name: "DocumentUpload",
                tag: "Audit Trail",
                tagColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/15",
                desc: "Tracks uploaded bills/invoices. Fields like uploaded_by_ai_agent are used for audit trails.",
              },
              {
                name: "CarbonCreditListing",
                tag: "Marketplace",
                tagColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/15",
                desc: "Inventory for the Carbon Marketplace.",
              },
              {
                name: "OffsetCertificate & CarbonCreditRetirement",
                tag: "Ledgers",
                tagColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15",
                desc: "Ledgers generated when a user purchases offsets. Must contain strict attributes like valid_from and total_cost.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1.5"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="font-mono text-[12px] font-extrabold text-purple-800 dark:text-purple-200 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-outline-variant/20">{t.name}</code>
                  <span className={`inline-flex px-2 py-0.5 text-[9.5px] font-extrabold rounded-full uppercase tracking-wider ${t.tagColor}`}>{t.tag}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MCP Server */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border-2 border-amber-500/25 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">4</div>
            <h3 className="text-lg font-bold text-text-main">The MCP Server (AI Operating System)</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <code className="font-mono text-[10.5px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">src/app/api/v1/mcp/route.ts</code>
            <code className="font-mono text-[10.5px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">src/lib/ai/mcp-reasoning.ts</code>
          </div>
          <div className="grid gap-2">
            {[
              ["Autonomous Loop", "The MCP does not blindly run 1 tool. It uses a while loop (capped at 10 iterations) to perform ReAct (Reasoning + Acting) chaining."],
              ["Parallel Execution", "Multiple AI tool calls are executed concurrently using Promise.all()."],
              ["Self-Healing", "If a tool crashes (e.g. Prisma constraint violation), the error is caught and returned as JSON back to the LLM, prompting the LLM to fix its own parameters and retry."],
              ["Caching", "Identical tool calls within the same conversational loop are cached in memory."],
            ].map(([label, desc], i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 flex items-start gap-3"
              >
                <span className="text-[11.5px] font-extrabold text-amber-700 dark:text-amber-400 shrink-0 w-36">{label}</span>
                <span className="text-xs text-text-main leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Idempotency & Concurrency */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">5</div>
            <h3 className="text-lg font-bold text-text-main">Idempotency &amp; Concurrency</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Automated AI actions (like parsing 50 invoices in bulk) rely on Idempotency Keys.
          </p>
          <div className="space-y-2">
            <div className="p-4 rounded-xl bg-instructions-bg border border-outline-variant/20 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-green-text text-[17px]">lock</span>
                <span className="text-xs font-extrabold text-text-main">Creation Flow</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                When the AI generates a draft emission record, it computes an idempotency key (usually a hash of date + supplier + amount).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 dark:text-rose-400 text-[17px]">report_problem</span>
                <span className="text-xs font-extrabold text-rose-700 dark:text-rose-300">Critical Protection</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                If the exact key exists, the backend skips creation and returns <code className="font-mono font-bold text-rose-700 dark:text-rose-300 text-[10.5px] bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-rose-500/15">duplicate: true</code>. <strong className="text-rose-700 dark:text-rose-300">Do NOT bypass this protection.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 6. Carbon Credit Marketplace */}
        <div className="space-y-3 p-5 sm:p-6 rounded-2xl border-2 border-rose-500/20 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">6</div>
            <h3 className="text-lg font-bold text-text-main">Carbon Credit Marketplace (Dodo MoR)</h3>
          </div>
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400">ZeroCarbon acts as a Broker.</div>
          <div className="grid gap-2">
            {[
              ["Taxes & VAT", "We do not handle tax or VAT. We use Dodo Payments as a Merchant of Record."],
              ["Checkout Flow", "The checkout API calculates the base price + 3% platform fee, and passes it to Dodo. Dodo handles all localized taxes globally."],
              ["Webhook Fulfillment", "Webhooks securely handle inventory decrements and Certificate issuance for both authenticated companies and \"Guest Marketplace Users\"."],
            ].map(([label, desc], i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/15 flex items-start gap-3"
              >
                <span className="text-[11.5px] font-extrabold text-rose-700 dark:text-rose-300 shrink-0 w-36">{label}</span>
                <span className="text-xs text-text-main leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
