
import React, { useState } from 'react';
import { MOCK_REPS, MOCK_REPORTS } from '../constants';
import { User, PerformanceReport } from '../types';
import MarketIntelWidget from './MarketIntelWidget';

const AdminDashboard: React.FC = () => {
  const [selectedRep, setSelectedRep] = useState<User | null>(MOCK_REPS[0]);
  const [activeSubTab, setActiveSubTab] = useState<'rankings' | 'reports'>('rankings');

  return (
    <div className="space-y-6">
      {/* Team Level Oversight KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Team AUM', value: '$24.8B', sub: '+12.4% YoY', icon: 'fa-vault', color: 'text-indigo-600' },
          { label: 'Avg Achievement', value: '84%', sub: 'Target: 80%', icon: 'fa-chart-pie', color: 'text-emerald-600' },
          { label: 'Compliance Health', value: '98/100', sub: 'Audit Ready', icon: 'fa-shield-check', color: 'text-blue-600' },
          { label: 'Risk at Danger', value: '$420M', sub: 'Lighthouse FinTech', icon: 'fa-radiation', color: 'text-rose-600' },
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

      {/* Admin Sub-Navigation */}
      <div className="flex gap-4 p-1 bg-slate-200/50 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveSubTab('rankings')}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'rankings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Team Performance Rankings
        </button>
        <button 
          onClick={() => setActiveSubTab('reports')}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'reports' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Daily/Weekly Achievement Reports
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeSubTab === 'rankings' ? (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Relationship Manager Performance</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Quarterly Snapshot</span>
              </div>
              <table className="w-full">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left">Manager Name</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-center">Current Rating</th>
                    <th className="px-6 py-4 text-right">Review Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_REPS.map(rep => (
                    <tr key={rep.id} className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedRep?.id === rep.id ? 'bg-indigo-50/50' : ''}`} onClick={() => setSelectedRep(rep)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={rep.avatar} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{rep.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{rep.territory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-black ${rep.performanceScore! > 80 ? 'text-emerald-600' : rep.performanceScore! > 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {rep.performanceScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                          rep.currentRating === 'Exceeds' ? 'bg-emerald-100 text-emerald-700' : 
                          rep.currentRating === 'Meets' ? 'bg-indigo-100 text-indigo-700' : 
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {rep.currentRating}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase text-slate-400">
                          {rep.currentRating ? 'Ready' : 'Pending'}
                          <i className="fas fa-chevron-right text-[8px]"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {MOCK_REPORTS.map(report => (
                <div key={report.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                  <div className={`absolute top-0 right-0 w-2 h-full ${report.timeframe === 'Daily' ? 'bg-blue-400' : report.timeframe === 'Weekly' ? 'bg-indigo-400' : 'bg-purple-400'}`}></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                         <i className={`fas ${report.timeframe === 'Daily' ? 'fa-calendar-day' : 'fa-calendar-week'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{report.repName}</h4>
                        <p className="text-xs text-slate-500">{report.timeframe} Report • Submitted {report.dateSubmitted}</p>
                      </div>
                    </div>
                    {report.status === 'Pending' && (
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-lg border border-amber-100 animate-pulse">Needs Review</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Achievements & Wins</label>
                      <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-100 pl-4">"{report.achievements}"</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Prospective Pipeline</label>
                      <div className="space-y-2">
                        {report.prospectiveClients.map((client, i) => (
                          <div key={i} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-900">{client.name}</span>
                            <div className="flex gap-2 items-center">
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{client.potentialAum}</span>
                              <span className={`w-2 h-2 rounded-full ${client.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                    <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Approve Achievement</button>
                    <button className="text-[10px] font-bold text-slate-400 uppercase hover:underline">Add Performance Note</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Intel & Review */}
        <div className="space-y-6">
          <MarketIntelWidget />
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-8 h-fit">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900">Review & Finalize Rating</h3>
              <i className="fas fa-medal text-indigo-500"></i>
            </div>
            {selectedRep ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-100">
                  <img src={selectedRep.avatar} className="w-14 h-14 rounded-2xl border-2 border-white/10" alt="" />
                  <div>
                    <p className="font-bold text-white text-lg">{selectedRep.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Employee Index: {selectedRep.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Assisted Assessment</label>
                  <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl text-[13px] text-slate-700 leading-relaxed italic relative">
                    <div className="absolute -top-2 -left-2 bg-indigo-600 text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px]">
                      <i className="fas fa-robot"></i>
                    </div>
                    "RM shows exceptional RWA efficiency ($1.2B managed at 4.2% capital cost). 
                    Achievement velocity is 12% above team mean. 
                    Recommended Rating: <strong>Exceeds Expectations</strong> due to high client retention sentiment."
                  </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assign Final Grade (Q2)</label>
                   <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                      <option value="EXCEEDS">Exceeds Expectations</option>
                      <option value="MEETS" selected>Meets Expectations</option>
                      <option value="DEVELOPING">Developing</option>
                      <option value="BELOW">Below Expectations</option>
                   </select>
                </div>

                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                  <i className="fas fa-check-circle"></i>
                  Publish Performance Rating
                </button>
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 italic text-center px-8">
                <i className="fas fa-user-plus text-3xl mb-4 text-slate-200"></i>
                <p className="text-sm">Select an employee from the rankings to finalize their performance grade.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
