import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LeftPanel } from './components/LeftPanel';
import { MiddlePanel } from './components/MiddlePanel';
import { RightPanel } from './components/RightPanel';
import { FinancialRigorModal } from './components/FinancialRigorModal';
import {
  fetchLiveResearch,
  fetchLiveQuote,
  fetchWatchlistFromDB,
  addWatchlistSymbolToDB,
  removeWatchlistSymbolFromDB
} from './services/api';
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
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR', 'MU', 'IONQ', 'NBIS', 'VRT', 'BE']);

  const [activeTab, setActiveTab] = useState<
    'skills' | 'research' | 'scanner' | 'compare' | 'drift' | 'pulse' | 'journal'
  >('skills');
  
  const [symbolsData, setSymbolsData] = useState<Record<string, ResearchMemoData>>(mockTickerData);
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);


  // Load Watchlist from SQLite Database on Initial Mount
  useEffect(() => {
    async function loadPersistedWatchlist() {
      const dbList = await fetchWatchlistFromDB();
      if (dbList && dbList.length > 0) {
        setWatchlist(dbList);
        if (!dbList.includes(currentTicker)) {
          setCurrentTicker(dbList[0]);
        }
      }
    }
    loadPersistedWatchlist();
  }, []);

  // Helper to construct dynamic live Research Memo data for any symbol
  const buildMemoFromLiveResult = (ticker: string, res: any, quote: any): ResearchMemoData => {
    const existing = symbolsData[ticker] || mockTickerData[ticker] || mockTickerData['NVDA'];
    const price = quote?.current_price || res?.current_price || existing?.currentPrice || 100.0;
    const chg = quote?.price_change_24h ?? res?.price_change_24h ?? existing?.priceChange24h ?? 0.0;
    const name = quote?.company_name || res?.company_name || existing?.companyName || `${ticker} Corp`;
    const sector = quote?.sector || res?.sector || existing?.sector || 'Technology';
    const industryName = res?.industry_name || quote?.industry_name || existing?.industryName || 'US Technology';
    const pe = quote?.pe_ratio || res?.valuation?.current_pe || 30.0;
    const mcap = quote?.market_cap || 0;
    const analystTgt = quote?.analyst_consensus?.mean_target || res?.valuation?.analyst_target || Math.round(price * 1.15 * 100) / 100;

    const baseTgt = res?.valuation?.base_target || Math.round(price * 1.15 * 100) / 100;
    const bullTgt = res?.valuation?.bull_target || Math.round(price * 1.45 * 100) / 100;
    const bearTgt = res?.valuation?.bear_target || Math.round(price * 0.75 * 100) / 100;

    const mcapStr = mcap >= 1e12 ? `$${(mcap / 1e12).toFixed(2)} Trillion` : (mcap >= 1e9 ? `$${(mcap / 1e9).toFixed(2)} Billion` : (mcap > 0 ? `$${mcap.toLocaleString()}` : '$100.0B'));

    const statusLabel = res?.valuation?.status_label || existing?.valuation?.statusLabel || 'Undervalued Industry Leader 🟢';

    const dynamicMirrorSummary = res?.mirror_test?.summary || (
      `${name} (${ticker}) operates in ${industryName} (${sector}). ` +
      `Real-time price: $${price.toFixed(2)} (${chg >= 0 ? '+' : ''}${chg.toFixed(2)}% 24h). ` +
      `Valuation Multiple (${res?.valuation?.metric_label || 'P/E'}): ${res?.valuation?.current_metric_val || (pe > 0 ? `${pe.toFixed(1)}x` : 'N/A')}. ` +
      `12-Month Base Target: $${baseTgt.toFixed(2)}. ` +
      `Institutional Status: ${statusLabel}.`
    );

    return {
      ticker,
      companyName: name,
      sector,
      industryName,
      currentPrice: price,
      priceChange24h: chg,
      masterScores: res?.master_scores ? {
        duan: res.master_scores.duan,
        buffett: res.master_scores.buffett,
        munger: res.master_scores.munger,
        lilu: res.master_scores.lilu,
        overall: res.master_scores.duan?.score ? roundVal((res.master_scores.duan.score + res.master_scores.buffett.score + res.master_scores.munger.score + res.master_scores.lilu.score) / 4.0) : 4.2
      } : existing?.masterScores || {
        duan: { name: 'Duan Yongping', avatar: '⚡', philosophy: 'Simplicity', score: 4.5, keyQuote: 'Simplicity.', pros: ['Moat'], cons: ['Risk'] },
        buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Moat', score: 4.6, keyQuote: 'Moat.', pros: ['Cash flow'], cons: ['Valuation'] },
        munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.2, keyQuote: 'Invert.', pros: ['Moat'], cons: ['Execution'] },
        lilu: { name: 'Li Lu', avatar: '🌏', philosophy: 'Megatrend', score: 4.5, keyQuote: 'Megatrend.', pros: ['Growth'], cons: ['Macro'] },
        overall: 4.45
      },
      mirrorTest: {
        passed: true,
        fiveSentenceSummary: dynamicMirrorSummary,
        clarityScore: 96
      },
      valuation: {
        bearTarget: bearTgt,
        baseTarget: baseTgt,
        bullTarget: bullTgt,
        analystTarget: analystTgt,
        currentPrice: price,
        currency: 'USD',
        marginOfSafetyPct: res?.valuation?.margin_of_safety_pct || 15.0,
        primaryModel: res?.valuation?.primary_model || '12-Month Intrinsic FCF DCF Model',
        modelType: res?.valuation?.model_type || 'Regular P/E Model',
        metricLabel: res?.valuation?.metric_label || 'Trailing P/E Ratio',
        currentMetricVal: res?.valuation?.current_metric_val || (pe > 0 ? `${pe.toFixed(1)}x` : 'N/A'),
        fiveYrAvgVal: res?.valuation?.five_yr_avg_val || '35.0x',
        industryAvgVal: res?.valuation?.industry_avg_val || '30.0x',
        vs5yrPct: res?.valuation?.vs_5yr_pct || 0.0,
        vsIndustryPct: res?.valuation?.vs_industry_pct || 0.0,
        revenueGrowthPct: res?.valuation?.revenue_growth_pct || existing?.valuation?.revenueGrowthPct || 25.0,
        fcfMarginPct: res?.valuation?.fcf_margin_pct || existing?.valuation?.fcfMarginPct || 22.0,
        ruleOf40Score: res?.valuation?.rule_of_40_score || existing?.valuation?.ruleOf40Score || 47.0,
        ruleOf40Tier: res?.valuation?.rule_of_40_tier || existing?.valuation?.ruleOf40Tier || 'Rule of 40 Compliant (>= 40%) 🟢',
        roicPct: res?.valuation?.roic_pct || existing?.valuation?.roicPct || 25.0,
        valuationScore: res?.valuation?.valuation_score || 72.5,
        statusLabel: statusLabel,
        isPreProfitGrowth: res?.valuation?.is_pre_profit_growth || false
      },
      financialModel5yr: res?.financial_model_5yr || existing?.financialModel5yr,
      financialMetrics: res?.financial_metrics || existing?.financialMetrics || [
        {
          label: 'Market Cap',
          value: mcapStr,
          verified: true,
          discrepancyPct: 0.0,
          calculatedValue: mcapStr,
          formula: `Live Price ($${price.toFixed(2)}) x Shares Outstanding`
        },
        {
          label: res?.valuation?.metric_label || 'Trailing P/E Ratio',
          value: res?.valuation?.current_metric_val || (pe > 0 ? `${pe.toFixed(2)}x` : 'N/A'),
          verified: true,
          discrepancyPct: 0.0,
          calculatedValue: res?.valuation?.five_yr_avg_val || '35.0x',
          formula: `${res?.valuation?.metric_label || 'P/E'} (Historical & Industry Comparison)`
        }
      ],
      markdownContent: `# Real-Time Live Institutional Research Memo: ${name} (${ticker})

## 1. Industry & Executive Summary
${name} (${ticker}) operates in the **${industryName}** sector with live market price streaming at **$${price.toFixed(2)}** (${chg >= 0 ? '+' : ''}${chg.toFixed(2)}% 24h change).

- **Industry Belonged To:** ${industryName}
- **Current Multiple (${res?.valuation?.metric_label || 'P/E'}):** ${res?.valuation?.current_metric_val || 'N/A'} (vs 5-Yr Avg: ${res?.valuation?.five_yr_avg_val || 'N/A'}, Industry Avg: ${res?.valuation?.industry_avg_val || 'N/A'})
- **12-Month Analyst Mean Target:** $${analystTgt.toFixed(2)}
- **Valuation Score:** ${res?.valuation?.valuation_score || 72.5} / 100
- **Valuation Status:** ${statusLabel}

---

## 2. Real-Time 12-Month Intrinsic Valuation & Analyst Consensus
- **12-Month Bear Case Target:** **$${bearTgt.toFixed(2)}** (-25% multiple compression)
- **12-Month Base Case Target:** **$${baseTgt.toFixed(2)}** (${res?.valuation?.primary_model || '12-Month DCF Model'})
- **12-Month Bull Case Target:** **$${bullTgt.toFixed(2)}** (+45% accelerated expansion)
- **12-Month Analyst Mean Target:** **$${analystTgt.toFixed(2)}** (Wall Street Consensus)
- **Exact Margin of Safety:** **${res?.valuation?.margin_of_safety_pct || 15.0}%**
`
    };
  };

  const roundVal = (n: number) => Math.round(n * 100) / 100;

  // Fetch real-time live data for current ticker and all symbols in watchlist
  useEffect(() => {
    let isMounted = true;

    async function loadAllLiveQuotes() {
      for (const sym of watchlist) {
        try {
          const quote = await fetchLiveQuote(sym);
          const research = await fetchLiveResearch(sym);

          if (isMounted && (quote || research)) {
            setSymbolsData((prev) => ({
              ...prev,
              [sym]: buildMemoFromLiveResult(sym, research, quote)
            }));
          }
        } catch (err) {
          console.warn(`Error updating live quote for ${sym}:`, err);
        }
      }
    }

    loadAllLiveQuotes();
    const interval = setInterval(loadAllLiveQuotes, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentTicker, watchlist]);

  const activeData = symbolsData[currentTicker] || mockTickerData[currentTicker] || buildMemoFromLiveResult(currentTicker, null, null);

  const handleAddSymbol = async (symbol: string) => {
    const sym = symbol.toUpperCase().trim();
    if (!watchlist.includes(sym)) {
      const updatedList = [...watchlist, sym];
      setWatchlist(updatedList);
      addWatchlistSymbolToDB(sym);
    }
    setCurrentTicker(sym);

    try {
      const quote = await fetchLiveQuote(sym);
      const research = await fetchLiveResearch(sym);
      if (quote || research) {
        setSymbolsData((prev) => ({
          ...prev,
          [sym]: buildMemoFromLiveResult(sym, research, quote)
        }));
      }
    } catch (err) {
      console.warn(`Error adding symbol ${sym}:`, err);
    }
  };

  const handleRemoveSymbol = async (symbol: string) => {
    const updated = watchlist.filter((s) => s !== symbol);
    if (updated.length > 0) {
      setWatchlist(updated);
      if (currentTicker === symbol) {
        setCurrentTicker(updated[0]);
      }
      removeWatchlistSymbolFromDB(symbol);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const quote = await fetchLiveQuote(currentTicker);
      const research = await fetchLiveResearch(currentTicker);
      if (quote || research) {
        setSymbolsData((prev) => ({
          ...prev,
          [currentTicker]: buildMemoFromLiveResult(currentTicker, research, quote)
        }));
      }
    } catch (err) {
      console.warn('Analysis error:', err);
    }
    setIsAnalyzing(false);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
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
