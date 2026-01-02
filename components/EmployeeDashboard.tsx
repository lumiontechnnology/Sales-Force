
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ACCOUNTS } from '../constants';

const performanceData = [
  { month: 'Jan', score: 75, target: 80 },
  { month: 'Feb', score: 82, target: 80 },
  { month: 'Mar', score: 78, target: 80 },
  { month: 'Apr', score: 85, target: 82 },
  { month: 'May', score: 88, target: 82 },
  { month: 'Jun', score: 92, target: 85 },
];

const EmployeeDashboard: React.FC = () => {
  const checkupAlerts = MOCK_ACCOUNTS.filter(a => a.needsCheckup);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportTimeframe, setReportTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [achievements, setAchievements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReportForm(false);
      setAchievements('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Personal KPI Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Personal AUM', value: '$4.2B', sub: '98% of Target', icon: 'fa-briefcase', color: 'text-indigo-600' },
          { label: 'Avg Client Health', value: '88/100', sub: '+4pts from Q1', icon: 'fa-heart-pulse', color: 'text-emerald-600' },
          { label: 'Deal Velocity', value: '18 Days', sub: 'Top 10% in Team', icon: 'fa-bolt', color: 'text-amber-600' },
          { label: 'Compliance Rate', value: '100%', sub: 'No Outstanding KYC', icon: 'fa-shield-check', color: 'text-blue-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
              <i className={`fas ${kpi.icon} ${kpi.color}`}></i>
            </div>
            <p className="text-xl font-black text-slate-900">{kpi.value}</p>
            <p className="text-[10px] font-bold mt-1 text-slate-400 uppercase">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap gap-12 items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * 0.92)} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900">92</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">My Score</span>
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-black text-slate-900">My Achievement Progress</h2>
          <p className="text-slate-500">Your current trend suggests you are an <span className="text-indigo-600 font-bold">Exceeds Expectations</span> candidate.</p>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
             <div className="bg-indigo-600 h-full w-[92%] transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between mt-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Q2 Target: $500M New AUM</span>
             <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">92% Complete</span>
          </div>
        </div>
        <div className="shrink-0">
          <button 
            onClick={() => setShowReportForm(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
          >
            <i className="fas fa-paper-plane"></i>
            Report Daily Achievement
          </button>
        </div>
      </div>

      {showReportForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <i className="fas fa-file-invoice text-indigo-400"></i>
                Performance Report Submission
              </h3>
              <button onClick={() => setShowReportForm(false)} className="text-white/60 hover:text-white transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmitReport} className="p-8 space-y-6">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                    <i className="fas fa-check"></i>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Report Sent!</h4>
                  <p className="text-slate-500">Your achievements have been sent to your Line Manager.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Report Timeframe</label>
                    <div className="flex gap-2">
                      {['Daily', 'Weekly', 'Monthly'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setReportTimeframe(t as any)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                            reportTimeframe === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Key Achievements & Wins</label>
                    <textarea 
                      required
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      placeholder="e.g., Finalized $50M credit facility, onboarded new HNW client..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                  >
                    Send to Line Manager
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-chart-line text-indigo-500"></i>
              My Performance Score vs. Target
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#colorScore)" name="My Score" />
                  <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <i className="fas fa-phone-volume text-rose-500"></i>
                Required Feedback Checkups
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase">{checkupAlerts.length} Action Items</span>
            </div>
            <div className="space-y-3">
              {checkupAlerts.map(acc => (
                <div key={acc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                      <i className="fas fa-building"></i>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{acc.name}</p>
                      <p className="text-[10px] text-slate-500">Overdue by {Math.floor(Math.random() * 15) + 5} days</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-600 transition-colors">
                    Automate AI Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden h-full">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <h3 className="font-bold mb-8 flex items-center gap-2 text-xl">
              <i className="fas fa-lightbulb text-amber-400"></i>
              Career Velocity
            </h3>
            <ul className="space-y-8 text-sm text-slate-400">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <i className="fas fa-ranking-stars text-indigo-400"></i>
                </div>
                <div>
                  <p className="font-bold text-white text-xs mb-1 uppercase tracking-tight">Team Standing</p>
                  <p>You are ranked <span className="text-white">#1 in Revenue Recovery</span> this quarter. Maintain this for MD fast-track.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <i className="fas fa-graduation-cap text-emerald-400"></i>
                </div>
                <div>
                  <p className="font-bold text-white text-xs mb-1 uppercase tracking-tight">Skill Gap</p>
                  <p>Complete the <span className="text-white">Institutional ESG audit</span> module to unlock higher-tier mandates.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <i className="fas fa-hand-holding-dollar text-amber-400"></i>
                </div>
                <div>
                  <p className="font-bold text-white text-xs mb-1 uppercase tracking-tight">Commission Est.</p>
                  <p>Current Q2 payout projection: <span className="text-emerald-400 font-bold">$12,450</span> (+15% vs Q1).</p>
                </div>
              </li>
            </ul>
            <button className="mt-12 w-full py-4 bg-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
              Open Career Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
