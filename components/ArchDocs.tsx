
import React from 'react';

const ArchDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 space-y-16 pb-32">
      <header className="border-b border-slate-200 pb-8">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">FinTech Strategy <span className="text-indigo-600">&</span> Architecture</h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">Strategic blueprint for banking intelligence: Merging institutional market data with proprietary behavioral signals.</p>
      </header>

      {/* 1. Data Integration Strategy */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <i className="fas fa-university"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Third-Party Financial Data Strategy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-600">
              <i className="fas fa-landmark"></i> Credit & Risk
            </h3>
            <p className="text-sm text-slate-600 mb-4"><strong>Sources:</strong> Experian, S&P Global</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Provides real-time credit rating shifts and commercial default probability.
              <br/><br/>
              <strong>Benefit:</strong> Automates risk-weighting for the loan portfolio, triggering early intervention protocols.
            </p>
          </div>
          
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-600">
              <i className="fas fa-newspaper"></i> Market Sentiment
            </h3>
            <p className="text-sm text-slate-600 mb-4"><strong>Sources:</strong> Bloomberg, Alpha Vantage</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Monitors macro-economic news, M&A rumors, and interest rate projections.
              <br/><br/>
              <strong>Benefit:</strong> Informs the "Advisor Mode" to proactively suggest treasury swaps or hedging strategies.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-rose-600">
              <i className="fas fa-gavel"></i> Compliance Signals
            </h3>
            <p className="text-sm text-slate-600 mb-4"><strong>Sources:</strong> LexisNexis Bridger, EDGAR</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Scans for SEC filings and negative news involving key account stakeholders.
              <br/><br/>
              <strong>Benefit:</strong> Real-time KYC/AML alerts to prevent institutional reputational damage.
            </p>
          </div>
        </div>
      </section>

      {/* 2. AI Coaching Recommendation Engine */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <i className="fas fa-user-tie"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900">RM Coaching Recommendation Engine</h2>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-900">Advanced Advisory Matrix</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200">
                  <span className="text-xs font-black text-emerald-600 uppercase">Liquidity Intelligence</span>
                  <p className="text-sm text-slate-700 mt-1">NLP analysis of client treasury calls. Flags keywords like "capital preservation" or "yield gap".</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200">
                  <span className="text-xs font-black text-emerald-600 uppercase">AUM Velocity Tracker</span>
                  <p className="text-sm text-slate-700 mt-1">Identifies patterns of capital flight. Correlates support ticket "friction" with withdrawal likelihood.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-200">
                  <span className="text-xs font-black text-emerald-600 uppercase">Regulatory Nudge</span>
                  <p className="text-sm text-slate-700 mt-1">Predictive analysis of upcoming Basel IV or local banking act impacts on specific clients.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-900">Actionable Coaching Output</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { type: "Retention Playbook", desc: "Detected 15% outflow to competitor. Prepare 'Loyalty Yield' offer with 50bps premium." },
                  { type: "Cross-Sell Trigger", desc: "Client mentioned global expansion. Suggest 'FX Hedging Suite' & 'International Desk' intros." },
                  { type: "Compliance Alert", desc: "Stakeholder listed in new SEC probe. Initiate 'Review Level 2' documentation immediately." },
                  { type: "Advisory Coaching", desc: "Client expressed concern over rate hikes. RM should schedule 'Interest Rate Sensitivity' audit." }
                ].map((rec, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 bg-white/50 rounded-xl border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rec.type}</p>
                      <p className="text-xs text-slate-600">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-900 rounded-3xl text-white">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-microchip text-indigo-400"></i> AI Logic: Gemini 3 Pro reasoning over Financial Graphs
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Unlike standard CRM scoring, the Nexus Coaching Engine uses a <strong>Multi-Agent System</strong>. 
            One agent monitors <i>Market Volatility</i>, another monitors <i>RM Activities</i>, and the third monitors <i>Client Health</i>. 
            Gemini 3 Pro acts as the 'Lead Strategist' to synthesize these disparate streams into a human-empathetic coaching script.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-indigo-400"># Input Data Pool</span><br/>
              - Real-time SWIFT transaction latency<br/>
              - RM call sentiment (Confidence vs. Anxiety)<br/>
              - Portfolio Sharpe Ratio drift
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-emerald-400"># Scoring Algorithm</span><br/>
              - Gradient Boosted Decision Trees (GBDT)<br/>
              - Monte Carlo Simulation for AUM Churn<br/>
              - Gemini 'Strategic Reasoning' Layer
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchDocs;
