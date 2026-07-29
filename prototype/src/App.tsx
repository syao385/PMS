import { useState } from 'react';
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
import { RefreshCw } from 'lucide-react';

export function App() {
  const [currentTicker, setCurrentTicker] = useState<string>('NVDA');
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR']);
  const [activeTab, setActiveTab] = useState<
    'research' | 'scanner' | 'compare' | 'drift' | 'pulse' | 'journal'
  >('research');
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const activeData = mockTickerData[currentTicker] || mockTickerData['NVDA'];

  const handleAddSymbol = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
    setCurrentTicker(symbol);
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
    }, 1200);
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
            <span className="text-emerald-400 font-bold">US MARKETS: LIVE</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Gemini 3.6 Pro + yfinance</span>
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
            {isAnalyzing ? 'Analyzing...' : 'Re-Run Engine'}
          </button>
        </div>

      </header>

      {/* MAIN 3-PANEL GRID LAYOUT (MarketTerminal 340px 1fr 380px Grid) */}
      <main className="flex-1 p-4 max-w-[1920px] w-full mx-auto grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-y-auto">
        
        {/* LEFT PANEL: Watchlist, In-Play AI Candidates, Trade Terminal (3 cols) */}
        <section className="xl:col-span-3 min-w-0">
          <LeftPanel
            watchlist={watchlist}
            currentTicker={currentTicker}
            onSelectTicker={(t) => setCurrentTicker(t)}
            onAddSymbol={handleAddSymbol}
            onRemoveSymbol={handleRemoveSymbol}
            symbolsData={mockTickerData}
          />
        </section>

        {/* CENTER PANEL: Quote Header, Navigation Tabs, Main Views (6 cols) */}
        <section className="xl:col-span-6 min-w-0">
          <MiddlePanel
            currentTicker={currentTicker}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeData={activeData}
            symbolsData={mockTickerData}
            watchlist={watchlist}
            mockUnifiedScannerData={mockUnifiedScannerData}
            mockThesisDriftData={mockThesisDriftData}
            mockNewsPulseData={mockNewsPulseData}
            mockJournalData={mockJournalData}
            onOpenMathModal={() => setIsMathModalOpen(true)}
          />
        </section>

        {/* RIGHT PANEL: News Portal Feed, Volatility & Sentiment, Macro Board (3 cols) */}
        <section className="xl:col-span-3 min-w-0">
          <RightPanel currentTicker={currentTicker} />
        </section>

      </main>

      {/* Math Verification Modal */}
      <FinancialRigorModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        metrics={activeData.financialMetrics}
        ticker={activeData.ticker}
      />

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 py-3 px-6 text-center text-xs text-slate-500 flex justify-between items-center bg-[#070913]">
        <div>Institutional PMS Platform — MarketTerminal 3-Panel Architecture</div>
        <div className="font-mono text-slate-400">Environment: Prototype Demo | Status: Operational</div>
      </footer>

    </div>
  );
}

export default App;
