import React, { useState } from 'react';
import { Search, ExternalLink, Globe, ShieldCheck, Activity } from 'lucide-react';

interface RightPanelProps {
  currentTicker: string;
}

export const RightPanel: React.FC<RightPanelProps> = ({ currentTicker }) => {
  const [newsQuery, setNewsQuery] = useState('');
  const [activeFeedTab, setActiveFeedTab] = useState<'ALL' | 'WSJ' | 'CNBC' | 'GOOGLE' | 'REDDIT'>('ALL');

  const newsItems = [
    {
      id: 'n1',
      title: `${currentTicker}: Institutional AI Demand Remains Acceleration Engine into Q3`,
      url: `https://finance.yahoo.com/quote/${currentTicker}/news`,
      source: 'WSJ Tech',
      feed: 'WSJ',
      time: '12 mins ago',
      category: 'EARNINGS',
      sentiment: 'positive'
    },
    {
      id: 'n2',
      title: `Federal Reserve Signals Rate Path Stability as Core Inflation Normalizes`,
      url: 'https://www.google.com/search?q=Federal+Reserve+interest+rates&tbm=nws',
      source: 'CNBC Markets',
      feed: 'CNBC',
      time: '34 mins ago',
      category: 'MACRO',
      sentiment: 'neutral'
    },
    {
      id: 'n3',
      title: `Blackwell GPU Server Clusters See Zero Orders Cancelled Among Hyperscalers`,
      url: `https://www.google.com/search?q=${currentTicker}+stock+news&tbm=nws`,
      source: 'Google News',
      feed: 'GOOGLE',
      time: '1 hour ago',
      category: 'HARDWARE',
      sentiment: 'positive'
    },
    {
      id: 'n4',
      title: `Reddit r/stocks Discussion: Institutional Moat vs Short-Term Valuation Volatility`,
      url: `https://www.reddit.com/r/stocks/search/?q=${currentTicker}`,
      source: 'r/stocks',
      feed: 'REDDIT',
      time: '2 hours ago',
      category: 'SOCIAL',
      sentiment: 'positive'
    }
  ];

  const filteredNews = activeFeedTab === 'ALL' ? newsItems : newsItems.filter((n) => n.feed === activeFeedTab);

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = newsQuery.trim() || `${currentTicker} stock news`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`, '_blank');
  };

  return (
    <div className="space-y-4 flex flex-col h-full min-w-0">
      
      {/* 1. MULTI-FEED NEWS INTELLIGENCE CARD (MarketTerminal Style) */}
      <div className="glass-card p-4 space-y-3 flex flex-col max-h-[420px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            NEWS PORTAL FEED
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Live Google & Yahoo News</span>
        </div>

        {/* Feed Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 overflow-x-auto text-[10px] font-mono">
          {(['ALL', 'WSJ', 'CNBC', 'GOOGLE', 'REDDIT'] as const).map((feed) => (
            <button
              key={feed}
              onClick={() => setActiveFeedTab(feed)}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                activeFeedTab === feed ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {feed}
            </button>
          ))}
        </div>

        {/* Google / Yahoo Search Bar */}
        <form onSubmit={handleGoogleSearch} className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={newsQuery}
              onChange={(e) => setNewsQuery(e.target.value)}
              placeholder={`Search news for ${currentTicker}...`}
              className="w-full pl-7 pr-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>
          <button type="submit" className="btn-primary text-xs py-1 px-2.5">
            Search
          </button>
        </form>

        {/* Scrollable News Items */}
        <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 space-y-1.5 transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    item.sentiment === 'positive' ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-slate-400'
                  }`} />
                  <span className="text-slate-400">{item.source}</span>
                </div>
                <span className="badge badge-indigo text-[9px] py-0 px-1.5">{item.category}</span>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 block"
              >
                {item.title}
                <ExternalLink className="w-3 h-3 inline ml-1 text-slate-500 group-hover:text-blue-400" />
              </a>

              <div className="text-[10px] text-slate-500 font-mono text-right">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SENTIMENT & VOLATILITY GAUGES CARD */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            VOLATILITY & SENTIMENT
          </span>
          <span className="badge badge-emerald text-[9px]">VIX: Low</span>
        </div>

        {/* VIX Fear Gauge */}
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 font-mono block text-[10px]">CBOE VOLATILITY INDEX (VIX)</span>
            <span className="font-bold text-emerald-400 text-sm font-mono">Low Volatility (Risk-On)</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold font-mono text-white block">14.85</span>
            <span className="text-[10px] font-mono text-emerald-400">-0.42 (-2.75%)</span>
          </div>
        </div>

        {/* Institutional vs Retail Split Progress Bars */}
        <div className="space-y-2 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>INSTITUTIONAL SENTIMENT</span>
              <span className="text-emerald-400 font-bold">68% BULLISH</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '68%' }} />
              <div className="bg-slate-600 h-full" style={{ width: '22%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '10%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>RETAIL SOCIAL SENTIMENT</span>
              <span className="text-amber-400 font-bold">54% BULLISH</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '54%' }} />
              <div className="bg-slate-600 h-full" style={{ width: '21%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '25%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. MACRO ECONOMIC INDICATORS BOARD CARD */}
      <div className="glass-card p-4 space-y-2.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            MACRO INDICATORS BOARD
          </span>
          <span className="text-[10px] font-mono text-slate-400">US Macro</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">FED FUNDS RATE</span>
            <span className="font-bold text-white">5.25%</span>
          </div>

          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">10Y TREASURY</span>
            <span className="font-bold text-indigo-300">4.28%</span>
          </div>

          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">CORE CPI (YoY)</span>
            <span className="font-bold text-emerald-400">3.30%</span>
          </div>

          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">MACRO REGIME</span>
            <span className="font-bold text-amber-300 text-[10px]">Tech Expansion</span>
          </div>
        </div>
      </div>

    </div>
  );
};
