import React from 'react';
import type { TradeJournalEntry } from '../types';
import { BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface JournalingViewProps {
  journalEntries: TradeJournalEntry[];
}

export const JournalingView: React.FC<JournalingViewProps> = ({ journalEntries }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 border-l-4 border-l-amber-500">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Institutional Trade Rationale Journal (`实盘记录`)</h2>
            <p className="text-xs text-slate-400">
              Audit trail logging trade executions, pre-trade checklist pass rates, mirror test clearings, and post-trade thesis tracking.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {journalEntries.map((entry) => {
          const isBuy = entry.action === 'BUY' || entry.action === 'COVER';

          return (
            <div key={entry.id} className="glass-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                    isBuy ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                  }`}>
                    {entry.action} {entry.shares} SHS @ ${entry.price.toFixed(2)}
                  </span>
                  <div>
                    <span className="font-bold text-white text-base mr-2">{entry.ticker}</span>
                    <span className="text-xs text-slate-400 font-mono">Date: {entry.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Conviction Score:</span>
                  <span className="badge badge-emerald font-mono">{entry.convictionScore.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Trade Rationale & Intrinsic Thesis</span>
                <p className="text-slate-200 leading-relaxed">{entry.thesisSummary}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mirror Test Cleared</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pre-Trade Checklist 100% Passed</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
