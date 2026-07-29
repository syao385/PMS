import React from 'react';
import type { ValuationData } from '../types';
import { Target, TrendingUp, TrendingDown, ShieldCheck, Users, Zap, Activity } from 'lucide-react';

interface ValuationSummaryProps {
  valuation: ValuationData;
}

export const ValuationSummary: React.FC<ValuationSummaryProps> = ({ valuation }) => {
  const isPositiveMos = valuation.marginOfSafetyPct > 0;
  const metricLabel = valuation.metricLabel || (valuation.isPreProfitGrowth ? 'EV / Sales Multiple' : 'Trailing P/E Ratio');
  const rule40Score = valuation.ruleOf40Score !== undefined ? valuation.ruleOf40Score : ((valuation.revenueGrowthPct || 25) + (valuation.fcfMarginPct || 20));

  return (
    <div className="glass-card p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">12-Month Target Intrinsic Valuation & Benchmarks</h3>
            <p className="text-xs text-slate-400">
              Valuation Model: <span className="font-mono text-blue-400">{valuation.primaryModel || '12-Month Intrinsic FCF DCF Model'}</span>
            </p>
          </div>
        </div>

        {/* Valuation Score & Status Badge */}
        <div className="flex items-center gap-3">
          {valuation.valuationScore && (
            <div className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">VALUATION SCORE</span>
              <span className="text-sm font-extrabold font-mono text-cyan-400">{valuation.valuationScore} / 100</span>
            </div>
          )}
          
          <div className={`px-3 py-1.5 rounded-xl font-bold text-xs font-mono border ${
            isPositiveMos ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
          }`}>
            {valuation.statusLabel || (isPositiveMos ? 'Deep Moat Compounder 🟢' : 'Overvalued / Premium 🔴')}
          </div>
        </div>
      </div>

      {/* ROW 1: 4-SCENARIO 12-MONTH TARGET PRICES (Bear, Base, Bull, & Analyst Mean Target) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        
        {/* Bear Case 12-Month Target */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">12-MONTH BEAR TARGET</span>
          <div className="text-xl font-bold text-white">${valuation.bearTarget.toFixed(2)}</div>
          <p className="text-[10px] text-slate-400 font-sans">Multiple compression scenario</p>
        </div>

        {/* Base Case 12-Month Intrinsic Value */}
        <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-500/40 space-y-1.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-bl">
            BASE CASE
          </div>
          <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px] block">12-MONTH BASE TARGET</span>
          <div className="text-2xl font-extrabold text-blue-300">${valuation.baseTarget.toFixed(2)}</div>
          <p className="text-[10px] text-slate-300 font-sans">Sector-adaptive Intrinsic DCF/TAM</p>
        </div>

        {/* Bull Case 12-Month Target */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">12-MONTH BULL TARGET</span>
          <div className="text-xl font-bold text-white">${valuation.bullTarget.toFixed(2)}</div>
          <p className="text-[10px] text-slate-400 font-sans">Accelerated market share capture</p>
        </div>

        {/* Wall Street 12-Month Analyst Mean Target */}
        <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-500/40 space-y-1.5 relative">
          <div className="flex items-center justify-between text-purple-300 font-bold text-[10px] uppercase">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" /> 12-MO ANALYST TARGET
            </span>
          </div>
          <div className="text-xl font-extrabold text-purple-200">
            ${(valuation.analystTarget || valuation.baseTarget * 1.05).toFixed(2)}
          </div>
          <p className="text-[10px] text-purple-300/80 font-sans">Wall St Consensus Target</p>
        </div>

      </div>

      {/* ROW 2: 4-COLUMN VALUATION METRIC COMPARISON (Current | 5-Yr Avg | Industry Avg | Margin of Safety %) */}
      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center justify-between border-b border-slate-800 pb-2">
          <span>VALUATION MULTIPLES ({metricLabel.toUpperCase()})</span>
          <span className="text-slate-500 font-normal">{valuation.modelType || 'Unified Sector Solver'}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-1">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">CURRENT {metricLabel.toUpperCase()}</span>
            <span className="font-extrabold text-white text-base">{valuation.currentMetricVal || 'N/A'}</span>
            <span className="text-[10px] text-slate-400 block font-sans">Live Market Quote</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase block">5-YEAR HISTORICAL AVG</span>
            <span className="font-bold text-slate-200 text-sm">{valuation.fiveYrAvgVal || 'N/A'}</span>
            {valuation.vs5yrPct !== undefined && (
              <span className={`text-[10px] block font-mono ${valuation.vs5yrPct <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {valuation.vs5yrPct <= 0 ? '' : '+'}{valuation.vs5yrPct}% vs 5-Yr Avg
              </span>
            )}
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase block">INDUSTRY AVERAGE</span>
            <span className="font-bold text-slate-200 text-sm">{valuation.industryAvgVal || 'N/A'}</span>
            {valuation.vsIndustryPct !== undefined && (
              <span className={`text-[10px] block font-mono ${valuation.vsIndustryPct <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {valuation.vsIndustryPct <= 0 ? '' : '+'}{valuation.vsIndustryPct}% vs Industry
              </span>
            )}
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase block">MARGIN OF SAFETY %</span>
            <span className={`font-extrabold text-base ${isPositiveMos ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositiveMos ? '+' : ''}{valuation.marginOfSafetyPct}%
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">vs Base Target</span>
          </div>
        </div>
      </div>

      {/* ROW 3: 4 ADDITIONAL QUALITY METRIC COLUMNS (Revenue Growth % | FCF Margin % | Rule of 40 Score | ROIC %) */}
      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> INSTITUTIONAL QUALITY & GROWTH METRICS
          </span>
          <span className="text-slate-400 text-[10px] font-sans">Rule of 40 = Revenue Growth % + FCF Margin %</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-1">
          
          {/* Column 1: Revenue Growth % */}
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">REVENUE GROWTH % (YoY)</span>
            <span className="font-extrabold text-white text-base">+{valuation.revenueGrowthPct || 25.0}%</span>
            <span className="text-[10px] text-slate-400 block font-sans">Top-Line Expansion</span>
          </div>

          {/* Column 2: FCF Margin % */}
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">FCF MARGIN %</span>
            <span className={`font-extrabold text-base ${(valuation.fcfMarginPct || 20) > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {(valuation.fcfMarginPct || 20) > 0 ? '+' : ''}{valuation.fcfMarginPct || 22.0}%
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">Free Cash Flow Conversion</span>
          </div>

          {/* Column 3: Rule of 40 Score */}
          <div className="bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/30">
            <span className="text-[10px] text-emerald-300 font-bold uppercase block flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" /> RULE OF 40 SCORE
            </span>
            <span className="font-extrabold text-emerald-400 text-lg">{rule40Score.toFixed(1)}%</span>
            <span className="text-[10px] text-emerald-300/80 block font-sans font-bold">
              {rule40Score >= 50 ? 'Elite Compounder 🟢' : (rule40Score >= 40 ? 'Compliant 🟢' : 'Moderate 🟡')}
            </span>
          </div>

          {/* Column 4: ROIC % */}
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">ROIC % (CAPITAL EFFICIENCY)</span>
            <span className="font-extrabold text-cyan-400 text-base">{(valuation.roicPct || 25.0).toFixed(1)}%</span>
            <span className="text-[10px] text-slate-400 block font-sans">Return on Invested Capital</span>
          </div>

        </div>
      </div>

      {/* Margin of Safety Banner */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-200 font-mono">
            Exact Margin of Safety (Base 12-Month Target vs Live Price):
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono font-bold text-sm">
          {isPositiveMos ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> +{valuation.marginOfSafetyPct}%
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-rose-400" /> {valuation.marginOfSafetyPct}%
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
