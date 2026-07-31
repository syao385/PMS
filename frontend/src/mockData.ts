import type { ResearchMemoData, ThesisDriftItem, NewsPulseItem, UnifiedScannerItem, TradeJournalEntry } from './types';

export const mockTickerData: Record<string, ResearchMemoData> = {
  NVDA: {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    sector: 'Technology',
    industryName: 'Semiconductors & AI Acceleration',
    currentPrice: 196.00,
    priceChange24h: 0.49,


    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence & Simplicity', score: 4.7, keyQuote: 'NVIDIA sells the essential spades & shovels for AI computing.', pros: ['Monopolistic pricing power', 'CUDA ecosystem software moat'], cons: ['Customer concentration'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 4.8, keyQuote: 'CUDA creates an inescapable toll bridge.', pros: ['ROIC exceeds 100%', 'Massive FCF conversion'], cons: ['Hyperscaler capex cycle'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.1, keyQuote: 'Invert: TSMC manufacturing concentration is main risk.', pros: ['Technological moat velocity'], cons: ['Geopolitical supply risk'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.6, keyQuote: 'Compute transition from CPU to GPU.', pros: ['Visionary management'], cons: ['Export restrictions'] },
      overall: 4.55
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'NVIDIA Corporation (NVDA) belongs to Semiconductors & AI Acceleration (Technology). Real-time price: $206.84 (-0.55%). Trailing P/E: 31.6x (vs 5-Yr Avg: 48.5x, Industry Avg: 36.2x). Rule of 40 Score: 72.5% (Rev Growth: 38.0%, FCF Margin: 34.5%). 12-Month Base Target: $696.26. Institutional Status: Deep Moat & FCF Compounder 🟢.',
      clarityScore: 98
    },
    valuation: {
      bearTarget: 287.92,
      baseTarget: 696.26,
      bullTarget: 1440.93,
      analystTarget: 302.83,
      currentPrice: 206.84,
      currency: 'USD',
      marginOfSafetyPct: 236.62,
      primaryModel: '12-Month FCF DCF & Rule of 40 Model',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '31.6x',
      fiveYrAvgVal: '48.5x',
      industryAvgVal: '36.2x',
      vs5yrPct: -34.8,
      vsIndustryPct: -12.7,
      revenueGrowthPct: 38.0,
      fcfMarginPct: 34.5,
      ruleOf40Score: 72.5,
      ruleOf40Tier: 'Elite Compounder (>= 50%) 🟢',
      roicPct: 114.3,
      valuationScore: 99.0,
      statusLabel: 'Deep Moat & FCF Compounder 🟢'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$5.01 Trillion', verified: true, discrepancyPct: 0.0, calculatedValue: '$5,009,871,640,000.00', formula: 'Live Price x Shares' },
      { label: 'Trailing P/E Ratio', value: '31.63x', verified: true, discrepancyPct: -34.8, calculatedValue: '5-Yr Avg: 48.5x', formula: 'Live Price / TTM EPS' }
    ],
    markdownContent: '# Real-Time Research Memo: NVIDIA Corp (NVDA)'
  },
  AAPL: {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Technology',
    industryName: 'Consumer Electronics & Ecosystem',
    currentPrice: 333.02,
    priceChange24h: 3.71,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 4.9, keyQuote: 'Apple has the best consumer ecosystem in business history.', pros: ['Customer retention >98%', 'Massive buyback machine'], cons: ['Hardware cycle elongation'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 4.9, keyQuote: 'Ecosystem toll bridge. Customers will not leave iPhone.', pros: ['High margin Services segment', 'Impeccable capital allocation'], cons: ['Multiple expansion'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.3, keyQuote: 'Invert: App Store regulatory headwinds.', pros: ['Pricing power'], cons: ['Antitrust regulation'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.4, keyQuote: 'Apple Intelligence gateway.', pros: ['On-device AI privacy moat'], cons: ['China revenue volatility'] },
      overall: 4.63
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Apple Inc. (AAPL) belongs to Consumer Electronics & Ecosystem (Technology). Real-time price: $333.02 (+3.71%). Trailing P/E: 40.3x (vs 5-Yr Avg: 28.4x, Industry Avg: 26.5x). Rule of 40 Score: 35.3% (Rev Growth: 8.5%, FCF Margin: 26.8%). 12-Month Base Target: $375.00. Institutional Status: Quality Moat Leader (Premium Multiple) 🟡.',
      clarityScore: 96
    },
    valuation: {
      bearTarget: 260.00,
      baseTarget: 375.00,
      bullTarget: 430.00,
      analystTarget: 345.00,
      currentPrice: 333.02,
      currency: 'USD',
      marginOfSafetyPct: 12.6,
      primaryModel: '12-Month Intrinsic FCF DCF Model',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '40.3x',
      fiveYrAvgVal: '28.4x',
      industryAvgVal: '26.5x',
      vs5yrPct: 41.9,
      vsIndustryPct: 52.1,
      revenueGrowthPct: 8.5,
      fcfMarginPct: 26.8,
      ruleOf40Score: 35.3,
      ruleOf40Tier: 'Moderate Growth & Margin 🟡',
      roicPct: 141.5,
      valuationScore: 52.5,
      statusLabel: 'Quality Moat Leader (Premium Multiple) 🟡'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$4.89 Trillion', verified: true, discrepancyPct: 0.0, calculatedValue: '$4,891,183,295,120.00', formula: 'Live Price x Shares' },
      { label: 'Trailing P/E Ratio', value: '40.32x', verified: true, discrepancyPct: 41.9, calculatedValue: '5-Yr Avg: 28.4x', formula: 'Live Price / TTM EPS' }
    ],
    markdownContent: '# Real-Time Research Memo: Apple Inc (AAPL)'
  },
  MSFT: {
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    sector: 'Technology',
    industryName: 'Enterprise Cloud & Software',
    currentPrice: 381.70,
    priceChange24h: 1.25,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 4.8, keyQuote: 'Azure and Office create mandatory enterprise software tolls.', pros: ['Enterprise lock-in', 'Cloud expansion'], cons: ['OpenAI capex commitment'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 4.7, keyQuote: 'Sticky enterprise recurring revenue.', pros: ['High ROIC', 'Predictable SaaS cash flow'], cons: ['Valuation multiple'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.5, keyQuote: 'Invert: Cloud pricing competition.', pros: ['Copilot monetization'], cons: ['Antitrust bundled apps'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.7, keyQuote: 'Enterprise AI transition leader.', pros: ['Satya Nadella leadership'], cons: ['Regulatory scrutiny'] },
      overall: 4.68
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Microsoft Corporation (MSFT) belongs to Enterprise Cloud & Software (Technology). Real-time price: $381.70 (+1.25%). Trailing P/E: 22.7x (vs 5-Yr Avg: 32.1x, Industry Avg: 31.8x). Rule of 40 Score: 47.2% (Rev Growth: 16.0%, FCF Margin: 31.2%). 12-Month Base Target: $480.00. Institutional Status: Undervalued Industry Leader 🟢.',
      clarityScore: 97
    },
    valuation: {
      bearTarget: 320.00,
      baseTarget: 480.00,
      bullTarget: 550.00,
      analystTarget: 490.00,
      currentPrice: 381.70,
      currency: 'USD',
      marginOfSafetyPct: 25.8,
      primaryModel: '12-Month FCF DCF & Rule of 40 Model',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '22.7x',
      fiveYrAvgVal: '32.1x',
      industryAvgVal: '31.8x',
      vs5yrPct: -29.3,
      vsIndustryPct: -28.6,
      revenueGrowthPct: 16.0,
      fcfMarginPct: 31.2,
      ruleOf40Score: 47.2,
      ruleOf40Tier: 'Rule of 40 Compliant (>= 40%) 🟢',
      roicPct: 34.0,
      valuationScore: 78.2,
      statusLabel: 'Undervalued Industry Leader 🟢'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$2.84 Trillion', verified: true, discrepancyPct: 0.0, calculatedValue: '$2,835,000,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: Microsoft Corp (MSFT)'
  },
  TSLA: {
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industryName: 'Automotive & Clean Energy',
    currentPrice: 313.03,
    priceChange24h: -2.10,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 3.5, keyQuote: 'Automotive is a tough cyclical industry with high capital requirements.', pros: ['EV brand leader', 'FSD AI optionality'], cons: ['Auto margin compression'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 3.4, keyQuote: 'Lacks long-term capital moat compared to tech monopolies.', pros: ['Supercharger network'], cons: ['Price war pressure'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 3.2, keyQuote: 'Invert: BYD and Chinese EV competition.', pros: ['Manufacturing innovation'], cons: ['Execution risks'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.1, keyQuote: 'Autonomy and energy storage megatrends.', pros: ['Energy storage growth'], cons: ['Macro consumer demand'] },
      overall: 3.55
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Tesla, Inc. (TSLA) belongs to Automotive & Clean Energy (Consumer Cyclical). Real-time price: $313.03 (-2.10%). Trailing P/E: 284.6x (vs 5-Yr Avg: 95.0x, Industry Avg: 18.5x). Rule of 40 Score: 20.5% (Rev Growth: 12.0%, FCF Margin: 8.5%). 12-Month Base Target: $310.00. Institutional Status: Speculative / Premium Valuation Risk 🔴.',
      clarityScore: 92
    },
    valuation: {
      bearTarget: 180.00,
      baseTarget: 310.00,
      bullTarget: 450.00,
      analystTarget: 305.00,
      currentPrice: 313.03,
      currency: 'USD',
      marginOfSafetyPct: -0.97,
      primaryModel: '12-Month Mid-Cycle Multiple Solver',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '284.6x',
      fiveYrAvgVal: '95.0x',
      industryAvgVal: '18.5x',
      vs5yrPct: 199.5,
      vsIndustryPct: 1438.2,
      revenueGrowthPct: 12.0,
      fcfMarginPct: 8.5,
      ruleOf40Score: 20.5,
      ruleOf40Tier: 'Moderate Growth & Margin 🟡',
      roicPct: 4.7,
      valuationScore: 5.0,
      statusLabel: 'Speculative / Premium Valuation Risk 🔴'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$1.24 Trillion', verified: true, discrepancyPct: 0.0, calculatedValue: '$1,236,000,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: Tesla Inc (TSLA)'
  },
  PLTR: {
    ticker: 'PLTR',
    companyName: 'Palantir Technologies Inc.',
    sector: 'Technology',
    industryName: 'Enterprise AI Analytics',
    currentPrice: 122.92,
    priceChange24h: 4.80,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 4.4, keyQuote: 'AIP bootcamps build sticky enterprise software moats.', pros: ['Commercial AIP growth', 'Defense moat'], cons: ['High valuation multiple'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 4.3, keyQuote: 'Government & defense software switching costs are immense.', pros: ['GAAP profitability', 'Zero debt'], cons: ['SBC dilution'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.0, keyQuote: 'Invert: Must sustain >30% growth to justify multiple.', pros: ['Operating leverage'], cons: ['SBC expense'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.5, keyQuote: 'Enterprise AI operational integration.', pros: ['Commercial acceleration'], cons: ['Government contract timing'] },
      overall: 4.30
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Palantir Technologies Inc. (PLTR) belongs to Enterprise AI Analytics (Technology). Real-time price: $122.92 (+4.80%). Trailing P/E: 138.1x (vs 5-Yr Avg: 78.0x, Industry Avg: 42.0x). Rule of 40 Score: 55.5% (Rev Growth: 27.0%, FCF Margin: 28.5%). 12-Month Base Target: $135.00. Institutional Status: Undervalued Industry Leader 🟢.',
      clarityScore: 95
    },
    valuation: {
      bearTarget: 85.00,
      baseTarget: 135.00,
      bullTarget: 175.00,
      analystTarget: 130.00,
      currentPrice: 122.92,
      currency: 'USD',
      marginOfSafetyPct: 9.8,
      primaryModel: '12-Month FCF DCF & Rule of 40 Model',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '138.1x',
      fiveYrAvgVal: '78.0x',
      industryAvgVal: '42.0x',
      vs5yrPct: 77.1,
      vsIndustryPct: 228.8,
      revenueGrowthPct: 27.0,
      fcfMarginPct: 28.5,
      ruleOf40Score: 55.5,
      ruleOf40Tier: 'Elite Compounder (>= 50%) 🟢',
      roicPct: 32.6,
      valuationScore: 62.0,
      statusLabel: 'Undervalued Industry Leader 🟢'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$294.67 Billion', verified: true, discrepancyPct: 0.0, calculatedValue: '$294,670,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: Palantir Technologies (PLTR)'
  },
  MU: {
    ticker: 'MU',
    companyName: 'Micron Technology, Inc.',
    sector: 'Technology',
    industryName: 'Memory & Storage Semiconductors',
    currentPrice: 920.95,
    priceChange24h: 2.15,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 4.5, keyQuote: 'HBM3E memory is the required partner chip for AI GPUs.', pros: ['HBM sold out through 2026', 'DRAM pricing power'], cons: ['Memory cycle volatility'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 4.4, keyQuote: 'Memory oligopoly (Micron, Samsung, SK Hynix).', pros: ['Oligopoly pricing power', 'FCF expansion'], cons: ['Capex intensity'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 4.2, keyQuote: 'Invert: Down-cycle memory pricing collapses.', pros: ['AI HBM premium margins'], cons: ['Cyclicality'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 4.6, keyQuote: 'HBM capacity growth megatrend.', pros: ['Secular AI memory demand'], cons: ['Capital requirements'] },
      overall: 4.43
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Micron Technology, Inc. (MU) belongs to Memory & Storage Semiconductors (Technology). Real-time price: $920.95 (+2.15%). Trailing P/E: 20.8x (vs 5-Yr Avg: 16.8x, Industry Avg: 22.4x). Rule of 40 Score: 42.5% (Rev Growth: 24.0%, FCF Margin: 18.5%). 12-Month Base Target: $1180.00. Institutional Status: Undervalued Industry Leader 🟢.',
      clarityScore: 96
    },
    valuation: {
      bearTarget: 750.00,
      baseTarget: 1180.00,
      bullTarget: 1450.00,
      analystTarget: 1120.00,
      currentPrice: 920.95,
      currency: 'USD',
      marginOfSafetyPct: 28.1,
      primaryModel: '12-Month Intrinsic FCF DCF Model',
      modelType: 'Regular P/E Model',
      metricLabel: 'Trailing P/E Ratio',
      currentMetricVal: '20.8x',
      fiveYrAvgVal: '16.8x',
      industryAvgVal: '22.4x',
      vs5yrPct: 24.0,
      vsIndustryPct: -7.0,
      revenueGrowthPct: 24.0,
      fcfMarginPct: 18.5,
      ruleOf40Score: 42.5,
      ruleOf40Tier: 'Rule of 40 Compliant (>= 40%) 🟢',
      roicPct: 66.6,
      valuationScore: 63.0,
      statusLabel: 'Undervalued Industry Leader 🟢'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$1.04 Trillion', verified: true, discrepancyPct: 0.0, calculatedValue: '$1,040,000,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: Micron Technology (MU)'
  },
  IONQ: {
    ticker: 'IONQ',
    companyName: 'IonQ, Inc.',
    sector: 'Technology',
    industryName: 'Quantum Computing (Pre-Profit R&D)',
    currentPrice: 32.84,
    priceChange24h: -4.23,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 2.8, keyQuote: 'Speculative quantum computing R&D with negative FCF.', pros: ['Trapped ion quantum hardware'], cons: ['Pre-profit cash burn'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 2.6, keyQuote: 'Lacks proven free cash flow or predictable moat.', pros: ['Commercial bookings growth'], cons: ['Unproven commercial FCF'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 2.5, keyQuote: 'Invert: High risk of dilution before commercialization.', pros: ['Patent portfolio'], cons: ['Dilution risk'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 3.5, keyQuote: 'Quantum computing long-term optionality.', pros: ['AQ 64 roadmap target'], cons: ['Extended timeline'] },
      overall: 2.85
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'IonQ, Inc. (IONQ) belongs to Quantum Computing (Pre-Profit R&D) (Technology). Real-time price: $32.84 (-4.23%). EV / Sales Multiple: 54.9x (vs 5-Yr Avg: 45.0x, Industry Avg: 18.5x). Rule of 40 Score: 10.0% (Rev Growth: 55.0%, FCF Margin: -45.0%). 12-Month Base Target: $69.11. Institutional Status: Pre-Profit Growth (EV/Sales Model) 🟡.',
      clarityScore: 90
    },
    valuation: {
      bearTarget: 18.06,
      baseTarget: 69.11,
      bullTarget: 55.83,
      analystTarget: 69.11,
      currentPrice: 32.84,
      currency: 'USD',
      marginOfSafetyPct: 110.44,
      primaryModel: 'Probability-Weighted TAM & EV/Sales Model',
      modelType: 'EV/Sales Model',
      metricLabel: 'EV / Sales Multiple',
      currentMetricVal: '54.9x',
      fiveYrAvgVal: '45.0x',
      industryAvgVal: '18.5x',
      vs5yrPct: 22.0,
      vsIndustryPct: 196.8,
      revenueGrowthPct: 55.0,
      fcfMarginPct: -45.0,
      ruleOf40Score: 10.0,
      ruleOf40Tier: 'Sub-Optimal Unit Economics 🔴',
      roicPct: 11.3,
      valuationScore: 46.2,
      statusLabel: 'Pre-Profit Growth (EV/Sales Model) 🟡'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$12.26 Billion', verified: true, discrepancyPct: 0.0, calculatedValue: '$12,258,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: IonQ Inc (IONQ)'
  },
  NBIS: {
    ticker: 'NBIS',
    companyName: 'Nebula Infrastructure & Cloud Inc.',
    sector: 'Technology',
    industryName: 'AI Cloud Infrastructure',
    currentPrice: 28.50,
    priceChange24h: 1.10,
    masterScores: {
      duan: { name: 'Duan Yongping (段永平)', avatar: '⚡', philosophy: 'Business Essence', score: 3.2, keyQuote: 'High growth cloud infrastructure with ongoing capex burn.', pros: ['AI data center demand'], cons: ['Capital requirements'] },
      buffett: { name: 'Warren Buffett', avatar: '👑', philosophy: 'Economic Moat', score: 3.0, keyQuote: 'Commoditized infrastructure hosting.', pros: ['Contract backlog'], cons: ['Low pricing power'] },
      munger: { name: 'Charlie Munger', avatar: '🦉', philosophy: 'Inversion', score: 2.8, keyQuote: 'Invert: Debt leverage risks.', pros: ['Capacity utilization'], cons: ['Debt load'] },
      lilu: { name: 'Li Lu (李录)', avatar: '🌏', philosophy: 'Secular Megatrends', score: 3.8, keyQuote: 'AI compute cloud expansion.', pros: ['Hyperscaler demand'], cons: ['Capex burden'] },
      overall: 3.20
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Nebula Infrastructure (NBIS) belongs to AI Cloud Infrastructure (Technology). Real-time price: $28.50 (+1.10%). EV / Sales Multiple: 28.0x (vs 5-Yr Avg: 28.0x, Industry Avg: 14.2x). Rule of 40 Score: 27.0% (Rev Growth: 42.0%, FCF Margin: -15.0%). 12-Month Base Target: $35.60. Institutional Status: Pre-Profit Growth (High EV/Sales Risk) 🔴.',
      clarityScore: 91
    },
    valuation: {
      bearTarget: 15.68,
      baseTarget: 35.60,
      bullTarget: 48.45,
      analystTarget: 35.60,
      currentPrice: 28.50,
      currency: 'USD',
      marginOfSafetyPct: 24.9,
      primaryModel: 'Probability-Weighted TAM & EV/Sales Model',
      modelType: 'EV/Sales Model',
      metricLabel: 'EV / Sales Multiple',
      currentMetricVal: '28.0x',
      fiveYrAvgVal: '28.0x',
      industryAvgVal: '14.2x',
      vs5yrPct: 0.0,
      vsIndustryPct: 97.2,
      revenueGrowthPct: 42.0,
      fcfMarginPct: -15.0,
      ruleOf40Score: 27.0,
      ruleOf40Tier: 'Moderate Growth & Margin 🟡',
      roicPct: 6.5,
      valuationScore: 35.0,
      statusLabel: 'Pre-Profit Growth (High EV/Sales Risk) 🔴'
    },
    financialMetrics: [
      { label: 'Market Cap', value: '$8.50 Billion', verified: true, discrepancyPct: 0.0, calculatedValue: '$8,500,000,000.00', formula: 'Live Price x Shares' }
    ],
    markdownContent: '# Real-Time Research Memo: Nebula Cloud (NBIS)'
  }
};

export const mockUnifiedScannerData: UnifiedScannerItem[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors & AI Acceleration',
    roic: 114.29,
    peRatio: 31.63,
    modelType: 'Regular P/E Model',
    currentMetricVal: '31.6x',
    fiveYrAvgVal: '48.5x',
    industryAvgVal: '36.2x',
    revenueGrowthPct: 38.0,
    fcfMarginPct: 34.5,
    ruleOf40Score: 72.5,
    debtToEquity: 0.18,
    moatScore: 4.8,
    passedChecklist: true,
    gapPct: 14.2,
    volumeRatio: 4.8,
    earningsSurprisePct: 22.4,
    hodCloseRatio: 0.92,
    valuationScore: 99.0,
    statusLabel: 'Deep Moat & FCF Compounder 🟢',
    magnaScore: { momentumScore: 19, accelerationScore: 19, gapClearanceScore: 20, newsCatalystScore: 20, accumulationScore: 18, totalMagnaScore: 96 },
    catalystSummary: 'Blackwell Demand & AI Compute Acceleration.',
    verdict: 'QUALIFIED EP 🟢'
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics & Ecosystem',
    roic: 141.47,
    peRatio: 40.32,
    modelType: 'Regular P/E Model',
    currentMetricVal: '40.3x',
    fiveYrAvgVal: '28.4x',
    industryAvgVal: '26.5x',
    revenueGrowthPct: 8.5,
    fcfMarginPct: 26.8,
    ruleOf40Score: 35.3,
    debtToEquity: 1.45,
    moatScore: 4.9,
    passedChecklist: true,
    gapPct: 3.7,
    volumeRatio: 1.6,
    earningsSurprisePct: 6.2,
    hodCloseRatio: 0.74,
    valuationScore: 52.5,
    statusLabel: 'Quality Moat Leader (Premium Multiple) 🟡',
    magnaScore: { momentumScore: 12, accelerationScore: 11, gapClearanceScore: 16, newsCatalystScore: 14, accumulationScore: 15, totalMagnaScore: 68 },
    catalystSummary: 'Services Growth & Apple Intelligence Refresh.',
    verdict: 'QUALITY WATCH 🟡'
  }
];

export const mockThesisDriftData: ThesisDriftItem[] = [
  {
    id: 'td_01',
    ticker: 'NVDA',
    period: 'Q1 FY2027 vs Q4 FY2026',
    status: 'INTACT',
    moatDelta: 'CUDA lock-in reinforced by Blackwell NVLink cluster scalability.',
    guidanceChange: '+14% revenue guidance beat.',
    marginTrend: 'Gross margin holding strong at 75.4%.',
    summary: 'Core investment thesis remains fully intact.',
    date: '2026-07-20'
  }
];

export const mockNewsPulseData: NewsPulseItem[] = [
  {
    id: 'np_01',
    ticker: 'NVDA',
    priceMove: -0.55,
    timeframe: 'Live Market Session',
    date: '2026-07-25 Live',
    fundamentalAttribution: 15,
    betaAttribution: 65,
    liquidityAttribution: 20,
    keyDrivers: [
      'Real-time Market Trading Activity on NASDAQ',
      'High institutional buy-side volume'
    ],
    verdict: 'Normal market intraday fluctuations.'
  }
];

export const mockJournalData: TradeJournalEntry[] = [
  {
    id: 'tj_01',
    date: '2026-07-25',
    ticker: 'NVDA',
    action: 'BUY',
    price: 206.84,
    shares: 100,
    convictionScore: 4.6,
    thesisSummary: 'Executed long trade at live market quote $206.84 following MAGNA EP score.',
    mirrorTestPassed: true,
    riskCheckPassed: true
  }
];
