import type { ResearchMemoData, ThesisDriftItem, NewsPulseItem, UnifiedScannerItem, TradeJournalEntry } from './types';

export const mockTickerData: Record<string, ResearchMemoData> = {
  NVDA: {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    sector: 'Semiconductors & AI Hardware',
    currentPrice: 125.50,
    priceChange24h: 3.42,
    masterScores: {
      duan: {
        name: 'Duan Yongping (段永平)',
        avatar: '⚡',
        philosophy: 'Business Essence & Simplicity ("Stop Doing List")',
        score: 4.7,
        keyQuote: 'Do not do things you do not understand. NVIDIA sells the fundamental spades & shovels of AI.',
        pros: ['Monopolistic pricing power in AI acceleration chips', 'CUDA ecosystem creates unassailable software moat'],
        cons: ['Customer concentration risk among hyperscalers (Microsoft, Meta, Google)']
      },
      buffett: {
        name: 'Warren Buffett',
        avatar: '👑',
        philosophy: 'Economic Moat & Capital Allocation Efficiency',
        score: 4.8,
        keyQuote: 'An economic moat with a toll bridge model. Customers cannot switch without rewriting software.',
        pros: ['ROIC exceeds 65%', 'Explosive free cash flow conversion (>45% operating margin)'],
        cons: ['High capital expenditure cycle for customers']
      },
      munger: {
        name: 'Charlie Munger',
        avatar: '🦉',
        philosophy: 'Inversion & Failure Mode Analysis',
        score: 4.1,
        keyQuote: 'Invert, always invert. How could NVDA die? Geopolitical shock in Taiwan or custom ASIC chips.',
        pros: ['Technological moat velocity moves faster than competitors can copy'],
        cons: ['TSMC geopolitical manufacturing bottleneck', 'Cyclical inventory risks']
      },
      lilu: {
        name: 'Li Lu (李录)',
        avatar: '🌏',
        philosophy: 'Secular Megatrends & Management Integrity',
        score: 4.6,
        keyQuote: 'Decade-long AI compute transformation is in its early 2nd inning.',
        pros: ['Jensen Huang is a visionary founder-CEO aligned with shareholders', 'Data center transformation from CPU to GPU'],
        cons: ['Regulatory export restrictions to Asian markets']
      },
      overall: 4.55
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'NVIDIA is the dominant monopoly provider of accelerated GPU hardware and CUDA software for global AI infrastructure. High switching costs prevent customers from migrating to alternative chips. FCF growth exceeds 40% annually with ROIC >60%. Main risk is TSMC supply chain concentration. Base target yields 11.5% margin of safety at current price.',
      clarityScore: 98
    },
    valuation: {
      bearTarget: 92.00,
      baseTarget: 140.00,
      bullTarget: 185.00,
      currentPrice: 125.50,
      currency: 'USD',
      marginOfSafetyPct: 11.5
    },
    financialMetrics: [
      {
        label: 'Market Cap',
        value: '$3.08 Trillion',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '$3,087,300,000,000.00',
        formula: 'Share Price ($125.50) × Shares Outstanding (24.60B)'
      },
      {
        label: 'EV / EBITDA',
        value: '38.2x',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '38.20',
        formula: '(Market Cap + Total Debt - Cash) / EBITDA'
      },
      {
        label: 'Trailing P/E',
        value: '44.8x',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '44.82',
        formula: 'Share Price ($125.50) / TTM EPS ($2.80)'
      },
      {
        label: 'Return on Invested Capital (ROIC)',
        value: '68.4%',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '68.40%',
        formula: 'NOPAT / (Total Debt + Equity - Cash)'
      }
    ],
    markdownContent: `# Institutional Investment Research Memo: NVIDIA Corp (NVDA)

## 1. Executive Summary & Thesis
NVIDIA represents a rare institutional-grade monopoly in AI infrastructure. Through its tightly integrated hardware (H100/H200/Blackwell B200) and software ecosystem (CUDA, TensorRT, NIMs), NVIDIA commands over 85% market share in data center AI training and inference.

> **Mirror Test Verification: PASSED 🟢 (Clarity Score: 98/100)**  
> *NVIDIA is the dominant monopoly provider of accelerated GPU hardware and CUDA software for global AI infrastructure. High switching costs prevent customers from migrating to alternative chips. FCF growth exceeds 40% annually with ROIC >60%. Main risk is TSMC supply chain concentration. Base target yields 11.5% margin of safety at current price.*

---

## 2. The 4 Masters Quantitative & Qualitative Scorecard

| Master Perspective | Score | Key Moat Assessment |
| :--- | :---: | :--- |
| **Duan Yongping** | **4.7 / 5.0** | Business essence is simple: selling essential spades & shovels for AI computing. |
| **Warren Buffett** | **4.8 / 5.0** | Toll-booth economic moat built on CUDA network effects and software lock-in. |
| **Charlie Munger** | **4.1 / 5.0** | Inversion highlights TSMC wafer concentration & cloud provider custom ASIC push. |
| **Li Lu** | **4.6 / 5.0** | 10-year secular tailwind in full compute stack transition; Jensen Huang high-integrity founder. |
| **Overall Synthesis** | **4.55 / 5.0** | **Institutional Strong Buy** |

---

## 3. Financial Rigor Audit (Decimal Validation)
All metric calculations cross-verified against SEC Form 10-Q filing data:
- **Calculated Market Cap:** $125.50 x 24.60B shares = $3,087.30B (Discrepancy: 0.00%)
- **Free Cash Flow Conversion:** 46.2% of Revenue ($14.9B FCF on $32.2B revenue)
- **Net Debt Position:** Net Cash position of $26.4B (Zero liquidity stress)

---

## 4. Valuation Scenarios (5-Year DCF & Multiple Analysis)
- 🐻 **Bear Scenario ($92.00):** AI CapEx decelerates sharply; custom ASICs capture 35% market share.
- 🎯 **Base Scenario ($140.00):** Blackwell architecture scales smoothly; 35% CAGR revenue growth through 2028.
- 🚀 **Bull Scenario ($185.00):** Enterprise AI software licensing (NVIDIA AI Enterprise) creates recurring high-margin SaaS revenue stream.
`
  },
  AAPL: {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Consumer Electronics & Services',
    currentPrice: 224.30,
    priceChange24h: -0.45,
    masterScores: {
      duan: {
        name: 'Duan Yongping (段永平)',
        avatar: '⚡',
        philosophy: 'Business Essence & Simplicity',
        score: 4.9,
        keyQuote: 'Apple has the best business model in consumer history. People buy iPhone for ecosystem value, not just specs.',
        pros: ['Unparalleled brand equity and customer retention (>98%)', 'Massive buyback machine ($100B+/yr)'],
        cons: ['Hardware replacement cycle elongation']
      },
      buffett: {
        name: 'Warren Buffett',
        avatar: '👑',
        philosophy: 'Economic Moat & Capital Allocation Efficiency',
        score: 4.9,
        keyQuote: 'If you offered someone $10,000 to give up their iPhone forever, they would refuse. That is a moat.',
        pros: ['High margin Services segment growth (>74% gross margin)', 'Impeccable capital allocation'],
        cons: ['Valuation multiple expansion (P/E ~33x)']
      },
      munger: {
        name: 'Charlie Munger',
        avatar: '🦉',
        philosophy: 'Inversion & Failure Mode Analysis',
        score: 4.3,
        keyQuote: 'Main risk is antitrust pressure on App Store take rate and China assembly footprint.',
        pros: ['Immense pricing power on ecosystem services'],
        cons: ['Antitrust regulation on 30% App Store fee']
      },
      lilu: {
        name: 'Li Lu (李录)',
        avatar: '🌏',
        philosophy: 'Secular Megatrends & Management Integrity',
        score: 4.4,
        keyQuote: 'Apple Intelligence creates a personalized AI gateway on 2B+ active devices.',
        pros: ['On-device AI privacy moat', 'Tim Cook operational excellence'],
        cons: ['Greater China revenue volatility']
      },
      overall: 4.63
    },
    mirrorTest: {
      passed: true,
      fiveSentenceSummary: 'Apple operates the most sticky consumer device ecosystem globally with over 2.2 billion active installed devices. High-margin Services revenues provide accelerating cash flows that fuel disciplined share buybacks. Apple Intelligence embeds generative AI directly into daily workflows with hardware-level privacy. Key risks include App Store regulatory scrutiny and China geopolitical exposure. Base valuation indicates 12.8% upside with low downside volatility.',
      clarityScore: 96
    },
    valuation: {
      bearTarget: 185.00,
      baseTarget: 253.00,
      bullTarget: 290.00,
      currentPrice: 224.30,
      currency: 'USD',
      marginOfSafetyPct: 12.8
    },
    financialMetrics: [
      {
        label: 'Market Cap',
        value: '$3.44 Trillion',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '$3,443,000,000,000.00',
        formula: 'Share Price ($224.30) × Shares Outstanding (15.35B)'
      },
      {
        label: 'EV / EBITDA',
        value: '25.6x',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '25.61',
        formula: '(Market Cap + Debt - Cash) / EBITDA'
      },
      {
        label: 'Trailing P/E',
        value: '33.2x',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '33.22',
        formula: 'Share Price ($224.30) / TTM EPS ($6.75)'
      },
      {
        label: 'ROIC',
        value: '58.1%',
        verified: true,
        discrepancyPct: 0.00,
        calculatedValue: '58.12%',
        formula: 'NOPAT / Invested Capital'
      }
    ],
    markdownContent: `# Institutional Investment Research Memo: Apple Inc (AAPL)

## 1. Executive Summary
Apple remains the premier consumer ecosystem business in the world. With over 2.2 billion active devices, high-margin Services revenue (SaaS-like 74% gross margin) is decoupling earnings growth from hardware upgrade cycles.

---

## 2. 4 Masters Scorecard
- **Duan Yongping:** **4.9 / 5.0** — Simple business model focused on consumer delight and sticky user habits.
- **Warren Buffett:** **4.9 / 5.0** — Fortress balance sheet with massive capital returns via buybacks.
- **Charlie Munger:** **4.3 / 5.0** — Robust, but watch regulatory headwinds on App Store fees.
- **Li Lu:** **4.4 / 5.0** — On-device AI (Apple Intelligence) protects the hardware ecosystem.
- **Overall Score:** **4.63 / 5.0 (Core Portfolio Anchor)**
`
  }
};

