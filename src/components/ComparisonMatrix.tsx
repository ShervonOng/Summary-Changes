import React, { useMemo, useState } from 'react';
import { COMPARISON_MATRIX, NIELSEN_HEURISTICS } from '../data/comparisonData';

type HeuristicFilter = 'all' | 'status' | 'control' | 'cognition';

export const ComparisonMatrix: React.FC = () => {
  const [filter, setFilter] = useState<HeuristicFilter>('all');

  const filteredHeuristics = useMemo(() => {
    if (filter === 'all') return NIELSEN_HEURISTICS;
    return NIELSEN_HEURISTICS.filter((item) => item.focusArea === filter);
  }, [filter]);

  return (
    <div className="space-y-16">
      {/* Side-by-Side Comparison Matrix */}
      <section id="matrix" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">
              01 · Architectural & UX Breakdown
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Comparison Matrix Across All 3 Versions
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Evaluating how structural clutter in the original storefront evolves across intuitive account workflows (V1) and formal usability heuristics (V2).
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[780px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-700">
                <th className="py-3.5 px-5 w-[18%]">UX Dimension</th>
                <th className="py-3.5 px-5 w-[27%]">01. Original Replica</th>
                <th className="py-3.5 px-5 w-[27%]">02. Version 1 — Intuitive Accounts</th>
                <th className="py-3.5 px-5 w-[28%]">03. Version 2 — Nielsen&apos;s Heuristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {COMPARISON_MATRIX.map((row) => (
                <tr key={row.dimension} className="hover:bg-slate-50/70 transition-colors align-top">
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    {row.dimension}
                  </td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed">
                    {row.original}
                  </td>
                  <td className="py-4 px-5 text-slate-700 leading-relaxed">
                    {row.v1}
                  </td>
                  <td className="py-4 px-5 text-slate-800 leading-relaxed font-medium">
                    {row.v2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Nielsen's 10 Heuristics Audit */}
      <section id="heuristics" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-500">
              02 · Usability Evaluation
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Nielsen&apos;s 10 Usability Heuristics Applied
            </h2>
          </div>

          {/* Interactive segmented filter */}
          <div
            role="tablist"
            aria-label="Filter heuristics by focus area"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start lg:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All 10 Heuristics' },
                { id: 'status', label: 'Status & Clarity' },
                { id: 'control', label: 'Control & Errors' },
                { id: 'cognition', label: 'Recognition & Consistency' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHeuristics.map((item) => (
            <article
              key={item.number}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-4"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  <span className="font-mono text-xs text-[#1D4ED8] mr-2 tabular-nums">
                    {item.number}
                  </span>
                  {item.name}
                </h3>
              </div>

              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-medium text-slate-500">Original Friction</dt>
                  <dd className="text-slate-600 mt-0.5 leading-relaxed">{item.baselineIssue}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#0F766E]">Version 1 (Intuitive Accounts)</dt>
                  <dd className="text-slate-700 mt-0.5 leading-relaxed">{item.v1Approach}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#004B93]">Version 2 (Nielsen&apos;s Heuristics)</dt>
                  <dd className="text-slate-800 mt-0.5 leading-relaxed">{item.v2Implementation}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
