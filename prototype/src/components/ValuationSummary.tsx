import React from 'react';
import type { ValuationScenario } from '../types';
import { Target, ShieldAlert, Sparkles } from 'lucide-react';

interface ValuationSummaryProps {
  valuation: ValuationScenario;
}

export const ValuationSummary: React.FC<ValuationSummaryProps> = ({ valuation }) => {
  const { bearTarget, baseTarget, bullTarget, currentPrice, marginOfSafetyPct } = valuation;

  // Calculate position percentage on scale from bear to bull
  const minVal = bearTarget * 0.9;
  const maxVal = bullTarget * 1.1;
  const range = maxVal - minVal;
  const currentPos = ((currentPrice - minVal) / range) * 100;
  const basePos = ((baseTarget - minVal) / range) * 100;

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">3-Scenario Valuation & Margin of Safety</h2>
          </div>
          <p className="text-xs text-slate-400">
            5-Year DCF Intrinsic Value & Multiple-based Target Price Modeling
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-950/40 border border-emerald-500/30 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Margin of Safety</div>
            <div className="text-xl font-bold font-mono text-emerald-300">
              +{marginOfSafetyPct.toFixed(1)}% <span className="text-xs font-normal text-slate-400">to Base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Price Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Current Price */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-indigo-500/40 relative overflow-hidden">
          <div className="text-xs text-slate-400 uppercase font-semibold">Current Price</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            ${currentPrice.toFixed(2)}
          </div>
          <span className="text-[10px] text-indigo-400 font-semibold block mt-1">Market Close Mark</span>
        </div>

        {/* Bear Target */}
        <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/30">
          <div className="flex items-center gap-1 text-xs text-rose-400 font-semibold uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Bear Target</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-200 mt-1">
            ${bearTarget.toFixed(2)}
          </div>
          <span className="text-[10px] text-rose-400/80 block mt-1">
            {(((bearTarget - currentPrice) / currentPrice) * 100).toFixed(1)}% downside
          </span>
        </div>

        {/* Base Target */}
        <div className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/30">
          <div className="flex items-center gap-1 text-xs text-indigo-300 font-semibold uppercase">
            <Target className="w-3.5 h-3.5" />
            <span>Base Target</span>
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-100 mt-1">
            ${baseTarget.toFixed(2)}
          </div>
          <span className="text-[10px] text-emerald-400 block mt-1 font-semibold">
            +{(marginOfSafetyPct).toFixed(1)}% upside
          </span>
        </div>

        {/* Bull Target */}
        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bull Target</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-200 mt-1">
            ${bullTarget.toFixed(2)}
          </div>
          <span className="text-[10px] text-emerald-300 block mt-1 font-semibold">
            +{(((bullTarget - currentPrice) / currentPrice) * 100).toFixed(1)}% upside
          </span>
        </div>
      </div>

      {/* Range Visualizer Bar */}
      <div className="pt-2">
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
          <span>Bear: ${bearTarget}</span>
          <span className="text-indigo-400 font-bold">Current: ${currentPrice}</span>
          <span className="text-emerald-400 font-bold">Base: ${baseTarget}</span>
          <span>Bull: ${bullTarget}</span>
        </div>
        <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          {/* Fill range from bear to bull */}
          <div className="absolute top-0 bottom-0 bg-slate-800 left-0 right-0" />
          
          {/* Base Target marker */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-indigo-400 z-10"
            style={{ left: `${basePos}%` }}
            title={`Base Target: $${baseTarget}`}
          />
          
          {/* Current price marker */}
          <div
            className="absolute top-0 bottom-0 w-3 bg-cyan-400 border border-white rounded-full z-20 shadow-lg shadow-cyan-500/50 transform -translate-x-1/2"
            style={{ left: `${currentPos}%` }}
            title={`Current Price: $${currentPrice}`}
          />
        </div>
      </div>
    </div>
  );
};