export const mockUnifiedScannerData: UnifiedScannerItem[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors & AI',
    roic: 68.4,
    peRatio: 44.8,
    debtToEquity: 0.18,
    moatScore: 4.8,
    passedChecklist: true,
    gapPct: 14.2,
    volumeRatio: 4.8,
    earningsSurprisePct: 22.4,
    hodCloseRatio: 0.92,
    magnaScore: {
      momentumScore: 19,
      accelerationScore: 19,
      gapClearanceScore: 20,
      newsCatalystScore: 20,
      accumulationScore: 18,
      totalMagnaScore: 96
    },
    catalystSummary: 'Q1 Blowout Earnings Beat & Blackwell GPU Cluster Demand Raise.',
    verdict: 'QUALIFIED EP 🟢'
  },
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies',
    sector: 'Enterprise AI Software',
    roic: 24.8,
    peRatio: 52.0,
    debtToEquity: 0.04,
    moatScore: 4.4,
    passedChecklist: true,
    gapPct: 18.5,
    volumeRatio: 6.2,
    earningsSurprisePct: 35.0,
    hodCloseRatio: 0.88,
    magnaScore: {
      momentumScore: 20,
      accelerationScore: 20,
      gapClearanceScore: 18,
      newsCatalystScore: 20,
      accumulationScore: 17,
      totalMagnaScore: 95
    },
    catalystSummary: 'AIP Commercial Revenue Acceleration & US Defense Contract Win.',
    verdict: 'QUALIFIED EP 🟢'
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Consumer Electronics',
    roic: 58.1,
    peRatio: 33.2,
    debtToEquity: 1.45,
    moatScore: 4.9,
    passedChecklist: true,
    gapPct: 3.8,
    volumeRatio: 1.6,
    earningsSurprisePct: 6.2,
    hodCloseRatio: 0.74,
    magnaScore: {
      momentumScore: 12,
      accelerationScore: 11,
      gapClearanceScore: 16,
      newsCatalystScore: 14,
      accumulationScore: 15,
      totalMagnaScore: 68
    },
    catalystSummary: 'Steady Services Growth & Apple Intelligence Device Refresh.',
    verdict: 'QUALITY WATCH 🟡'
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive & Clean Energy',
    roic: 11.2,
    peRatio: 58.0,
    debtToEquity: 0.08,
    moatScore: 3.5,
    passedChecklist: false,
    gapPct: 2.1,
    volumeRatio: 1.2,
    earningsSurprisePct: -4.5,
    hodCloseRatio: 0.42,
    magnaScore: {
      momentumScore: 8,
      accelerationScore: 7,
      gapClearanceScore: 10,
      newsCatalystScore: 6,
      accumulationScore: 8,
      totalMagnaScore: 39
    },
    catalystSummary: 'EV Price Compression & Margin Squeeze.',
    verdict: 'REJECTED 🔴'
  }
];

