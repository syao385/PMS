import React from 'react';
import type { ResearchMemoData, UnifiedScannerItem, ThesisDriftItem, NewsPulseItem, TradeJournalEntry } from '../types';
import { MasterScoreCards } from './MasterScoreCard';
import { MirrorTestBanner } from './MirrorTestBanner';
import { ValuationSummary } from './ValuationSummary';
import { MemoReader } from './MemoReader';
import { UnifiedScannerView } from './UnifiedScannerView';
import { CompareView } from './CompareView';
import { JournalingView } from './JournalingView';
import { AiSkillsHub } from './AiSkillsHub';
import {
  FileText,
  Filter,
  Layers,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Building2,
  Calculator,
  Sparkles

} from 'lucide-react';

interface MiddlePanelProps {
  currentTicker: string;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  activeData: ResearchMemoData;
  symbolsData: Record<string, ResearchMemoData>;
  watchlist: string[];
  mockUnifiedScannerData: UnifiedScannerItem[];
  mockThesisDriftData: ThesisDriftItem[];
  mockNewsPulseData: NewsPulseItem[];
  mockJournalData: TradeJournalEntry[];
  onOpenMathModal: () => void;
  onSelectTicker: (ticker: string) => void;
}

export const MiddlePanel: React.FC<MiddlePanelProps> = ({
  currentTicker,
  activeTab,
  setActiveTab,
  activeData,
  symbolsData,
  watchlist,
  mockUnifiedScannerData,
  mockJournalData,
  onOpenMathModal,
  onSelectTicker
}) => {
  // 5 Clean Core Institutional Workspaces
  const navTabs = [
    { id: 'skills', label: '📊 AI Berkshire Hub', icon: Sparkles },
    { id: 'research', label: '📄 AI Research Memo', icon: FileText },
    { id: 'scanner', label: '🔍 Universal Screener', icon: Filter },
    { id: 'portfolio', label: '🏛️ Portfolio & Risk Review', icon: Layers },
    { id: 'journal', label: '📓 Trade Journal', icon: BookOpen }
  ] as const;

  return (
    <div className="space-y-4 flex flex-col h-full min-w-0 font-sans">
      
      {/* 1. TICKER QUOTE DETAILS BANNER CARD */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800 rounded-2xl bg-[#0f1420]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold font-mono shadow-lg shadow-indigo-600/20">
            ${activeData.ticker}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">{activeData.companyName}</h1>
              <span className="badge badge-indigo text-[10px] font-mono">{activeData.sector}</span>
            </div>
            <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-500" /> {activeData.industryName || 'US Equity'}
              </span>
              <span>•</span>
              <button
                onClick={onOpenMathModal}
                className="px-2 py-0.5 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <Calculator className="w-3 h-3 text-emerald-400" /> Financial Rigor Audit
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Ticker Metrics Grid */}
        <div className="flex items-center gap-4 bg-[#141a28] px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Live Price (Ext. Hours)</div>
            <div className="text-lg font-bold font-mono text-white flex items-center gap-1.5">
              ${activeData.currentPrice.toFixed(2)}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center ${
                activeData.priceChange24h >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
              }`}>
                {activeData.priceChange24h >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {activeData.priceChange24h >= 0 ? '+' : ''}{activeData.priceChange24h}%
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Open</div>
            <div className="font-bold font-mono text-slate-200">${(activeData.currentPrice * 0.985).toFixed(2)}</div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Day High / Low</div>
            <div className="font-bold font-mono text-slate-200">
              ${(activeData.currentPrice * 1.015).toFixed(2)} / ${(activeData.currentPrice * 0.98).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TAB BAR (5 Clean Workspaces) */}
      <div className="glass-card p-1.5 flex items-center gap-1 overflow-x-auto text-xs font-mono border border-slate-800 rounded-xl bg-[#0f1420]">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN TAB CONTENT AREA */}
      <div className="flex-1 min-h-0">
        {activeTab === 'skills' && (
          <div className="h-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <AiSkillsHub
              watchlist={watchlist}
              currentTicker={currentTicker}
              onSelectTicker={onSelectTicker}
            />
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-4 animate-fade-in">
            <MasterScoreCards scores={activeData.masterScores} />
            <MirrorTestBanner mirrorTest={activeData.mirrorTest} />
            <ValuationSummary valuation={activeData.valuation} />
            <MemoReader markdownContent={activeData.markdownContent} ticker={activeData.ticker} onOpenMathModal={onOpenMathModal} />
          </div>
        )}

        {activeTab === 'scanner' && (
          <UnifiedScannerView scannerItems={mockUnifiedScannerData} />
        )}

        {activeTab === 'portfolio' && (
          <CompareView symbolsData={symbolsData} watchlist={watchlist} />
        )}

        {activeTab === 'journal' && (
          <JournalingView journalEntries={mockJournalData} />
        )}
      </div>

    </div>
  );
};
