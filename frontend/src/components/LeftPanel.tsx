import React, { useState } from 'react';
import type { ResearchMemoData } from '../types';
import { Plus, Trash2, RefreshCw, Zap } from 'lucide-react';

interface LeftPanelProps {
  watchlist: string[];
  currentTicker: string;
  onSelectTicker: (ticker: string) => void;
  onAddSymbol: (ticker: string) => void;
  onRemoveSymbol: (ticker: string) => void;
  symbolsData: Record<string, ResearchMemoData>;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  watchlist,
  currentTicker,
  onSelectTicker,
  onAddSymbol,
  onRemoveSymbol,
  symbolsData
}) => {
  const [newSymbolInput, setNewSymbolInput] = useState('');
  const [tradeSide, setTradeSide] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeShares, setTradeShares] = useState<number>(10);
  const [tradeTab, setTradeTab] = useState<'trade' | 'positions' | 'history'>('trade');

  const activeData = symbolsData[currentTicker] || symbolsData['NVDA'];
  const activePrice = activeData?.currentPrice || 125.50;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbolInput.trim()) {
      onAddSymbol(newSymbolInput.trim().toUpperCase());
      setNewSymbolInput('');
    }
  };

  const mockInPlayList = [
    { ticker: 'NVDA', catalyst: 'Blackwell Demand Beat', chg: +3.42 },
    { ticker: 'PLTR', catalyst: 'AIP Commercial Growth', chg: +5.80 },
    { ticker: 'ARM', catalyst: 'v9 Royalty Rate Expansion', chg: +4.15 },
    { ticker: 'AAPL', catalyst: 'Apple Intelligence Refresh', chg: -0.45 },
    { ticker: 'TSLA', catalyst: 'FSD V13 Release Catalyst', chg: -1.20 }
  ];

  return (
    <div className="space-y-4 flex flex-col h-full min-w-0">
      
      {/* 1. WATCHLIST CARD (MarketTerminal Scrollable & Clickable) */}
      <div className="glass-card p-4 space-y-3 flex flex-col max-h-[380px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            PORTFOLIO WATCHLIST
          </span>
          
          <form onSubmit={handleAddSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newSymbolInput}
              onChange={(e) => setNewSymbolInput(e.target.value)}
              placeholder="Add (e.g. AMZN)..."
              className="w-28 px-2 py-1 text-xs rounded bg-slate-950 border border-slate-700 text-white uppercase outline-none font-mono focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-all"
              title="Add Ticker"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Scrollable Watchlist Table */}
        <div className="overflow-y-auto flex-1 pr-1">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[10px] font-mono uppercase">
              <tr>
                <th className="p-2">Symbol</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">24h Chg</th>
                <th className="p-2 text-center w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {watchlist.map((ticker) => {
                const data = symbolsData[ticker];
                const price = data?.currentPrice || 100.0;
                const chg = data?.priceChange24h || 0.0;
                const isSelected = ticker === currentTicker;

                return (
                  <tr
                    key={ticker}
                    onClick={() => onSelectTicker(ticker)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 font-bold border-l-2 border-l-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-900/50 hover:text-white'
                    }`}
                  >
                    <td className="p-2 font-mono font-bold">{ticker}</td>
                    <td className="p-2 text-right font-mono">${price.toFixed(2)}</td>
                    <td className="p-2 text-right">
                      <span className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        chg >= 0 ? 'bg-emerald-950/80 text-emerald-400' : 'bg-rose-950/80 text-rose-400'
                      }`}>
                        {chg >= 0 ? '+' : ''}{chg.toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      {watchlist.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSymbol(ticker);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                          title={`Remove ${ticker}`}
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

      {/* 2. TOP 10 IN-PLAY AI CANDIDATES CARD */}
      <div className="glass-card p-4 space-y-3 flex flex-col max-h-[300px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            TOP IN-PLAY (AI)
          </span>
          <button className="text-slate-400 hover:text-white text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 space-y-2">
          {mockInPlayList.map((item) => (
            <div
              key={item.ticker}
              onClick={() => onSelectTicker(item.ticker)}
              className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 flex items-center justify-between text-xs cursor-pointer"
            >
              <div>
                <span className="font-bold font-mono text-white block">{item.ticker}</span>
                <span className="text-[10px] text-slate-400 truncate block max-w-[150px]">
                  {item.catalyst}
                </span>
              </div>
              <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                item.chg >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
              }`}>
                {item.chg >= 0 ? '+' : ''}{item.chg}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ORDER EXECUTION & POSITIONS CARD */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTradeTab('trade')}
              className={`text-xs font-bold font-mono px-2 py-1 rounded transition-colors ${
                tradeTab === 'trade' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              TRADE
            </button>
            <button
              onClick={() => setTradeTab('positions')}
              className={`text-xs font-bold font-mono px-2 py-1 rounded transition-colors ${
                tradeTab === 'positions' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              POSITIONS
            </button>
          </div>
          <span className="font-mono text-xs font-bold text-slate-300">{currentTicker}</span>
        </div>

        {tradeTab === 'trade' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">Market Price:</span>
              <span className="font-mono font-bold text-white">${activePrice.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTradeSide('BUY')}
                className={`py-2 rounded-lg font-bold font-mono text-xs transition-all ${
                  tradeSide === 'BUY'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                BUY / LONG
              </button>
              <button
                onClick={() => setTradeSide('SELL')}
                className={`py-2 rounded-lg font-bold font-mono text-xs transition-all ${
                  tradeSide === 'SELL'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold">Share Quantity:</label>
              <input
                type="number"
                value={tradeShares}
                onChange={(e) => setTradeShares(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-1">
              <span>Est. Total Cost:</span>
              <span className="text-white font-bold">${(activePrice * tradeShares).toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert(`Executed ${tradeSide} order for ${tradeShares} shares of ${currentTicker}!`)}
              className={`w-full py-2.5 rounded-xl font-bold font-mono text-xs transition-all shadow-md ${
                tradeSide === 'BUY' ? 'btn-primary' : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              Execute {tradeSide} Order
            </button>
          </div>
        )}

        {tradeTab === 'positions' && (
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold font-mono text-white block">NVDA (Long)</span>
                <span className="text-[10px] text-slate-400">250 Shares @ $121.80</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">+$925.00 (+3.0%)</span>
            </div>
            <button
              onClick={() => alert('Liquidated position!')}
              className="w-full py-2 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold hover:bg-rose-900/60 transition-all"
            >
              Liquidate Position
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
