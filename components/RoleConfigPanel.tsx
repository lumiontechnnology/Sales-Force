
import React from 'react';
import { UserRole, AppFeature, RolePermissions } from '../types';

interface RoleConfigPanelProps {
  permissions: RolePermissions[];
  onUpdate: (role: UserRole, features: AppFeature[]) => void;
}

const RoleConfigPanel: React.FC<RoleConfigPanelProps> = ({ permissions, onUpdate }) => {
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

  const allFeatures = Object.values(AppFeature);

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Feature Control</h2>
        <p className="text-slate-500 text-sm">Global toggles for role-based module availability.</p>
      </div>

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
