import React from 'react';
import type { MirrorTest } from '../types';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface MirrorTestBannerProps {
  mirrorTest: MirrorTest;
}

export const MirrorTestBanner: React.FC<MirrorTestBannerProps> = ({ mirrorTest }) => {
  return (
    <div className={`glass-card p-5 border-l-4 ${
      mirrorTest.passed ? 'border-l-emerald-500 bg-emerald-950/20' : 'border-l-rose-500 bg-rose-950/20'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {mirrorTest.passed ? (
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">The Mirror Test (5-Sentence Clarity Filter)</h3>
              <span className={`badge ${mirrorTest.passed ? 'badge-emerald' : 'badge-rose'}`}>
                {mirrorTest.passed ? 'PASSED 🟢' : 'FAILED 🔴'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Can the core thesis be explained plainly to a non-expert in under 60 seconds?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-400">Clarity Score:</span>
          <span className="font-bold text-emerald-400">{mirrorTest.clarityScore} / 100</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-normal">
        "{mirrorTest.fiveSentenceSummary}"
      </p>
    </div>
  );
};
