import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LeftPanel } from './components/LeftPanel';
import { MiddlePanel } from './components/MiddlePanel';
import { RightPanel } from './components/RightPanel';
import { FinancialRigorModal } from './components/FinancialRigorModal';
import {
  mockTickerData,
  mockThesisDriftData,
  mockNewsPulseData,
  mockUnifiedScannerData,
  mockJournalData
} from './mockData';
import type { ResearchMemoData } from './types';
import { RefreshCw } from 'lucide-react';

export function App() {
  const [currentTicker, setCurrentTicker] = useState<string>('NVDA');
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR', 'MU', 'IONQ', 'NBIS']);
  const [activeTab, setActiveTab] = useState<
    'skills' | 'research' | 'scanner' | 'compare' | 'drift' | 'pulse' | 'journal'
  >('skills');
  
  const [symbolsData, setSymbolsData] = useState<Record<string, ResearchMemoData>>(mockTickerData);
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const roundVal = (n: number) => Math.round(n * 100) / 100;

  const activeData = symbolsData[currentTicker] || mockTickerData[currentTicker] || mockTickerData['NVDA'];

  const handleAddSymbol = (symbol: string) => {
    const sym = symbol.toUpperCase().trim();
    if (!watchlist.includes(sym)) {
      setWatchlist((prev) => [...prev, sym]);
    }
    setCurrentTicker(sym);
  };

  const handleRemoveSymbol = (symbol: string) => {
    const updated = watchlist.filter((s) => s !== symbol);
    if (updated.length > 0) {
      setWatchlist(updated);
      if (currentTicker === symbol) {
        setCurrentTicker(updated[0]);
      }
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* HEADER BAR (MarketTerminal Style) */}
      <header className="h-14 bg-[#0a0d1e]/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-50 shrink-0">
        
        {/* Brand & Market Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 text-xs font-mono">
              ⚡
            </div>
            <div className="text-sm font-extrabold text-white tracking-wider font-sans">
              INST<span className="text-blue-500">PMS</span> <span className="text-slate-500 text-xs font-mono">// MARKET TERMINAL</span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden md:flex items-center gap-2 text-xs font-mono">
            <span className="pulse-indicator" />
            <span className="text-emerald-400 font-bold">CFI 5-YEAR MODEL ENGINE</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">FCF DCF & EV/Sales Rule of 40 Solvers</span>
          </div>
        </div>

        {/* Portfolio Cash & PnL Quick Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">CASH BALANCE</span>
            <span className="font-bold text-white">$250,000.00</span>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">PORTFOLIO P&L</span>
            <span className="font-bold text-emerald-400">+$18,450.00 (+7.38%)</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn-primary py-1 px-3 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing Live...' : 'Re-Run Live Engine'}
          </button>
        </div>

      </header>

      {/* MAIN 3-PANEL GRID LAYOUT */}
      <main className="flex-1 p-4 max-w-[1920px] w-full mx-auto grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-y-auto">
        
        {/* LEFT PANEL */}
        <section className="xl:col-span-3 min-w-0">
          <LeftPanel
            watchlist={watchlist}
            currentTicker={currentTicker}
            onSelectTicker={(t) => setCurrentTicker(t)}
            onAddSymbol={handleAddSymbol}
            onRemoveSymbol={handleRemoveSymbol}
            symbolsData={symbolsData}
          />
        </section>

        {/* CENTER PANEL */}
        <section className="xl:col-span-6 min-w-0">
          <MiddlePanel
            currentTicker={currentTicker}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeData={activeData}
            symbolsData={symbolsData}
            watchlist={watchlist}
            mockUnifiedScannerData={mockUnifiedScannerData}
            mockThesisDriftData={mockThesisDriftData}
            mockNewsPulseData={mockNewsPulseData}
            mockJournalData={mockJournalData}
            onOpenMathModal={() => setIsMathModalOpen(true)}
            onSelectTicker={(t) => setCurrentTicker(t)}
          />
        </section>

        {/* RIGHT PANEL */}
        <section className="xl:col-span-3 min-w-0">
          <RightPanel currentTicker={currentTicker} />
        </section>

      </main>

      {/* Math Verification & CFI 5-Year Financial Model Modal */}
      <FinancialRigorModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        metrics={activeData.financialMetrics}
        ticker={activeData.ticker}
        financialModel={activeData.financialModel5yr}
      />

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 py-3 px-6 text-center text-xs text-slate-500 flex justify-between items-center bg-[#070913]">
        <div>Institutional PMS Platform — CFI / Macabacus Standard Financial Model Engine</div>
        <div className="font-mono text-emerald-400">SQLite Database Persistent Watchlist</div>
      </footer>

    </div>
  );
}

export default App;
