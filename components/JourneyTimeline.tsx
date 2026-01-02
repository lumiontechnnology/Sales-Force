
import React, { useState } from 'react';
import { MOCK_ACCOUNTS } from '../constants';
import InternetBankingPlugin from './InternetBankingPlugin';
import { UserRole, TimelineEvent } from '../types';

interface JourneyTimelineProps {
  userRole: UserRole;
  events: TimelineEvent[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ userRole, events }) => {
  const [selectedAccount, setSelectedAccount] = useState(MOCK_ACCOUNTS[0].id);
  const [viewMode, setViewMode] = useState<'FEED' | 'BANKING'>('FEED');
  const account = MOCK_ACCOUNTS.find(a => a.id === selectedAccount);

  const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'SALE': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'SUPPORT': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'PRODUCT': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'CONTRACT': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'DEPOSIT': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'VOICE_FEEDBACK': return 'bg-purple-100 text-purple-600 border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'SALE': return 'fa-handshake';
      case 'SUPPORT': return 'fa-headset';
      case 'PRODUCT': return 'fa-rocket';
      case 'CONTRACT': return 'fa-file-signature';
      case 'DEPOSIT': return 'fa-money-bill-transfer';
      case 'VOICE_FEEDBACK': return 'fa-microphone-lines';
      default: return 'fa-circle-info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <i className="fas fa-check-circle text-emerald-500"></i>;
      case 'In Progress': return <i className="fas fa-spinner fa-spin text-amber-500"></i>;
      default: return <i className="fas fa-clock text-slate-300"></i>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)] overflow-hidden">
      {/* Sidebar - Account List */}
      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl overflow-y-auto">
        <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <i className="fas fa-building-columns text-indigo-600"></i>
            Active Accounts
          </h3>
        </div>
        <div className="p-2 space-y-1">
          {MOCK_ACCOUNTS.map(acc => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccount(acc.id)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedAccount === acc.id ? 'bg-indigo-50 border-l-4 border-indigo-600 shadow-sm' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900 text-sm">{acc.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${acc.churnRisk > 50 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {acc.churnRisk}% Risk
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-bold uppercase">{acc.industry}</p>
                <p className="text-[10px] font-black text-indigo-600">{acc.onboardingProgress}% ONBOARDED</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
        {/* View Toggle - ONLY VISIBLE TO ADMIN */}
        {isAdmin && (
          <div className="bg-slate-200/50 p-1 rounded-2xl flex w-fit shrink-0">
            <button 
              onClick={() => setViewMode('FEED')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'FEED' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <i className="fas fa-timeline"></i>
              Chronological Journey
            </button>
            <button 
              onClick={() => setViewMode('BANKING')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'BANKING' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <i className="fas fa-university"></i>
              Internet Banking Plugin
            </button>
          </div>
        )}

        {isAdmin && viewMode === 'BANKING' ? (
          <div className="flex-1 min-h-0">
            <InternetBankingPlugin />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6 pb-20 pr-2">
            {/* Onboarding Compliance Tracker Header */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <nav className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fas fa-rocket"></i>
                    Implementation Phase
                    <i className="fas fa-chevron-right text-[8px]"></i>
                    <span className="text-indigo-600">Onboarding & Compliance</span>
                  </nav>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{account?.name} Status</h2>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-black px-4 py-1 rounded-full uppercase mb-2 ${
                    account?.onboardingProgress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {account?.onboardingProgress === 100 ? 'Onboarding 100% Complete' : 'Compliance In Progress'}
                  </span>
                  <div className="flex items-center gap-2">
                     <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${account?.onboardingProgress}%` }}></div>
                     </div>
                     <span className="text-sm font-black text-slate-900">{account?.onboardingProgress}%</span>
                  </div>
                </div>
              </div>

              {/* Stepper Logic */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {account?.onboardingSteps.map((step, idx) => (
                  <div key={step.id} className={`p-4 rounded-2xl border-2 transition-all ${
                    step.status === 'Completed' ? 'bg-emerald-50/30 border-emerald-100' : 
                    step.status === 'In Progress' ? 'bg-amber-50/30 border-amber-100 ring-2 ring-amber-100' : 
                    'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        {getStatusIcon(step.status)}
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{step.category}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{step.name}</h4>
                    <p className={`text-[10px] font-bold uppercase ${
                      step.status === 'Completed' ? 'text-emerald-600' : 
                      step.status === 'In Progress' ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {step.status}
                    </p>
                  </div>
                ))}
                {/* If not 100%, show a placeholder "Operational Ready" */}
                {account?.onboardingProgress! < 100 && (
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50/50">
                     <i className="fas fa-lock text-slate-300 mb-1"></i>
                     <p className="text-[10px] font-black text-slate-400 uppercase">Operational Release</p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline View */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900">Interaction History</h3>
                <p className="text-sm text-slate-500 mt-1">Audit-grade chronological log of all touchpoints.</p>
              </div>

              <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-8">
                {events.map((event, idx) => (
                  <div key={event.id} className="relative pl-10">
                    <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${getTypeStyles(event.type)}`}>
                      <i className={`fas ${getIcon(event.type)} text-sm`}></i>
                    </div>
                    <div className="p-6 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white group hover:border-indigo-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{event.date}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase">{event.type.replace('_', ' ')}</span>
                          </div>
                        </div>
                        {event.status && (
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                            event.status === 'Alert' || event.status === 'Negative' ? 'bg-rose-600 text-white' : 
                            event.status === 'Verified' || event.status === 'Cleared' || event.status === 'Positive' ? 'bg-emerald-500 text-white' :
                            'bg-amber-500 text-white'
                          }`}>
                            {event.status}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mt-4">{event.description}</p>
                      
                      {event.type === 'DEPOSIT' && event.metadata && (
                        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-6">
                           <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Amount</p>
                             <p className="text-sm font-black text-slate-900">${event.metadata.amount.toLocaleString()}</p>
                           </div>
                           <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Source Method</p>
                             <p className="text-xs font-bold text-indigo-600">{event.metadata.method}</p>
                           </div>
                        </div>
                      )}

                      {event.type === 'VOICE_FEEDBACK' && event.metadata && (
                        <div className="mt-6 space-y-4">
                          {event.metadata.audioUrl && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                               <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
                                 <i className="fas fa-play text-xs"></i>
                               </div>
                               <div className="flex-1">
                                 <p className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">Recorded Session Audio</p>
                                 <audio src={event.metadata.audioUrl} controls className="w-full h-6 opacity-80" />
                               </div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-white border border-slate-100 rounded-xl">
                               <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Sentiment Profile</p>
                               <p className={`text-xs font-bold ${event.metadata.sentiment === 'Negative' ? 'text-rose-500' : 'text-emerald-500'}`}>{event.metadata.sentiment}</p>
                             </div>
                             <div className="p-3 bg-white border border-slate-100 rounded-xl">
                               <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Score Delta</p>
                               <p className="text-xs font-black text-slate-900">{event.metadata.scoreDelta > 0 ? '+' : ''}{event.metadata.scoreDelta}</p>
                             </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 pt-4 border-t border-slate-50 flex gap-4">
                        <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline flex items-center gap-1">
                          <i className="fas fa-file-pdf"></i>
                          View Artifacts
                        </button>
                        <button className="text-[10px] font-black text-slate-400 uppercase hover:underline flex items-center gap-1">
                          <i className="fas fa-plus"></i>
                          Add Private Note
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyTimeline;
