import React from 'react';
import type { NewsPulseItem } from '../types';
import { Activity, TrendingDown, TrendingUp, Zap } from 'lucide-react';

interface NewsPulseViewProps {
  pulseItems: NewsPulseItem[];
}

export const NewsPulseView: React.FC<NewsPulseViewProps> = ({ pulseItems }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 border-l-4 border-l-purple-500">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">News Pulse & 10-Minute Rapid Price Attribution</h2>
            <p className="text-xs text-slate-400">
              Decomposing rapid stock movements into Fundamental Events vs Macro/Sector Beta vs Liquidity Noise.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pulseItems.map((item) => {
          const isNegative = item.priceMove < 0;

          return (
            <div key={item.id} className="glass-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${
                    isNegative ? 'bg-rose-950/40 border-rose-500/30 text-rose-400' : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {isNegative ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">{item.ticker}</span>
                      <span className={`font-mono font-bold text-sm ${isNegative ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {item.priceMove > 0 ? '+' : ''}{item.priceMove}%
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{item.timeframe} ({item.date})</span>
                  </div>
                </div>

                <div className="badge badge-indigo">
                  <Zap className="w-3.5 h-3.5" /> Rapid Move Attribution
                </div>
              </div>

              {/* Attribution Percentage Breakdown Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-cyan-400">Fundamental Catalyst: {item.fundamentalAttribution}%</span>
                  <span className="text-indigo-400">Macro / Sector Beta: {item.betaAttribution}%</span>
                  <span className="text-purple-400">Liquidity / Noise: {item.liquidityAttribution}%</span>
                </div>

                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                  <div
                    className="bg-cyan-500 h-full transition-all"
                    style={{ width: `${item.fundamentalAttribution}%` }}
                    title={`Fundamental: ${item.fundamentalAttribution}%`}
                  />
                  <div
                    className="bg-indigo-500 h-full transition-all"
                    style={{ width: `${item.betaAttribution}%` }}
                    title={`Beta: ${item.betaAttribution}%`}
                  />
                  <div
                    className="bg-purple-500 h-full transition-all"
                    style={{ width: `${item.liquidityAttribution}%` }}
                    title={`Liquidity: ${item.liquidityAttribution}%`}
                  />
                </div>
              </div>

              {/* Drivers & Verdict */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Key Market Drivers</span>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {item.keyDrivers.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">AI Institutional Verdict</span>
                  <p className="text-xs font-bold text-white mt-0.5">{item.verdict}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