export const mockThesisDriftData: ThesisDriftItem[] = [
  {
    id: 'td_01',
    ticker: 'NVDA',
    period: 'Q1 FY2027 vs Q4 FY2026',
    status: 'INTACT',
    moatDelta: 'CUDA lock-in reinforced by Blackwell NVLink cluster scalability.',
    guidanceChange: '+14% revenue guidance beat ($32.5B vs $28.5B consensus).',
    marginTrend: 'Gross margin holding strong at 75.4%.',
    summary: 'Core investment thesis remains fully intact with zero sign of competitive erosion.',
    date: '2026-07-20'
  },
  {
    id: 'td_02',
    ticker: 'TSLA',
    period: 'Q2 2026 Update',
    status: 'DRIFTING',
    moatDelta: 'EV price wars reducing automotive gross margin; Robotaxi timeline uncertain.',
    guidanceChange: 'Automotive delivery target lowered from 20% growth to flat YoY.',
    marginTrend: 'Automotive GM ex-regulatory credits declined to 14.6% (down 320 bps).',
    summary: 'Thesis drifting from pure EV margin expansion to speculative FSD software options.',
    date: '2026-07-15'
  }
];

export const mockNewsPulseData: NewsPulseItem[] = [
  {
    id: 'np_01',
    ticker: 'NVDA',
    priceMove: -6.4,
    timeframe: 'Last 2 Hours',
    date: '2026-07-24 14:30',
    fundamentalAttribution: 15,
    betaAttribution: 65,
    liquidityAttribution: 20,
    keyDrivers: [
      'Macro inflation data release caused broad tech sell-off in NASDAQ (-2.8%)',
      'Unconfirmed media report regarding minor packaging delay in B200 chips',
      'Profit-taking following 12% multi-day rally'
    ],
    verdict: 'Noise / Macro Beta movement. Zero fundamental impact on 5-year intrinsic value.'
  }
];

export const mockJournalData: TradeJournalEntry[] = [
  {
    id: 'tj_01',
    date: '2026-07-22',
    ticker: 'NVDA',
    action: 'BUY',
    price: 121.80,
    shares: 250,
    convictionScore: 4.6,
    thesisSummary: 'Initiated long position following Q1 MAGNA EP trigger (96/100) and Blackwell production scaling. Margin of safety at +14.5%.',
    mirrorTestPassed: true,
    riskCheckPassed: true
  }
];
