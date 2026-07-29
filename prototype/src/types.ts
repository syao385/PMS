export interface MasterScore {
  name: string;
  avatar: string;
  philosophy: string;
  score: number; // 1.0 to 5.0
  keyQuote: string;
  pros: string[];
  cons: string[];
}

export interface ValuationScenario {
  bearTarget: number;
  baseTarget: number;
  bullTarget: number;
  currentPrice: number;
  currency: string;
  marginOfSafetyPct: number;
}

export interface MirrorTest {
  passed: boolean;
  fiveSentenceSummary: string;
  clarityScore: number;
}

export interface FinancialMetric {
  label: string;
  value: string;
  verified: boolean;
  discrepancyPct: number;
  calculatedValue: string;
  formula: string;
}

export interface ResearchMemoData {
  ticker: string;
  companyName: string;
  sector: string;
  currentPrice: number;
  priceChange24h: number;
  masterScores: {
    duan: MasterScore;
    buffett: MasterScore;
    munger: MasterScore;
    lilu: MasterScore;
    overall: number;
  };
  mirrorTest: MirrorTest;
  valuation: ValuationScenario;
  financialMetrics: FinancialMetric[];
  markdownContent: string;
}

export interface MagnaScoreCard {
  momentumScore: number; // M: Gap % & initial price move (0-20)
  accelerationScore: number; // A: Volume surge ratio (0-20)
  gapClearanceScore: number; // G: Base breakout & no overhead supply (0-20)
  newsCatalystScore: number; // N: Earnings surprise & margin expansion (0-20)
  accumulationScore: number; // A: HOD close ratio & institutional order flow (0-20)
  totalMagnaScore: number; // 0-100
}

export interface UnifiedScannerItem {
  ticker: string;
  name: string;
  sector: string;
  roic: number;
  peRatio: number;
  debtToEquity: number;
  moatScore: number;
  passedChecklist: boolean;
  gapPct: number;
  volumeRatio: number;
  earningsSurprisePct: number;
  hodCloseRatio: number;
  magnaScore: MagnaScoreCard;
  catalystSummary: string;
  verdict: 'QUALIFIED EP 🟢' | 'QUALITY WATCH 🟡' | 'REJECTED 🔴';
}

export interface ThesisDriftItem {
  id: string;
  ticker: string;
  period: string;
  status: 'INTACT' | 'DRIFTING' | 'BROKEN';
  moatDelta: string;
  guidanceChange: string;
  marginTrend: string;
  summary: string;
  date: string;
}

export interface NewsPulseItem {
  id: string;
  ticker: string;
  priceMove: number;
  timeframe: string;
  date: string;
  fundamentalAttribution: number;
  betaAttribution: number;
  liquidityAttribution: number;
  keyDrivers: string[];
  verdict: string;
}

export interface TradeJournalEntry {
  id: string;
  date: string;
  ticker: string;
  action: 'BUY' | 'SELL' | 'SHORT' | 'COVER';
  price: number;
  shares: number;
  convictionScore: number;
  thesisSummary: string;
  mirrorTestPassed: boolean;
  riskCheckPassed: boolean;
}
