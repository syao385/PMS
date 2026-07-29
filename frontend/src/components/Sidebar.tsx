import React from 'react';
import {
  FileText,
  Filter,
  GitCompare,
  Activity,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'research' | 'scanner' | 'compare' | 'drift' | 'pulse' | 'journal';
  setActiveTab: (tab: 'research' | 'scanner' | 'compare' | 'drift' | 'pulse' | 'journal') => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed
}) => {
  const menuItems = [
    { id: 'research', label: 'AI Research Memo', icon: FileText, badge: '4-Master' },
    { id: 'scanner', label: 'Universal Scanner', icon: Filter, badge: 'MAGNA+TV' },
    { id: 'compare', label: 'Cross-Symbol Matrix', icon: Layers, badge: 'Compare' },
    { id: 'drift', label: 'Thesis Drift Delta', icon: GitCompare, badge: '10-Q' },
    { id: 'pulse', label: 'News Pulse Attribution', icon: Activity, badge: '10-Min' },
    { id: 'journal', label: 'Trade Rationale Journal', icon: BookOpen, badge: 'Audit' }
  ] as const;

  return (
    <aside className={`bg-[#0a0d1e] border-r border-slate-800 flex flex-col transition-all duration-300 z-30 shrink-0 ${
      collapsed ? 'w-20 p-4' : 'w-64 p-5'
    }`}>
      
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 font-bold">
              ⚡
            </div>
            <div>
              <div className="text-lg font-extrabold text-white tracking-wider font-sans">
                INST<span className="text-blue-500">PMS</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block -mt-1">Institutional Platform</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600/15 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {!collapsed && <span className="text-xs font-semibold">{item.label}</span>}
              </div>

              {!collapsed && (
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' : 'bg-slate-900 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Status Pulse */}
      {!collapsed && (
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="pulse-indicator" />
            <span>Multi-Agent Engine Active</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Gemini 3.6 Pro + yfinance + TradingView
          </div>
        </div>
      )}

    </aside>
  );
};
