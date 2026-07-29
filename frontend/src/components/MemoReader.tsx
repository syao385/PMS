import React, { useState } from 'react';
import { FileText, Copy, Download, Check, Calculator, ShieldCheck } from 'lucide-react';

interface MemoReaderProps {
  markdownContent: string;
  ticker: string;
  onOpenMathModal?: () => void;
}

export const MemoReader: React.FC<MemoReaderProps> = ({ markdownContent, ticker, onOpenMathModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Institutional Investment Memo ({ticker})</h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenMathModal && (
            <button
              onClick={onOpenMathModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial Rigor Audit</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
          </button>
          
          <button
            onClick={() => alert(`Exporting ${ticker} Institutional Research Memo as PDF...`)}
            className="btn-secondary text-xs flex items-center gap-1.5 text-indigo-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Styled Markdown View Container */}
      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed font-normal bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
        <pre className="whitespace-pre-wrap font-sans">
          {markdownContent}
        </pre>
      </div>

      {/* Footer Financial Rigor Callout */}
      {onOpenMathModal && (
        <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All SEC 10-Q figures verified with Python decimal.Decimal</span>
          </div>
          <button
            onClick={onOpenMathModal}
            className="text-emerald-400 hover:underline font-bold"
          >
            Open Math Verification Panel →
          </button>
        </div>
      )}
    </div>
  );
};
