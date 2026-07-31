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

// Finviz-style Earnings Release Matrix (Exact match with Finviz Widget Layout)
interface FinvizCalendarRow {
  dateSession: string; // e.g. "Jul 29/a", "Jul 30/b", "Jul 30/a"
  tickers: string[];
}

const FINVIZ_EARNINGS_MATRIX: FinvizCalendarRow[] = [
  { dateSession: 'Jul 29/a', tickers: ['MSFT', 'META', 'LRCX', 'ARM', 'QCOM', 'SBUX', 'VRT', 'BE'] },
  { dateSession: 'Jul 30/b', tickers: ['MA', 'SHEL', 'BBVA', 'BUD', 'NBIS', 'BMY', 'MO', 'SO'] },
  { dateSession: 'Jul 30/a', tickers: ['AAPL', 'AMZN', 'SYK', 'SONY', 'MFG', 'AJG', 'MPWR', 'VALE'] },
  { dateSession: 'Jul 31', tickers: ['XOM', 'ABBV', 'CVX', 'LIN', 'ETN', 'ENB', 'CL', 'IMO'] },
  { dateSession: 'Aug 03', tickers: ['PLTR', 'VRTX', 'MAR', 'WMB', 'FANG', 'OKE', 'TKO', 'ON'] },
  { dateSession: 'Aug 04', tickers: ['AMD', 'CAT', 'HSBC', 'MRK', 'ANET', 'AMGN', 'TM', 'MU'] },
  { dateSession: 'Aug 05', tickers: ['LLY', 'SNDK', 'WDC', 'NVO', 'DIS', 'SHOP', 'UBER', 'APP'] }
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

  const handleCalendarTickerClick = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      onAddSymbol(symbol);
    }
    onSelectTicker(symbol);
  };

  return (
    <div className="space-y-4 flex flex-col h-full min-w-0 font-sans">
      
      {/* 1. PORTFOLIO WATCHLIST CARD (Scrollable Table with 4 Columns) */}
      <div className="glass-card p-4 space-y-3 flex flex-col max-h-[380px] border border-slate-800 rounded-2xl bg-[#0f1420]">
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

      {/* 2. FINVIZ EARNINGS RELEASE CALENDAR WIDGET (Exact Finviz UI Replica) */}
      <div className="glass-card p-4 space-y-3 flex-1 border border-slate-800 rounded-2xl bg-[#0d121d] flex flex-col overflow-hidden font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-xs text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            FINVIZ EARNINGS RELEASE CALENDAR
          </span>
          <span className="text-[10px] text-blue-400 font-bold">Top 8 / Date</span>
        </div>

        {/* Finviz Table Container */}
        <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#151c2d] text-blue-300 border-b border-slate-800 text-[11px] font-bold">
              <tr>
                <th className="p-2 w-20 border-r border-slate-800">Date</th>
                <th className="p-2">Earnings Release (Top Tickers by Market Cap)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {FINVIZ_EARNINGS_MATRIX.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#151c2d]/60 transition-colors">
                  {/* Date Column (e.g. Jul 29/a, Jul 30/b) */}
                  <td className="p-2 font-bold text-blue-300 border-r border-slate-800 text-[11px] align-middle whitespace-nowrap bg-[#111724]">
                    {row.dateSession}
                  </td>

                  {/* Tickers Grid (8 Pill Buttons per Row) */}
                  <td className="p-2">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                      {row.tickers.map((sym) => {
                        const isCurrent = sym === currentTicker;
                        const isInWatchlist = watchlist.includes(sym);

                        return (
                          <button
                            key={sym}
                            onClick={() => handleCalendarTickerClick(sym)}
                            className={`px-2 py-1 rounded text-[11px] font-bold transition-all text-center truncate ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 ring-1 ring-blue-400 font-extrabold'
                                : (isInWatchlist
                                  ? 'bg-indigo-900/60 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/40'
                                  : 'bg-[#182032] hover:bg-blue-600/80 text-blue-200 hover:text-white border border-slate-800')
                            }`}
                            title={`Click to analyze ${sym} earnings report`}
                          >
                            {sym}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Legend */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>/b = Before Market Open</span>
          <span>/a = After Market Close</span>
        </div>
      </div>

    </div>
  );
};
