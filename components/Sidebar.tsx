
import React from 'react';
import { UserRole, AppFeature, RolePermissions } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: any;
  permissions: RolePermissions[];
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentUser, permissions, onLogout }) => {
  const rolePermissions = permissions.find(p => p.role === currentUser.role);
  
  const allPossibleItems = [
    { id: AppFeature.EMPLOYEE_DASHBOARD, icon: 'fa-user-chart', label: 'My Performance' },
    { id: AppFeature.ADMIN_DASHBOARD, icon: 'fa-users-gear', label: 'Team Ratings' },
    { id: AppFeature.TIMELINE, icon: 'fa-timeline', label: 'Client Journey' },
    { id: AppFeature.VOICE_AUTOMATION, icon: 'fa-phone-volume', label: 'Voice Automation' },
    { id: AppFeature.COACHING, icon: 'fa-graduation-cap', label: 'Coaching Hub' },
    { id: AppFeature.SIMULATOR, icon: 'fa-flask-vial', label: 'Capital Simulator' },
    { id: AppFeature.STRATEGY, icon: 'fa-microchip', label: 'Strategy Hub' },
    { id: AppFeature.USER_MANAGEMENT, icon: 'fa-id-card-clip', label: 'User Management' },
    { id: AppFeature.FEATURE_SETTINGS, icon: 'fa-sliders', label: 'System Settings' },
  ];

  const visibleItems = allPossibleItems.filter(item => 
    rolePermissions?.enabledFeatures.includes(item.id as AppFeature)
  );

  return (
    <div className="w-64 bg-slate-900 h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-bolt text-white"></i>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">NEXUS<span className="text-indigo-400">.AI</span></h1>
      </div>

      <div className="px-6 mb-4">
        <div className={`px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase text-center`}>
          {currentUser.role.replace('_', ' ')} SESSION
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <img src={currentUser.avatar} className="w-10 h-10 rounded-full border border-slate-700 shrink-0" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[9px] text-slate-500 truncate font-black uppercase tracking-tighter">{currentUser.territory}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-all"
        >
          <i className="fas fa-power-off"></i>
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
