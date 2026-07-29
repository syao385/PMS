import React, { useState } from 'react';
import { FileText, Copy, Download, Check } from 'lucide-react';

interface MemoReaderProps {
  markdownContent: string;
  ticker: string;
}

export const MemoReader: React.FC<MemoReaderProps> = ({ markdownContent, ticker }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Institutional Investment Memo ({ticker})</h2>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
};
