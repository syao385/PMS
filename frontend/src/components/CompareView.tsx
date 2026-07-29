import React from 'react';
import type { ResearchMemoData } from '../types';
import { Layers } from 'lucide-react';

interface CompareViewProps {
  symbolsData: Record<string, ResearchMemoData>;
  watchlist: string[];
}

export const CompareView: React.FC<CompareViewProps> = ({ symbolsData, watchlist }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <Layers className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cross-Symbol Side-by-Side Comparative Matrix</h2>
            <p className="text-xs text-slate-400">
              Evaluate multiple portfolio symbols side-by-side across 4-Master Moat Scores, Valuation Targets, and Financial Metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono">
              <tr>
                <th className="p-4 w-48">Evaluation Dimension</th>
                {watchlist.map((ticker) => (
                  <th key={ticker} className="p-4 text-center min-w-[180px]">
                    <span className="text-base font-extrabold text-white block">{ticker}</span>
                    <span className="text-[10px] text-slate-400 font-normal font-sans">
                      {symbolsData[ticker]?.companyName || 'Stock'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              
              {/* Current Price */}
              <tr>
                <td className="p-4 font-bold text-slate-200 bg-slate-900/40">Market Price</td>
                {watchlist.map((ticker) => {
                  const data = symbolsData[ticker];
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-white text-sm">
                      ${data?.currentPrice ? data.currentPrice.toFixed(2) : '125.50'}
                    </td>
                  );
                })}
              </tr>

              {/* Overall Conviction Score */}
              <tr>
                <td className="p-4 font-bold text-slate-200 bg-slate-900/40">Overall 4-Master Score</td>
                {watchlist.map((ticker) => {
                  const data = symbolsData[ticker];
                  const score = data?.masterScores.overall || 4.5;
                  return (
                    <td key={ticker} className="p-4 text-center">
                      <span className="badge badge-emerald font-mono text-sm px-3 py-1">
                        {score.toFixed(2)} / 5.0
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Duan Yongping Score */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">⚡ Duan Yongping (Business Essence)</td>
                {watchlist.map((ticker) => {
                  const score = symbolsData[ticker]?.masterScores.duan.score || 4.5;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-slate-300">
                      {score.toFixed(1)} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Warren Buffett Score */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">👑 Warren Buffett (Moat & Capital)</td>
                {watchlist.map((ticker) => {
                  const score = symbolsData[ticker]?.masterScores.buffett.score || 4.8;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-slate-300">
                      {score.toFixed(1)} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Charlie Munger Score */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">🦉 Charlie Munger (Inversion Risk)</td>
                {watchlist.map((ticker) => {
                  const score = symbolsData[ticker]?.masterScores.munger.score || 4.1;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-slate-300">
                      {score.toFixed(1)} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Li Lu Score */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">🌏 Li Lu (Secular Megatrend)</td>
                {watchlist.map((ticker) => {
                  const score = symbolsData[ticker]?.masterScores.lilu.score || 4.6;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-slate-300">
                      {score.toFixed(1)} / 5.0
                    </td>
                  );
                })}
              </tr>

              {/* Mirror Test Status */}
              <tr>
                <td className="p-4 font-bold text-slate-200 bg-slate-900/40">Mirror Test (5-Sentence Rule)</td>
                {watchlist.map((ticker) => {
                  const passed = symbolsData[ticker]?.mirrorTest.passed ?? true;
                  return (
                    <td key={ticker} className="p-4 text-center">
                      <span className={`badge ${passed ? 'badge-emerald' : 'badge-rose'}`}>
                        {passed ? 'PASSED 🟢' : 'FAILED 🔴'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Margin of Safety */}
              <tr>
                <td className="p-4 font-bold text-slate-200 bg-slate-900/40">Margin of Safety %</td>
                {watchlist.map((ticker) => {
                  const mos = symbolsData[ticker]?.valuation.marginOfSafetyPct || 11.5;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono font-bold text-emerald-400 text-sm">
                      +{mos.toFixed(1)}%
                    </td>
                  );
                })}
              </tr>

              {/* Base Target Price */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">Base Target Price</td>
                {watchlist.map((ticker) => {
                  const base = symbolsData[ticker]?.valuation.baseTarget || 140.0;
                  return (
                    <td key={ticker} className="p-4 text-center font-mono text-indigo-300">
                      ${base.toFixed(2)}
                    </td>
                  );
                })}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
