import React from 'react';
import type { MasterScoreItem, MasterScores } from '../types';
import { ShieldCheck, Award } from 'lucide-react';

interface MasterScoreCardsProps {
  scores: MasterScores;
}

export const MasterScoreCards: React.FC<MasterScoreCardsProps> = ({ scores }) => {
  const masters: MasterScoreItem[] = [scores.duan, scores.buffett, scores.munger, scores.lilu];

  const getScoreBadge = (score: number) => {
    if (score >= 4.5) return 'badge-emerald';
    if (score >= 3.8) return 'badge-indigo';
    if (score >= 3.0) return 'badge-amber';
    return 'badge-rose';
  };

  return (
    <div className="space-y-4">
      {/* Overall Score Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-indigo-500">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">4-Master Quantitative & Qualitative Synthesis</h2>
          </div>
          <p className="text-xs text-slate-400">
            Weighted aggregation of Duan Yongping, Warren Buffett, Charlie Munger, and Li Lu investment perspectives.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Overall Score</div>
            <div className="text-sm font-bold text-emerald-400">Institutional Conviction Evaluation</div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            {scores.overall ? scores.overall.toFixed(2) : '4.50'} <span className="text-sm text-slate-500 font-normal">/ 5.0</span>
          </div>
        </div>
      </div>

      {/* Grid of 4 Masters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masters.map((m, idx) => (
          <div key={idx} className="glass-card p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-slate-800/80 rounded-xl border border-slate-700/50">{m.avatar}</span>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{m.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{m.philosophy}</p>
                  </div>
                </div>
                <div className={`badge ${getScoreBadge(m.score)} font-mono text-sm px-3 py-1`}>
                  {m.score ? m.score.toFixed(1) : '4.5'} / 5.0
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xs italic text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 mb-3">
                "{m.keyQuote}"
              </blockquote>

              {/* Pros / Cons */}
              <div className="space-y-1.5 text-xs">
                {m.pros?.map((p: string, pIdx: number) => (
                  <div key={pIdx} className="flex items-start gap-2 text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                    <span>{p}</span>
                  </div>
                ))}
                {m.cons?.map((c: string, cIdx: number) => (
                  <div key={cIdx} className="flex items-start gap-2 text-amber-300/90">
                    <span className="text-amber-400 text-xs shrink-0 font-bold">⚠️</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${((m.score || 4.5) / 5.0) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400">{Math.round(((m.score || 4.5) / 5.0) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
