import React, { useEffect, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import { VersionMeta } from '../data/comparisonData';
import { FairPriceOriginalReplica } from './FairPriceOriginalReplica';
import { ScaledViewport, ViewportPreset } from './ScaledViewport';

interface VersionPaneProps {
  version: VersionMeta;
  viewportPreset: ViewportPreset;
  isFocused: boolean;
  globalReloadNonce: number;
  onToggleFocus: (id: VersionMeta['id']) => void;
}

export const VersionPane: React.FC<VersionPaneProps> = ({
  version,
  viewportPreset,
  isFocused,
  globalReloadNonce,
  onToggleFocus,
}) => {
  const [localReloadNonce, setLocalReloadNonce] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const combinedNonce = globalReloadNonce + localReloadNonce;

  useEffect(() => {
    if (version.embedMode === 'iframe') {
      setIframeLoaded(false);
    }
  }, [combinedNonce, version.embedMode]);

  const handleReload = () => {
    setLocalReloadNonce((n) => n + 1);
  };

  const frameHeight = isFocused ? 740 : 620;

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Pane Header */}
      <div className="flex items-start justify-between gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/60">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: version.accentHex }}
            >
              {version.indexLabel}.
            </span>
            <h2 className="truncate">{version.title}</h2>
          </div>
          <p className="text-xs text-slate-500 truncate">
            <span>{version.methodology}</span>
            <span aria-hidden="true" className="mx-1.5">
              ·
            </span>
            <span className="font-mono text-[11px]">{version.displayHost}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleReload}
            title={`Reload ${version.title}`}
            aria-label={`Reload ${version.title}`}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleFocus(version.id)}
            title={isFocused ? 'Return to 3-column comparison' : `Expand ${version.title}`}
            aria-label={isFocused ? 'Exit focus view' : `Expand ${version.title}`}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            {isFocused ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>

          <a
            href={version.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${version.url} in new tab`}
            aria-label={`Open ${version.title} in new tab`}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Live Viewport */}
      <div className="relative border-b border-slate-200 bg-slate-100">
        {version.embedMode === 'replica' ? (
          <ScaledViewport preset={viewportPreset} height={frameHeight}>
            <FairPriceOriginalReplica resetKey={combinedNonce} />
          </ScaledViewport>
        ) : (
          <ScaledViewport preset={viewportPreset} height={frameHeight}>
            <div className="relative w-full h-full bg-white">
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
                  <div className="h-6 w-6 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-800">
                      Loading {version.displayHost}
                    </p>
                    <p className="text-xs text-slate-500">
                      Fetching live deployment preview
                    </p>
                  </div>
                </div>
              )}
              <iframe
                key={combinedNonce}
                src={version.url}
                title={`${version.title} — ${version.methodology}`}
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-0 bg-white"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScaledViewport>
        )}
      </div>

      {/* Concise UX Summary Footer */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
        <div className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">{version.summary}</p>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {version.highlights.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <a
            href={version.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4ED8] hover:underline truncate"
          >
            <span className="font-mono truncate">{version.url}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
          <button
            type="button"
            onClick={() => onToggleFocus(version.id)}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0"
          >
            {isFocused ? 'Back to 3-up' : 'Inspect full width'}
          </button>
        </div>
      </div>
    </article>
  );
};
