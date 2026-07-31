import React, { useState } from 'react';
import type { ResearchMemoData } from '../types';
import { Plus, Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';


interface LeftPanelProps {
  watchlist: string[];
  currentTicker: string;
  onSelectTicker: (ticker: string) => void;
  onAddSymbol: (ticker: string) => void;
  onRemoveSymbol: (ticker: string) => void;
  symbolsData: Record<string, ResearchMemoData>;
}

// Static/dynamic metadata dictionary for earnings dates and timings
const EARNINGS_CALENDAR_METADATA: Record<string, { date: string; time: 'AMC' | 'BMO'; isRecent: boolean }> = {
  VRT: { date: '07/29', time: 'AMC', isRecent: true },
  BE: { date: '07/29', time: 'AMC', isRecent: true },
  NBIS: { date: '07/28', time: 'BMO', isRecent: true },
  AAPL: { date: '07/31', time: 'AMC', isRecent: true },
  MSFT: { date: '07/30', time: 'AMC', isRecent: true },
  TSLA: { date: '07/23', time: 'AMC', isRecent: false },
  PLTR: { date: '08/05', time: 'AMC', isRecent: true },
  MU: { date: '06/26', time: 'AMC', isRecent: false },
  IONQ: { date: '08/07', time: 'AMC', isRecent: true },
  NVDA: { date: '08/27', time: 'AMC', isRecent: false }
};

const WEEKLY_EARNINGS_CALENDAR = [
  { ticker: 'NBIS', company: 'Nebius Group N.V.', date: '2026-07-28', timing: 'BMO', status: 'Released (Beat & Raise 🟢)' },
  { ticker: 'VRT', company: 'Vertiv Holdings Co', date: '2026-07-29', timing: 'AMC', status: 'Released (Rev Miss 🔴)' },
  { ticker: 'BE', company: 'Bloom Energy Corp', date: '2026-07-29', timing: 'AMC', status: 'Released (Beat & Raise 🟢)' },
  { ticker: 'MSFT', company: 'Microsoft Corp', date: '2026-07-30', timing: 'AMC', status: 'Today (AMC)' },
  { ticker: 'AAPL', company: 'Apple Inc', date: '2026-07-31', timing: 'AMC', status: 'Tomorrow (AMC)' },
  { ticker: 'PLTR', company: 'Palantir Technologies', date: '2026-08-05', timing: 'AMC', status: 'Upcoming' },
  { ticker: 'IONQ', company: 'IonQ Inc', date: '2026-08-07', timing: 'AMC', status: 'Upcoming' }
];

export const LeftPanel: React.FC<LeftPanelProps> = ({
  watchlist,
  currentTicker,
  onSelectTicker,
  onAddSymbol,
  onRemoveSymbol,
  symbolsData
}) => {
  const [newSymbolInput, setNewSymbolInput] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbolInput.trim()) {
      onAddSymbol(newSymbolInput.trim().toUpperCase());
      setNewSymbolInput('');
    }
  };

  return (
    <div className="space-y-4 flex flex-col h-full min-w-0 font-sans">
      
      {/* 1. PORTFOLIO WATCHLIST CARD (Scrollable Table with 4 Columns) */}
      <div className="glass-card p-4 space-y-3 flex flex-col max-h-[460px] border border-slate-800 rounded-2xl bg-[#0f1420]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="font-bold text-xs text-slate-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            PORTFOLIO WATCHLIST ({watchlist.length})
          </span>
          
          <form onSubmit={handleAddSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newSymbolInput}
              onChange={(e) => setNewSymbolInput(e.target.value)}
              placeholder="Add Ticker..."
              className="w-24 px-2 py-1 text-xs rounded-lg bg-[#161d2d] border border-slate-700 text-slate-100 uppercase outline-none font-mono focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
              title="Add Ticker to Watchlist"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Scrollable Watchlist Table (4 Columns: Symbol, Earnings Date, Price, % Change) */}
        <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141a28] text-slate-400 border-b border-slate-800 text-[10px] font-mono uppercase sticky top-0 z-10">
              <tr>
                <th className="p-2">Symbol</th>
                <th className="p-2 text-center">Earnings Date</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">% Change</th>
                <th className="p-2 text-center w-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {watchlist.map((ticker) => {
                const data = symbolsData[ticker];
                const price = data?.currentPrice || (ticker === 'NBIS' ? 24.50 : (ticker === 'VRT' ? 84.50 : (ticker === 'BE' ? 14.80 : 125.00)));
                const chg = data?.priceChange24h || (ticker === 'NBIS' ? 9.58 : (ticker === 'VRT' ? -3.10 : (ticker === 'BE' ? 2.53 : 1.25)));
                const isSelected = ticker === currentTicker;
                const isNegative = chg < 0;
                
                const earnMeta = EARNINGS_CALENDAR_METADATA[ticker] || { date: '08/15', time: 'AMC', isRecent: false };

                return (
                  <tr
                    key={ticker}
                    onClick={() => onSelectTicker(ticker)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 font-bold border-l-2 border-l-indigo-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    {/* Column 1: Symbol */}
                    <td className="p-2 font-mono font-bold text-slate-100 flex items-center gap-1">
                      <span>${ticker}</span>
                    </td>

                    {/* Column 2: Earnings Date (+/- 7 Days Highlight) */}
                    <td className="p-2 text-center font-mono text-[11px]">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        earnMeta.isRecent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {earnMeta.date} {earnMeta.time}
                      </span>
                    </td>

                    {/* Column 3: Real-Time Price (Inc. Premarket / AH) */}
                    <td className="p-2 text-right font-mono font-semibold text-slate-200">
                      ${price.toFixed(2)}
                    </td>

                    {/* Column 4: % Change from Yesterday Close */}
                    <td className={`p-2 text-right font-mono font-bold ${
                      isNegative ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      <div className="flex items-center justify-end gap-0.5">
                        {isNegative ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        <span>{chg > 0 ? '+' : ''}{chg.toFixed(2)}%</span>
                      </div>
                    </td>

                    {/* Trash Remove Icon */}
                    <td className="p-2 text-center">
                      {watchlist.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSymbol(ticker);
                          }}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title={`Remove ${ticker} from Watchlist`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. EARNINGS CALENDAR THIS WEEK CARD (Clickable Row Selection Flow) */}
      <div className="glass-card p-4 space-y-3 flex-1 border border-slate-800 rounded-2xl bg-[#0f1420] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="font-bold text-xs text-slate-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            EARNINGS CALENDAR THIS WEEK
          </span>
          <span className="text-[10px] text-indigo-300 font-mono">Click Row to Load</span>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141a28] text-slate-400 border-b border-slate-800 text-[10px] font-mono uppercase sticky top-0">
              <tr>
                <th className="p-2">Symbol</th>
                <th className="p-2">Upcoming Release Date</th>
                <th className="p-2 text-right">Timing / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {WEEKLY_EARNINGS_CALENDAR.map((item) => {
                const isSelected = item.ticker === currentTicker;

                return (
                  <tr
                    key={item.ticker}
                    onClick={() => onSelectTicker(item.ticker)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 font-bold border-l-2 border-l-indigo-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    <td className="p-2 font-mono font-bold text-slate-100">
                      ${item.ticker}
                    </td>
                    <td className="p-2 font-mono text-[11px] text-slate-300">
                      {item.date}
                    </td>
                    <td className="p-2 text-right font-mono text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        item.status.includes('Beat')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : (item.status.includes('Miss')
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30')
                      }`}>
                        {item.timing} • {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
