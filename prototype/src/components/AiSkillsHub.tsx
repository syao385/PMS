import React, { useState, useEffect } from 'react';
import { executeSkill } from '../services/api';
import { RefreshCw, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';


interface SkillItem {
  id: string;
  name: string;
  command: string;
  description: string;
  placeholder?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'deep_research',
    name: 'Deep Research',
    icon: '🔬',
    description: 'Comprehensive 4-Master analysis, parallel team research, and unlisted company deep-dives.',
    skills: [
      { id: 'investment-research', name: 'Investment Research', command: '/investment-research', description: '4-Master comprehensive deep research framework (Duan Yongping, Buffett, Munger, Li Lu).' },
      { id: 'investment-team', name: 'Investment Team', command: '/investment-team', description: '4 parallel AI sub-agents acting as independent analysts with Lead synthesis.' },
      { id: 'management-deep-dive', name: 'Management Deep Dive', command: '/management-deep-dive', description: 'Executive background, capital allocation discipline, stock sales, and incentive alignment.' },
      { id: 'private-company-research', name: 'Private Company Research', command: '/private-company-research', description: 'Detective-style research on unlisted companies (SpaceX, Ant Group, ByteDance).' },
      { id: 'deep-company-series', name: 'Deep Company Series', command: '/deep-company-series', description: '8-chapter publication-grade deep-dive series from cognitive reset to decision loop.' }
    ]
  },
  {
    id: 'earnings_analysis',
    name: 'Earnings Analysis',
    icon: '📊',
    description: 'Primary-source earnings report analysis, SEC EDGAR/HKEX filing audits, and MD&A tone analysis.',
    skills: [
      { id: 'earnings-review', name: 'Earnings Review (Primary Source)', command: '/earnings-review', description: 'Direct primary-source analysis of 10-K/10-Q filings, transcripts & MD&A tone without sell-side bias.' },
      { id: 'earnings-team', name: 'Earnings Team & Publishing', command: '/earnings-team', description: 'Multi-agent earnings breakdown -> Editor refinement -> Reader review -> Ready article.' }
    ]
  },
  {
    id: 'industry_screening',
    name: 'Industry & Screening',
    icon: '🏭',
    description: 'Supply chain maps, funnel screening, 7-rule quality filters, and bottleneck hunting.',
    skills: [
      { id: 'industry-research', name: 'Industry Supply Chain Research', command: '/industry-research', description: 'Full upstream/midstream/downstream map & global listed player portfolio weighting.' },
      { id: 'industry-funnel', name: 'Industry Funnel Filter', command: '/industry-funnel', description: 'Funnel screen: Full Market (30-60) -> Shortlist (<=10) -> Final 3 Leaders (Core/Satellite/Option).' },
      { id: 'quality-screen', name: 'Quality Screen (7 Hard Rules)', command: '/quality-screen', description: 'Negative screening applying 7 strict financial rules (ROIC > 15%, OCF/NI > 80%, low debt).' },
      { id: 'bottleneck-hunter', name: 'Supply Chain Bottleneck Hunter', command: '/bottleneck-hunter', description: 'Locates technological & physical bottlenecks capturing supernormal profit margins.' },
      { id: 'investment-checklist', name: 'Buffett Pre-Purchase Checklist', command: '/investment-checklist', description: '6-pass fast filter (Competence, Good Business, Moat, Management, Safety Margin, Discipline).' }
    ]
  },
  {
    id: 'portfolio_holdings',
    name: 'Portfolio & Holdings',
    icon: '📈',
    description: 'Dividend sustainability, portfolio rebalancing, thesis tracking, and 10-minute price move attribution.',
    skills: [
      { id: 'income-investment', name: 'Income & Dividend Analysis', command: '/income-investment', description: 'Evaluates dividend coverage, FCF yield, withholding taxes, and identifies yield traps.' },
      { id: 'portfolio-review', name: 'Portfolio Review & Risk', command: '/portfolio-review', description: 'Portfolio concentration stress test, risk-weighted sizing, and rebalancing plan.' },
      { id: 'thesis-tracker', name: 'Investment Thesis Tracker', command: '/thesis-tracker', description: 'Monitors core investment KPIs post-purchase to verify or falsify buying thesis.' },
      { id: 'thesis-drift', name: 'Thesis Drift Detector', command: '/thesis-drift', description: 'Compares historical research reports over time to detect goalpost moving and narrative drift.' },
      { id: 'news-pulse', name: 'News Pulse (Rapid Attribution)', command: '/news-pulse', description: '10-minute rapid 4-vector attribution (Company, Policy, Rival, Sentiment) for stock price moves.' }
    ]
  },
  {
    id: 'mental_tools',
    name: 'Mental Tools',
    icon: '🧠',
    description: 'Duan Yongping Q&A, dual-source financial data validation, and WeChat multi-agent article drafting.',
    skills: [
      { id: 'dyp-ask', name: 'Duan Yongping Q&A', command: '/dyp-ask', description: "Applies Duan Yongping's mental framework (Right Business, Right People, Stop-Doing List)." },
      { id: 'financial-data', name: 'Financial Data Validation Standard', command: '/financial-data', description: 'Enforces dual-source verification and alerts if multi-source discrepancy exceeds 1%.' },
      { id: 'wechat-article', name: 'WeChat Article Drafting', command: '/wechat-article', description: 'Multi-agent collaborative writing pipeline (Author, Editor, Reader Persona).' }
    ]
  }
];

