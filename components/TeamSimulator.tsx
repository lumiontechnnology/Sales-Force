
import React, { useState, useEffect } from 'react';
import { MOCK_REPS } from '../constants';
import { fetchMarketIntel, MarketData } from '../services/marketData';

const TeamSimulator: React.FC = () => {
  const [swaps, setSwaps] = useState<{rep1: string, rep2: string}[]>([]);
  const [marketIntel, setMarketIntel] = useState<MarketData | null>(null);
  
  // Fetch real-time data for modeling
  useEffect(() => {
    fetchMarketIntel().then(setMarketIntel);
  }, []);

  // Mock benchmarks influenced by market sentiment
  const sentimentMultiplier = marketIntel ? (1 - (marketIntel.bloombergSentiment / 200)) : 1;
  const REGULATORY_THRESHOLD = 20.0; 
  const INDUSTRY_AVERAGE = 16.5 * sentimentMultiplier; // Sentiment affects industry mean
  const CURRENT_RWA = 18.2; 
  
  // Swap impact is scaled by volatility (high volatility = higher risk weight delta)
  const volatilityFactor = marketIntel ? (marketIntel.marketVolatility / 15) : 1;
  const PROJECTED_IMPACT = swaps.length * 0.042 * volatilityFactor; 
  const totalProjectedRWA = CURRENT_RWA + PROJECTED_IMPACT;

  const addSwap = () => {
    setSwaps([...swaps, { rep1: MOCK_REPS[0].id, rep2: MOCK_REPS[1].id }]);
  };

  const getStatusColor = (value: number) => {
    if (value > REGULATORY_THRESHOLD) return 'bg-rose-500';
    if (value > REGULATORY_THRESHOLD * 0.9) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-white/5 relative overflow-hidden">
        {/* Market Data Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
           <div className="h-full bg-indigo-500" style={{ width: `${(marketIntel?.bloombergSentiment || 50)}%` }}></div>
           <div className="h-full bg-emerald-500" style={{ width: `${(100 - (marketIntel?.bloombergSentiment || 50))}%` }}></div>
        </div>

        <div className="flex justify-between items-start mb-12 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black">Portfolio Simulator v1.8</h2>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-md text-[8px] font-bold border border-indigo-500/30 uppercase tracking-widest">Live Market Linked</span>
            </div>
            <p className="text-slate-400 text-sm">RWA deltas are dynamically scaled using <span className="text-indigo-400 font-bold">Bloomberg Sentiment</span> & <span className="text-amber-400 font-bold">VIX Volatility</span>.</p>
          </div>
          <button onClick={addSwap} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <i className="fas fa-plus"></i>
            Add Modeling Scenario
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 relative z-10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <p className="text-xs font-bold text-slate-500 uppercase mb-4">Projected Revenue</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-black">${(12.4 + (swaps.length * 0.15)).toFixed(1)}M</p>
              <span className="text-emerald-400 text-sm font-bold mb-1"><i className="fas fa-caret-up"></i> +{swaps.length * 1.2}%</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <p className="text-xs font-bold text-slate-500 uppercase mb-4">Avg Portfolio Health</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-black">{74 - (swaps.length * 2)}/100</p>
              <span className="text-rose-400 text-sm font-bold mb-1"><i className="fas fa-caret-down"></i> -{swaps.length * 2}%</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
            <div className={`absolute top-0 right-0 w-1 h-full ${getStatusColor(totalProjectedRWA)}`}></div>
            <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Market-Adjusted RWA</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-black text-blue-400">${totalProjectedRWA.toFixed(2)}B</p>
              <span className="text-blue-400/60 text-[8px] font-bold mb-1 uppercase tracking-tighter">Limit: ${REGULATORY_THRESHOLD}B</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <p className="text-xs font-bold text-slate-500 uppercase mb-4">Capital Adequacy (CET1)</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-black text-amber-400">{(14.2 - (swaps.length * 0.1 * volatilityFactor)).toFixed(1)}%</p>
              <span className="text-slate-500 text-[10px] font-bold mb-1 uppercase">Floor: 12.5%</span>
            </div>
          </div>
        </div>

        {/* Benchmarking Visualization Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-gauge-high text-indigo-400"></i>
              Regulatory Threshold Benchmarking (Linked to S&P Entities)
            </h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Optimal</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Watch</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Breach</div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Main RWA Gauge */}
            <div className="relative pt-4">
              <div className="flex justify-between text-[10px] text-slate-500 mb-2 font-black uppercase tracking-widest">
                <span>$0B</span>
                <span>$10B</span>
                <span>Live Industry Mean: ${INDUSTRY_AVERAGE.toFixed(2)}B</span>
                <span className="text-rose-400">SEC Reg Limit: ${REGULATORY_THRESHOLD}B</span>
              </div>
              <div className="h-6 w-full bg-slate-800 rounded-full overflow-hidden flex relative border border-white/5 shadow-inner">
                <div className="h-full bg-emerald-500/20 w-[75%] border-r border-emerald-500/30"></div>
                <div className="h-full bg-amber-500/20 w-[15%] border-r border-amber-500/30"></div>
                <div className="h-full bg-rose-500/20 w-[10%]"></div>
                
                {/* Industry Average Marker */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" style={{ left: `${(INDUSTRY_AVERAGE / 25) * 100}%` }}>
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-400 rounded-full"></div>
                </div>

                {/* Current Value Marker */}
                <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 transition-all duration-700" style={{ left: `${(totalProjectedRWA / 25) * 100}%` }}>
                  <div className="absolute -bottom-8 -left-10 bg-indigo-600 text-white px-3 py-1 rounded-md text-[10px] font-black whitespace-nowrap shadow-2xl border border-white/20">
                    SIMULATION: ${totalProjectedRWA.toFixed(2)}B
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Mkt-Adjusted Drift</p>
                <p className={`text-xl font-black ${totalProjectedRWA > INDUSTRY_AVERAGE ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {(((totalProjectedRWA - INDUSTRY_AVERAGE) / INDUSTRY_AVERAGE) * 100).toFixed(1)}%
                </p>
                <p className="text-[8px] text-slate-600 uppercase font-black mt-1">Vs Sector Peers</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Risk Headroom</p>
                <p className="text-xl font-black text-blue-400">
                  ${(REGULATORY_THRESHOLD - totalProjectedRWA).toFixed(2)}B
                </p>
                <p className="text-[8px] text-slate-600 uppercase font-black mt-1">Unused Capital</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Portfolio Risk Density</p>
                <p className="text-xl font-black text-amber-400">{(84.2 * volatilityFactor).toFixed(1)}%</p>
                <p className="text-[8px] text-slate-600 uppercase font-black mt-1">Weighted Assets / AUM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Builder */}
        <div className="space-y-4 relative z-10">
          <h3 className="text-[10px] font-black text-slate-500 uppercase px-2 tracking-widest">Proposed Portfolio Reassignments</h3>
          {swaps.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-16 text-center text-slate-500 italic bg-white/[0.02]">
              <i className="fas fa-sitemap text-4xl mb-4 text-slate-700"></i>
              <p>Modeling Environment Idle. Add scenarios to calculate RWA impact.</p>
            </div>
          ) : (
            swaps.map((swap, idx) => (
              <div key={idx} className="flex flex-wrap items-center gap-6 bg-white/5 p-5 rounded-3xl border border-white/10 group transition-all hover:bg-white/[0.08] hover:border-indigo-500/30">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Primary Lead</p>
                  <select className="bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-3 w-full text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    {MOCK_REPS.map(r => <option key={r.id} value={r.id}>{r.name} ({r.territory})</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 shrink-0 group-hover:rotate-180 transition-transform duration-500 border border-indigo-500/20 shadow-lg">
                  <i className="fas fa-right-left"></i>
                </div>
                <div className="flex-1 min-w-[200px]">
                   <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">Interim Successor</p>
                   <select className="bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-3 w-full text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                    {MOCK_REPS.map(r => <option key={r.id} value={r.id}>{r.name} ({r.territory})</option>)}
                  </select>
                </div>
                <div className="w-px h-16 bg-white/10 hidden xl:block"></div>
                <div className="min-w-[180px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Projected Alpha</p>
                  <div className="space-y-1">
                    <p className="text-emerald-400 font-bold text-xs flex items-center gap-2"><i className="fas fa-plus"></i> $150k Revenue</p>
                    <p className="text-rose-400 font-bold text-xs flex items-center gap-2"><i className="fas fa-minus"></i> 4pts Health</p>
                    <p className="text-blue-400 font-bold text-xs flex items-center gap-2"><i className="fas fa-plus"></i> ${(42 * volatilityFactor).toFixed(0)}M RWA Delta</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSwaps(swaps.filter((_, i) => i !== idx))}
                  className="w-12 h-12 rounded-2xl hover:bg-rose-500 text-slate-500 hover:text-white transition-all border border-white/5 flex items-center justify-center"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
            <i className="fas fa-scale-balanced text-indigo-500"></i>
            Live RWA Strategic Analysis
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Integrating <strong>Bloomberg Sentiment</strong> reveals a multiplier effect of {sentimentMultiplier.toFixed(2)} on current RWA deltas. 
            The high <strong>VIX Volatility ({marketIntel?.marketVolatility})</strong> necessitates a {((volatilityFactor - 1) * 100).toFixed(1)}% risk weight buffer over standard model predictions.
            <br/><br/>
            <strong>Strategic Nudge:</strong> Avoid re-assignments in the Northeast territory until <strong>S&P Global</strong> updates the rating for Skyline Tech, currently on positive watch.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
            <i className="fas fa-microchip text-emerald-500"></i>
            Regulatory & Compliance Hub
          </h4>
          <ul className="text-sm text-slate-600 space-y-4">
            <li className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <i className="fas fa-shield-halved text-indigo-500 mt-1"></i>
              <div>
                <p className="font-bold text-slate-900 text-xs uppercase">Basel IV Audit Readiness</p>
                <p className="text-xs text-slate-500">Simulation puts portfolio at 91% capacity. Triggering "Optimization Mode" is advised.</p>
              </div>
            </li>
            <li className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <i className="fas fa-building-columns text-emerald-500 mt-1"></i>
              <div>
                <p className="font-bold text-slate-900 text-xs uppercase">Risk-Weighted Efficiency</p>
                <p className="text-xs text-slate-500">Current yield per B of RWA is $6.2M. Swap scenario improves this to $6.4M.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamSimulator;
