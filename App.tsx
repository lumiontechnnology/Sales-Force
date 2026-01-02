
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import JourneyTimeline from './components/JourneyTimeline';
import TeamSimulator from './components/TeamSimulator';
import ArchDocs from './components/ArchDocs';
import AIChatbot from './components/AIChatbot';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
import VoiceAutomation from './components/VoiceAutomation';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import RoleConfigPanel from './components/RoleConfigPanel';
import { UserRole, AppFeature, User, RolePermissions, TimelineEvent } from './types';
import { INITIAL_ROLE_PERMISSIONS } from './constants';
import { supabase } from './services/supabase';
import { db } from './services/api';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [permissions, setPermissions] = useState<RolePermissions[]>(INITIAL_ROLE_PERMISSIONS);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle Supabase Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const profile = await db.profiles.get(userId);
      setCurrentUser(profile);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const rolePerms = permissions.find(p => p.role === currentUser.role);
      if (rolePerms && rolePerms.enabledFeatures.length > 0) {
        if (currentUser.role === UserRole.REP) setActiveTab(AppFeature.EMPLOYEE_DASHBOARD);
        else if (currentUser.role === UserRole.ADMIN) setActiveTab(AppFeature.ADMIN_DASHBOARD);
        else if (currentUser.role === UserRole.SUPER_ADMIN) setActiveTab(AppFeature.FEATURE_SETTINGS);
        else setActiveTab(rolePerms.enabledFeatures[0]);
      }
    }
  }, [currentUser]);

  const handleUpdatePermissions = (role: UserRole, features: AppFeature[]) => {
    setPermissions(prev => prev.map(p => p.role === role ? { ...p, enabledFeatures: features } : p));
  };

  const addTimelineEvent = async (event: any) => {
    try {
      const newEvent = await db.timeline.create(event);
      setTimelineEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      console.error("Failed to save timeline event:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Authenticating Nexus Session...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={() => {}} />; // Login handles its own logic with Supabase now
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppFeature.EMPLOYEE_DASHBOARD: return <EmployeeDashboard />;
      case AppFeature.ADMIN_DASHBOARD: return <AdminDashboard />;
      case AppFeature.VOICE_AUTOMATION: return <VoiceAutomation onSaveCall={addTimelineEvent} />;
      case AppFeature.TIMELINE: return <JourneyTimeline userRole={currentUser.role} events={timelineEvents} />;
      case AppFeature.SIMULATOR: return <TeamSimulator />;
      case AppFeature.STRATEGY: return <ArchDocs />;
      case AppFeature.USER_MANAGEMENT: return <UserManagement />;
      case AppFeature.FEATURE_SETTINGS: return <RoleConfigPanel permissions={permissions} onUpdate={handleUpdatePermissions} />;
      default: return <div className="p-20 text-center text-slate-400 font-bold">Select a feature</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        permissions={permissions} 
        onLogout={() => supabase.auth.signOut()}
      />
      <main className="flex-1 ml-64 p-8 pb-32">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nexus Banking Intelligence</h1>
          </div>
        </header>
        {renderContent()}
        <AIChatbot />
      </main>
    </div>
  );
};

export default App;
