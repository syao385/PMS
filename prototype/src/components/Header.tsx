import React, { useState } from 'react';
import { Search, CheckCircle2, RefreshCw, Plus, X } from 'lucide-react';

interface HeaderProps {
  currentTicker: string;
  onSelectTicker: (ticker: string) => void;
  watchlist: string[];
  onAddSymbol: (ticker: string) => void;
  onRemoveSymbol: (ticker: string) => void;
  onOpenMathModal: () => void;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTicker,
  onSelectTicker,
  watchlist,
  onAddSymbol,
  onRemoveSymbol,
  onOpenMathModal,
  isAnalyzing,
  onAnalyze
}) => {
  const [newSymbolInput, setNewSymbolInput] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbolInput.trim()) {
      onAddSymbol(newSymbolInput.trim().toUpperCase());
      setNewSymbolInput('');
      setShowAddInput(false);
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-40 px-6 py-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title / Brand */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Institutional PMS Dashboard
              <span className="badge badge-indigo">Phase 1 Engine</span>
            </h1>
            <p className="text-xs text-slate-400">Qualitative AI Research & Market-Neutral Quant Strategy</p>
          </div>
        </div>

        {/* Watchlist & Symbol Add/Remove Controls */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 flex-wrap">
          <div className="flex items-center gap-1 px-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Watchlist:</span>
          </div>

          {watchlist.map((t) => (
            <div
              key={t}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentTicker === t
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <button onClick={() => onSelectTicker(t)}>{t}</button>
              {watchlist.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSymbol(t);
                  }}
                  className="text-slate-400 hover:text-rose-400 p-0.5 rounded"
                  title={`Remove ${t}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {showAddInput ? (
            <form onSubmit={handleAddSubmit} className="flex items-center gap-1">
              <input
                type="text"
                value={newSymbolInput}
                onChange={(e) => setNewSymbolInput(e.target.value)}
                placeholder="Ticker (e.g. MSFT)"
                className="w-24 px-2 py-1 text-xs rounded bg-slate-950 border border-blue-500 text-white uppercase outline-none font-mono"
                autoFocus
              />
              <button type="submit" className="btn-primary py-1 px-2 text-xs">Add</button>
              <button type="button" onClick={() => setShowAddInput(false)} className="text-slate-400 p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowAddInput(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center gap-1 border border-slate-700/50"
              title="Add symbol to portfolio watchlist"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Add Symbol</span>
            </button>
          )}

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="btn-primary py-1.5 px-3 text-xs ml-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Re-Run Engine'}
          </button>
        </div>

        {/* Audit Status Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMathModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40 text-xs font-mono transition-all"
            title="Click to inspect exact decimal mathematical verification"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Math Rigor</span>
          </button>
        </div>

      </div>
    </header>
  );
};
