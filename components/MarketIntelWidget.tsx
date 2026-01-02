
import React, { useState, useEffect } from 'react';
import { fetchMarketIntel, MarketData } from '../services/marketData';

const MarketIntelWidget: React.FC = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const intel = await fetchMarketIntel();
      setData(intel);
      setLoading(false);
    };
    load();
    const interval = setInterval(load, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 animate-pulse h-64 flex items-center justify-center">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Syncing Terminal...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-white/10 shadow-2xl space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <i className="fas fa-satellite-dish animate-pulse"></i>
          Live Terminal Intel
        </h3>
        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">BLOOMBERG | S&P</span>
      </div>

      {/* Sentiment & Volatility */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Mkt Sentiment</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-white">{data?.bloombergSentiment}%</span>
            <i className="fas fa-arrow-trend-up text-emerald-400 text-xs"></i>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Volatility (VIX)</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-white">{data?.marketVolatility}</span>
            <i className="fas fa-wave-square text-amber-400 text-xs"></i>
          </div>
        </div>
      </div>

      {/* S&P Credit Watch */}
      <div className="space-y-2">
        <p className="text-[9px] font-bold text-slate-500 uppercase px-1 tracking-widest">Credit Watchlist (S&P)</p>
        <div className="space-y-1.5">
          {data?.spCreditAlerts.map((alert, i) => (
            <div key={i} className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded-lg text-[10px] border border-white/5">
              <span className="text-slate-300 font-bold">{alert.entity}</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-black">{alert.rating}</span>
                {alert.change === 'UP' && <i className="fas fa-chevron-up text-emerald-500"></i>}
                {alert.change === 'DOWN' && <i className="fas fa-chevron-down text-rose-500"></i>}
                {alert.change === 'STABLE' && <i className="fas fa-minus text-slate-500"></i>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory News */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <p className="text-[9px] font-bold text-slate-500 uppercase px-1 tracking-widest">Compliance Wire</p>
        <div className="space-y-2">
          {data?.regulatoryNews.map((news, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex justify-between mb-1">
                <span className={`text-[8px] font-black uppercase px-1.5 rounded ${
                  news.severity === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {news.source} • {news.severity}
                </span>
                <span className="text-[8px] text-slate-600 font-bold">{news.time}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug group-hover:text-white transition-colors">
                {news.headline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketIntelWidget;