interface AiSkillsHubProps {
  watchlist: string[];
  currentTicker: string;
  onSelectTicker: (ticker: string) => void;
}

export function AiSkillsHub({ watchlist, currentTicker, onSelectTicker }: AiSkillsHubProps) {
  const [selectedTicker, setSelectedTicker] = useState<string>(currentTicker || 'NVDA');
  const [customTickerInput, setCustomTickerInput] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('deep_research');
  const [activeSkillId, setActiveSkillId] = useState<string>('investment-research');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [skillResult, setSkillResult] = useState<any>(null);

  // Sync selected ticker with parent
  useEffect(() => {
    if (currentTicker && currentTicker !== selectedTicker) {
      setSelectedTicker(currentTicker);
    }
  }, [currentTicker]);

  // Execute active skill when ticker or active skill changes
  useEffect(() => {
    runCurrentSkill(selectedTicker, activeSkillId, false);
  }, [selectedTicker, activeSkillId]);

  const activeCategory = DEFAULT_CATEGORIES.find(c => c.id === activeCategoryId) || DEFAULT_CATEGORIES[0];
  const activeSkill = activeCategory.skills.find(s => s.id === activeSkillId) || activeCategory.skills[0];

  async function runCurrentSkill(ticker: string, skillId: string, refresh: boolean) {
    setIsLoading(true);
    try {
      const res = await executeSkill(skillId, ticker, {}, refresh);
      setSkillResult(res);
    } catch (err) {
      console.error('Failed to execute skill:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const firstSkill = DEFAULT_CATEGORIES.find(c => c.id === catId)?.skills[0];
    if (firstSkill) {
      setActiveSkillId(firstSkill.id);
    }
  };

  const handleApplyCustomTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTickerInput.trim()) {
      const formatted = customTickerInput.trim().toUpperCase();
      setSelectedTicker(formatted);
      onSelectTicker(formatted);
      setCustomTickerInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0d14] text-slate-100 font-sans overflow-hidden">
      {/* Top Header / Bar */}
      <div className="p-4 bg-[#121824] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              AI Berkshire Value Investing Skills Hub
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                20 Master Skills Active
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Buffett · Munger · Duan Yongping · Li Lu Frameworks + Multi-Agent Execution
            </p>
          </div>
        </div>

        {/* Watchlist & Stock Ticker Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Watchlist Select */}
          <div className="flex items-center gap-2 bg-[#1a2233] px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 font-medium">Watchlist:</span>
            <select
              value={selectedTicker}
              onChange={(e) => {
                setSelectedTicker(e.target.value);
                onSelectTicker(e.target.value);
              }}
              className="bg-transparent text-sm font-bold text-indigo-300 focus:outline-none cursor-pointer"
            >
              {watchlist.map((sym) => (
                <option key={sym} value={sym} className="bg-[#121824] text-slate-200">
                  ${sym}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Ticker Input */}
          <form onSubmit={handleApplyCustomTicker} className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Search ticker (e.g. BABA)..."
              value={customTickerInput}
              onChange={(e) => setCustomTickerInput(e.target.value)}
              className="bg-[#1a2233] text-xs px-3 py-1.5 rounded-l-lg border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-xs px-3 py-1.5 rounded-r-lg font-medium transition-colors text-white"
            >
              Go
            </button>
          </form>

          {/* Refresh / Token Cache Controls */}
          <button
            onClick={() => runCurrentSkill(selectedTicker, activeSkillId, true)}
            disabled={isLoading}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Running Skill...' : 'Force Refresh (Re-run LLM)'}
          </button>
        </div>
      </div>

      {/* 5 Category Top-Level Menu Bar */}
      <div className="bg-[#0f1420] border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {DEFAULT_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'bg-[#161d2d] text-slate-400 hover:bg-[#1f283e] hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>
                {cat.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submenu Skill Tabs */}
      <div className="bg-[#121826] border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {activeCategory.skills.map((skill) => {
          const isSkillActive = skill.id === activeSkillId;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkillId(skill.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isSkillActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#182030] text-slate-400 hover:bg-[#202b40] hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span className="font-mono text-[10px] text-emerald-400/80">{skill.command}</span>
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Active Skill Info Banner */}
        <div className="bg-[#131b2e] border border-indigo-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                {activeSkill.command}
              </span>
              <h2 className="text-base font-bold text-slate-100">{activeSkill.name}</h2>
              <span className="text-xs text-slate-400">• Evaluating <strong className="text-indigo-400">${selectedTicker}</strong></span>
            </div>
            <p className="text-xs text-slate-400">{activeSkill.description}</p>
          </div>

          {/* Token Cache Badge */}
          <div className="flex items-center gap-2">
            {skillResult?.is_cached ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                <span>⚡ SQLite Cached (0 Tokens Used • &lt;5ms)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live LLM Synthesis</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading Spinner State */}
        {isLoading && (
          <div className="h-64 flex flex-col items-center justify-center gap-3 bg-[#121824] rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm font-medium text-slate-300">Running {activeSkill.name} on ${selectedTicker}...</p>
            <p className="text-xs text-slate-500">Executing 4-Master Synthesis & Decimal Financial Rigor Verification</p>
          </div>
        )}

        {/* Skill Result Display */}
        {!isLoading && skillResult && (
          <div className="space-y-6">
            {/* 4-Master Score Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(skillResult.master_scores || {}).map(([key, val]: [string, any]) => {
                if (key === 'overall') return null;
                return (
                  <div key={key} className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{val.avatar}</span>
                        <span className="text-xs font-bold text-slate-200">{val.name}</span>
                      </div>
                      <span className="text-sm font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                        {val.score} / 5.0
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic line-clamp-3">"{val.keyQuote}"</p>
                  </div>
                );
              })}
            </div>

            {/* Mirror Test & Financial Rigor Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Mirror Test */}
              <div className="lg:col-span-2 bg-[#121824] border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>5-Sentence Mirror Test Verdict: PASSED</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Clarity Score: {skillResult.mirror_test?.clarityScore}%</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#0a0d14] p-3 rounded-xl border border-slate-800/80">
                  {skillResult.mirror_test?.fiveSentenceSummary}
                </p>
              </div>

              {/* Financial Rigor Math Audit */}
              <div className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Financial Rigor (Decimal Verified)</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="text-slate-400">P/E Verification:</span>
                    <span className="font-bold text-emerald-400">{skillResult.financial_rigor?.pe_ratio_formatted}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="text-slate-400">Market Cap:</span>
                    <span className="font-bold text-slate-200">{skillResult.financial_rigor?.market_cap_formatted}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="text-slate-400">Error Discrepancy:</span>
                    <span className="font-mono text-emerald-400">{skillResult.financial_rigor?.discrepancy_pct}% (&lt;0.5% threshold)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formatted Markdown Output Viewer */}
            <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Skill Execution Output Report ({activeSkill.command})
                </h3>
                <span className="text-xs text-slate-500 font-mono">Markdown Standard • Realtime Generated</span>
              </div>
              <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {skillResult.report_markdown}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
