
export interface MarketData {
  bloombergSentiment: number; // -100 to 100
  spCreditAlerts: { entity: string; rating: string; change: 'UP' | 'DOWN' | 'STABLE' }[];
  regulatoryNews: { source: string; headline: string; severity: 'High' | 'Medium' | 'Low'; time: string }[];
  marketVolatility: number; // VIX-like score
}

export const fetchMarketIntel = async (): Promise<MarketData> => {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    bloombergSentiment: 42, // Generally positive but cautious
    spCreditAlerts: [
      { entity: 'Skyline Tech', rating: 'BBB+', change: 'UP' },
      { entity: 'Lighthouse FinTech', rating: 'B-', change: 'DOWN' },
      { entity: 'Global Asset Partners', rating: 'AA', change: 'STABLE' }
    ],
    regulatoryNews: [
      { source: 'SEC', headline: 'New Basel IV capital requirements for FinTech-heavy portfolios finalized.', severity: 'High', time: '10m ago' },
      { source: 'EBA', headline: 'Anti-money laundering guidelines updated for cross-border SWIFT transfers.', severity: 'Medium', time: '1h ago' },
      { source: 'FED', headline: 'Interest rate pause signals potential pivot in Q4 strategy.', severity: 'Low', time: '2h ago' }
    ],
    marketVolatility: 18.4
  };
};
