
import React, { useState, useMemo } from 'react';
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from '../constants';
import { PaymentMethod } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const InternetBankingPlugin: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | PaymentMethod>('ALL');
  
  const filteredTransactions = useMemo(() => {
    return filter === 'ALL' 
      ? MOCK_TRANSACTIONS 
      : MOCK_TRANSACTIONS.filter(t => t.method === filter);
  }, [filter]);

  const methodData = useMemo(() => {
    const counts = { [PaymentMethod.TRANSFER]: 0, [PaymentMethod.POS]: 0, [PaymentMethod.CARD]: 0 };
    MOCK_TRANSACTIONS.forEach(t => {
      counts[t.method] += t.amount;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.TRANSFER: return 'fa-building-columns';
      case PaymentMethod.POS: return 'fa-store';
      case PaymentMethod.CARD: return 'fa-credit-card';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-money-bill-transfer text-indigo-400"></i>
            Live Liquidity Feed
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Institutional Banking Interface</p>
        </div>
        <div className="flex gap-2">
          {['ALL', ...Object.values(PaymentMethod)].map(m => (
            <button
              key={m}
              onClick={() => setFilter(m as any)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                filter === m ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Deposit Source Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {methodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inbound Volume by Channel</p>
            {methodData.map((m, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  {m.name}
                </span>
                <span className="text-xs font-black text-slate-900">${(m.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Activity</p>
          {filteredTransactions.map(tx => {
            const acc = MOCK_ACCOUNTS.find(a => a.id === tx.accountId);
            return (
              <div key={tx.id} className="group p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <i className={`fas ${getMethodIcon(tx.method)}`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{acc?.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">+${tx.amount.toLocaleString()}</p>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      tx.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700' :
                      tx.status === 'Flagged' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  <span>{tx.date}</span>
                  <button className="text-indigo-600 hover:underline">Compliance Review</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
         <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:bg-white px-4 py-2 rounded-xl transition-all">
           <i className="fas fa-print"></i>
           Export Liquidity Audit
         </button>
      </div>
    </div>
  );
};

export default InternetBankingPlugin;
