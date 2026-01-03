
import React, { useState } from 'react';
import { UserRole, AppFeature, RolePermissions } from '../types';
import { db } from '../services/api';

interface RoleConfigPanelProps {
  permissions: RolePermissions[];
  onUpdate: (role: UserRole, features: AppFeature[]) => void;
}

const RoleConfigPanel: React.FC<RoleConfigPanelProps> = ({ permissions, onUpdate }) => {
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  const toggleFeature = (role: UserRole, feature: AppFeature) => {
    const rolePerms = permissions.find(p => p.role === role);
    if (!rolePerms) return;

    let newFeatures;
    if (rolePerms.enabledFeatures.includes(feature)) {
      newFeatures = rolePerms.enabledFeatures.filter(f => f !== feature);
    } else {
      newFeatures = [...rolePerms.enabledFeatures, feature];
    }
    onUpdate(role, newFeatures);
  };

  const runConnectivityTest = async () => {
    setTesting(true);
    const results = await db.system.checkConnectivity();
    setTestResults(results.details);
    setTesting(false);
  };

  const handleSeed = async () => {
    setSeeding(true);
    const res = await db.system.seedInitialData();
    setSeedMsg(res.message);
    setTimeout(() => setSeedMsg(''), 5000);
    setSeeding(false);
  };

  const allFeatures = Object.values(AppFeature);

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Feature Control</h2>
          <p className="text-slate-500 text-sm">Global toggles for role-based module availability and infrastructure health.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeed}
            disabled={seeding}
            className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 border border-indigo-100 disabled:opacity-50"
          >
            <i className={`fas ${seeding ? 'fa-spinner fa-spin' : 'fa-database'}`}></i>
            {seeding ? 'Seeding...' : 'Seed Initial Data'}
          </button>
          <button 
            onClick={runConnectivityTest}
            disabled={testing}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <i className={`fas ${testing ? 'fa-spinner fa-spin' : 'fa-plug-circle-check'}`}></i>
            {testing ? 'Probing Cloud...' : 'Test Supabase Connectivity'}
          </button>
        </div>
      </div>

      {seedMsg && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 font-bold text-sm animate-in fade-in slide-in-from-top-2">
          <i className="fas fa-info-circle mr-2"></i>
          {seedMsg}
        </div>
      )}

      {testResults && (
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400">Infrastructure Health Report</h3>
            <button onClick={() => setTestResults(null)} className="text-slate-500 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(testResults).map(([key, value]: [string, any]) => (
              <div key={key} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{key}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    value.status === 'ok' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                    value.status === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                    'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  }`}></div>
                </div>
                <p className="text-sm font-bold text-white mb-1">{value.status === 'ok' ? 'Operational' : value.status.toUpperCase()}</p>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{value.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {[UserRole.REP, UserRole.ADMIN].map(role => (
          <div key={role} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <i className={`fas ${role === UserRole.ADMIN ? 'fa-user-shield' : 'fa-user-tie'} text-indigo-400`}></i>
                {role === UserRole.ADMIN ? 'Regional Admin' : 'Relationship Manager'} Permissions
              </h3>
            </div>
            <div className="p-6 space-y-2">
              {allFeatures.map(feature => {
                const isEnabled = permissions.find(p => p.role === role)?.enabledFeatures.includes(feature);
                return (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(role, feature)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isEnabled 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 grayscale opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
                        <i className={`fas fa-cube text-[10px]`}></i>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{feature.replace(/-/g, ' ')}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${isEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isEnabled ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleConfigPanel;
