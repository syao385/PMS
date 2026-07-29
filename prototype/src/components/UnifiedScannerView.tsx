import React, { useState } from 'react';
import type { UnifiedScannerItem } from '../types';
import { Filter, Zap, ExternalLink, ShieldCheck, Award } from 'lucide-react';

interface UnifiedScannerViewProps {
  scannerItems: UnifiedScannerItem[];
}

export const UnifiedScannerView: React.FC<UnifiedScannerViewProps> = ({ scannerItems }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');

  const selectedItem = scannerItems.find((i) => i.ticker === selectedSymbol) || scannerItems[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="glass-card p-6 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Universal Quality & StockBee MAGNA EP Scanner</h2>
            <p className="text-xs text-slate-400">
              Merging fundamental quality filters (ROIC $\ge 15\%$, Moat $\ge 4.0$) with StockBee MAGNA Episodic Pivot catalysts & embedded TradingView charting.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Table on Left / Embedded Chart & MAGNA Breakdown on Right (MarketTerminal Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / MAIN TABLE (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xs text-white uppercase tracking-wider">Candidate Universe</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Click row to update embedded chart</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Symbol</th>
                    <th className="p-3 text-right">ROIC</th>
                    <th className="p-3 text-right">Gap %</th>
                    <th className="p-3 text-right">RVOL</th>
                    <th className="p-3 text-right">Surprise</th>
                    <th className="p-3 text-center">MAGNA Score</th>
                    <th className="p-3 text-center">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {scannerItems.map((item) => {
                    const isSelected = item.ticker === selectedSymbol;

                    return (
                      <tr
                        key={item.ticker}
                        onClick={() => setSelectedSymbol(item.ticker)}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'bg-blue-600/20 border-l-4 border-l-blue-500' : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <td className="p-3 font-bold text-white">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-blue-400">{item.ticker}</span>
                            <span className="text-[10px] text-slate-400 font-normal truncate max-w-[100px]">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400">{item.roic}%</td>
                        <td className="p-3 text-right font-mono text-slate-200">+{item.gapPct}%</td>
                        <td className="p-3 text-right font-mono text-amber-400">{item.volumeRatio}x</td>
                        <td className="p-3 text-right font-mono text-indigo-300">+{item.earningsSurprisePct}%</td>
                        <td className="p-3 text-center">
                          <span className="font-mono font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            {item.magnaScore.totalMagnaScore} / 100
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`badge ${
                            item.verdict.includes('QUALIFIED') ? 'badge-emerald' : item.verdict.includes('WATCH') ? 'badge-amber' : 'badge-rose'
                          } text-[10px] py-0.5`}>
                            {item.verdict}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Symbol Catalyst Summary */}
          {selectedItem && (
            <div className="glass-card p-4 space-y-2 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Catalyst Note for {selectedItem.ticker}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Moat Score: {selectedItem.moatScore}/5.0</span>
              </div>
              <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                "{selectedItem.catalystSummary}"
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: EMBEDDED TRADINGVIEW CHART & MAGNA BREAKDOWN (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Embedded TradingView Technical Chart */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-mono text-base">{selectedItem.ticker}</span>
                <span className="badge badge-indigo text-[10px]">TradingView Embedded</span>
              </div>
              <a
                href={`https://www.tradingview.com/symbols/NASDAQ-${selectedItem.ticker}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Full Chart</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Chart Canvas */}
            <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>20-EMA: $122.40</span>
                <span>50-SMA: $115.80</span>
                <span className="text-emerald-400 font-bold">RSI: 64.2</span>
              </div>

              {/* Price Candlesticks Mock */}
              <div className="flex items-end justify-around h-40 px-2 gap-1.5">
                {[50, 58, 54, 68, 64, 78, 72, 88, 82, 96, 92, 100].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-xs ${
                        idx % 2 === 0 ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-800/60">
                Volume Profile Accumulation Node at $120.00-$124.50
              </div>
            </div>
          </div>

          {/* StockBee MAGNA 5-Point Score Card */}
          {selectedItem && (
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  MAGNA 5-Point Criteria ({selectedItem.ticker})
                </span>
                <span className="font-mono font-extrabold text-amber-300 text-sm">
                  {selectedItem.magnaScore.totalMagnaScore} / 100
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* M */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">M — Momentum / Opening Gap</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedItem.magnaScore.momentumScore} / 20</span>
                </div>

                {/* A */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">A — Acceleration / RVOL Surge</span>
                  <span className="font-mono font-bold text-amber-400">{selectedItem.magnaScore.accelerationScore} / 20</span>
                </div>

                {/* G */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">G — Gap & Base Clearance</span>
                  <span className="font-mono font-bold text-indigo-300">{selectedItem.magnaScore.gapClearanceScore} / 20</span>
                </div>

                {/* N */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">N — News & Earnings Surprise</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedItem.magnaScore.newsCatalystScore} / 20</span>
                </div>

                {/* A */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">A — Accumulation (HOD Ratio)</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedItem.magnaScore.accumulationScore} / 20</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
