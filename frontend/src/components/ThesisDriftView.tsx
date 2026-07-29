import React from 'react';
import type { ThesisDriftItem } from '../types';
import { GitCompare, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface ThesisDriftViewProps {
  driftItems: ThesisDriftItem[];
}

export const ThesisDriftView: React.FC<ThesisDriftViewProps> = ({ driftItems }) => {
  const getBadge = (status: ThesisDriftItem['status']) => {
    if (status === 'INTACT') return 'badge-emerald';
    if (status === 'DRIFTING') return 'badge-amber';
    return 'badge-rose';
  };

  const getIcon = (status: ThesisDriftItem['status']) => {
    if (status === 'INTACT') return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (status === 'DRIFTING') return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    return <ShieldAlert className="w-5 h-5 text-rose-400" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 border-l-4 border-l-cyan-500">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
            <GitCompare className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Thesis Drift Tracker & Quarterly Delta Engine</h2>
            <p className="text-xs text-slate-400">
              Automated evaluation of new SEC 10-Q filings & earnings transcripts against original investment memos.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {driftItems.map((item) => (
          <div key={item.id} className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {getIcon(item.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">{item.ticker}</span>
                    <span className="text-xs text-slate-400 font-mono">({item.period})</span>
                  </div>
                  <span className="text-xs text-slate-500">Evaluated on {item.date}</span>
                </div>
              </div>

              <span className={`badge ${getBadge(item.status)} px-4 py-1.5 font-bold text-xs`}>
                Thesis Status: {item.status}
              </span>
            </div>

            <p className="text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400">Executive Verdict:</span> {item.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Moat Delta</span>
                <p className="text-slate-300">{item.moatDelta}</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Guidance & Revenue</span>
                <p className="text-slate-300">{item.guidanceChange}</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Margin Trend</span>
                <p className="text-slate-300">{item.marginTrend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
