export interface FinancialModel5Yr {
  model_type: string;
  model_name: string;
  assumptions: {
    tax_rate_pct: number;
    wacc_discount_rate_pct: number;
    terminal_growth_rate_pct: number;
    target_multiple_label: string;
    target_multiple_val: string;
    current_price: number;
    shares_outstanding: number;
    debt: number;
    cash: number;
  };
  projections: Array<{
    year: string;
    period: number;
    revenue: number;
    growth_pct: number;
    fcf_margin_pct: number;
    unlevered_fcf: number;
    discount_factor: number;
    pv_fcf: number;
  }>;
  terminal_valuation: {
    terminal_fcf?: number;
    terminal_revenue?: number;
    exit_multiple: string;
    terminal_enterprise_value: number;
    pv_terminal_value: number;
  };
  valuation_bridge: {
    enterprise_value: number;
    cash: number;
    debt: number;
    equity_value: number;
    intrinsic_value_per_share: number;
    current_market_price: number;
    upside_pct: number;
    implied_irr_pct: number;
  };
  rule_of_40_analysis: {
    score: number;
    tier: string;
    revenue_growth_pct: number;
    fcf_margin_pct: number;
    wacc_adjustment: number;
    term_g_boost: number;
    ev_sales_multiple_boost: number;
  };
}

export interface ValuationData {
  bearTarget: number;
  baseTarget: number;
  bullTarget: number;
  analystTarget?: number;
  currentPrice: number;
  currency: string;
  marginOfSafetyPct: number;
  primaryModel?: string;
  modelType?: string;
  metricLabel?: string;
  currentMetricVal?: string;
  fiveYrAvgVal?: string;
  industryAvgVal?: string;
  vs5yrPct?: number;
  vsIndustryPct?: number;
  revenueGrowthPct?: number;
  fcfMarginPct?: number;
  ruleOf40Score?: number;
  ruleOf40Tier?: string;
  roicPct?: number;
  valuationScore?: number;
  statusLabel?: string;
  isPreProfitGrowth?: boolean;
}

export interface MasterScoreItem {
  name: string;
  avatar: string;
  philosophy: string;
  score: number;
  keyQuote: string;
  pros: string[];
  cons: string[];
}

export interface MasterScores {
  duan: MasterScoreItem;
  buffett: MasterScoreItem;
  munger: MasterScoreItem;
  lilu: MasterScoreItem;
  overall: number;
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
  industryName?: string;
  currentPrice: number;
  priceChange24h: number;
  masterScores: MasterScores;
  mirrorTest: MirrorTest;
  valuation: ValuationData;
  financialModel5yr?: FinancialModel5Yr;
  financialMetrics: FinancialMetric[];
  markdownContent: string;
}

export interface UnifiedScannerItem {
  ticker: string;
  name: string;
  sector: string;
  industry?: string;
  roic: number;
  peRatio: number;
  modelType?: string;
  currentMetricVal?: string;
  fiveYrAvgVal?: string;
  industryAvgVal?: string;
  revenueGrowthPct?: number;
  fcfMarginPct?: number;
  ruleOf40Score?: number;
  debtToEquity: number;
  moatScore: number;
  passedChecklist: boolean;
  gapPct: number;
  volumeRatio: number;
  earningsSurprisePct: number;
  hodCloseRatio: number;
  valuationScore?: number;
  statusLabel?: string;
  magnaScore: {
    momentumScore: number;
    accelerationScore: number;
    gapClearanceScore: number;
    newsCatalystScore: number;
    accumulationScore: number;
    totalMagnaScore: number;
  };
  catalystSummary: string;
  verdict: string;
}

export interface ThesisDriftItem {
  id: string;
  ticker: string;
  period: string;
  status: 'INTACT' | 'DRIFTING' | 'BREACHED';
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
  action: 'BUY' | 'SELL' | 'TRIM' | 'ADD';
  price: number;
  shares: number;
  convictionScore: number;
  thesisSummary: string;
  mirrorTestPassed: boolean;
  riskCheckPassed: boolean;
}
