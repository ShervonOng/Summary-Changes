import React, { useState } from 'react';
import { ExternalLink, Monitor, RotateCw, Smartphone, Columns3 } from 'lucide-react';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ViewportPreset } from './components/ScaledViewport';
import { VersionPane } from './components/VersionPane';
import { VERSIONS, VersionId } from './data/comparisonData';

export default function App() {
  const [focusedId, setFocusedId] = useState<VersionId | null>(null);
  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>('desktop');
  const [globalReloadNonce, setGlobalReloadNonce] = useState(0);

  const visibleVersions = focusedId
    ? VERSIONS.filter((v) => v.id === focusedId)
    : VERSIONS;

  const handleToggleFocus = (id: VersionId) => {
    setFocusedId((current) => (current === id ? null : id));
  };

  const handleResetWorkspace = () => {
    setFocusedId(null);
    setViewportPreset('desktop');
    setGlobalReloadNonce((n) => n + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            FairPrice UX Studio
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#comparison"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Side-by-Side
            </a>
            <a
              href="#matrix"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Comparison Matrix
            </a>
            <a
              href="#heuristics"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Heuristic Audit
            </a>
            <a
              href="#sources"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Source Links
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleResetWorkspace}
              className="px-4 py-2 text-xs font-medium text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
            >
              Reset Viewports
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Intro + Workspace Toolbar */}
        <section className="max-w-[1600px] mx-auto px-6 pt-10 pb-6 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium text-slate-500">
              <span>UX Evolution Showcase</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>3 Side-by-Side Builds</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>Live Interactive Previews</span>
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-slate-900 leading-[1.15] text-balance">
              FairPrice UI/UX Redesign Comparison
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Compare the original FairPrice storefront replica alongside Version 1 (built around intuitive accounts) and Version 2 (engineered using Jakob Nielsen&apos;s 10 usability heuristics).
            </p>
          </div>

          {/* Workspace Toolbar */}
          <div
            id="comparison"
            className="scroll-mt-24 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-3"
          >
            {/* Layout Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500 px-2 whitespace-nowrap">
                Layout
              </span>
              <div
                role="group"
                aria-label="Comparison layout mode"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setFocusedId(null)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    focusedId === null
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns3 className="h-3.5 w-3.5" />
                  <span>3-Up Side-by-Side</span>
                </button>
                {VERSIONS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setFocusedId(v.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      focusedId === v.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {v.indexLabel}. {v.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport Width & Reload Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 px-1 whitespace-nowrap">
                  Viewport
                </span>
                <div
                  role="group"
                  aria-label="Viewport scale preset"
                  className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => setViewportPreset('desktop')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      viewportPreset === 'desktop'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span>Desktop 1280px</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportPreset('fluid')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      viewportPreset === 'fluid'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Column Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportPreset('mobile')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      viewportPreset === 'mobile'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Mobile 390px</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGlobalReloadNonce((n) => n + 1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Sync Reload</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main 3-Column Side-by-Side Comparison Stage */}
        <section className="max-w-[1600px] mx-auto px-6 pb-16">
          <div
            className={
              focusedId
                ? 'grid grid-cols-1 max-w-6xl mx-auto gap-6'
                : 'grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch'
            }
          >
            {visibleVersions.map((version) => (
              <VersionPane
                key={version.id}
                version={version}
                viewportPreset={viewportPreset}
                isFocused={focusedId === version.id}
                globalReloadNonce={globalReloadNonce}
                onToggleFocus={handleToggleFocus}
              />
            ))}
          </div>
        </section>

        {/* Structured Comparison Matrix & Nielsen Heuristics Audit */}
        <section className="max-w-[1600px] mx-auto px-6 pb-20">
          <ComparisonMatrix />
        </section>
      </main>

      {/* Clean Source Directory Footer */}
      <footer id="sources" className="border-t border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-900">
              FairPrice UX Studio
            </div>
            <p className="text-xs text-slate-500">
              Side-by-side comparison hosting page for baseline, intuitive account, and heuristic redesign iterations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            {VERSIONS.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
              >
                <span>
                  {v.indexLabel}. {v.title}
                </span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
