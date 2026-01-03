
import React, { useEffect, useState } from 'react';
import { MOCK_REPS } from '../constants';
import { User, UserRole } from '../types';
import { db } from '../services/api';

interface Props {
  onImpersonate: (user: User) => void;
}

const UserManagement: React.FC<Props> = ({ onImpersonate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    territory: '', 
    role: UserRole.REP,
    target: '',
    appraisalPeriod: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await db.profiles.getAll();
        setUsers(data && data.length ? data : MOCK_REPS);
      } catch {
        setUsers(MOCK_REPS);
      }
    })();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const user: User = {
      id: `rm-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      territory: newUser.territory,
      role: newUser.role,
      target: newUser.target,
      appraisalPeriod: newUser.appraisalPeriod,
      avatar: `https://picsum.photos/seed/${newUser.name}/100/100`,
      performanceScore: 0
    };
    try {
      const created = await db.profiles.create(user);
      setUsers([created, ...users]);
      setShowAddModal(false);
      setNewUser({ 
        name: '', 
        email: '', 
        territory: '', 
        role: UserRole.REP,
        target: '',
        appraisalPeriod: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">User Management</h2>
          <p className="text-slate-500 text-sm">Create and oversee relationship manager access profiles.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <i className="fas fa-user-plus"></i>
          Provision New User
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Region</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Target</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Cycle</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} className="w-10 h-10 rounded-xl border border-slate-200" alt="" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase ${
                      user.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600">{user.territory}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-indigo-600">{user.target || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase">{user.appraisalPeriod || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onImpersonate(user)} className="px-3 h-8 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold text-[10px] uppercase">
                        Use This User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <i className="fas fa-user-plus text-indigo-400"></i>
                Provision New Access
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Full Legal Name</label>
                  <input 
                    required
                    value={newUser.name}
                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Johnathan Smith"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Corporate Email</label>
                  <input 
                    required
                    type="email"
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="jsmith@nexus-capital.io"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Assigned Territory</label>
                  <input 
                    required
                    value={newUser.territory}
                    onChange={e => setNewUser({...newUser, territory: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="NE, EMEA, APAC"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">System Role</label>
                  <select 
                    value={newUser.role}
                    onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                  >
                    <option value={UserRole.REP}>Relationship Manager</option>
                    <option value={UserRole.ADMIN}>Regional Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Revenue Target (AUM)</label>
                  <input 
                    required
                    value={newUser.target}
                    onChange={e => setNewUser({...newUser, target: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. $500M"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Performance Cycle</label>
                  <input 
                    required
                    value={newUser.appraisalPeriod}
                    onChange={e => setNewUser({...newUser, appraisalPeriod: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Q3 2024"
                  />
                </div>
              </div>
              {error && <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 font-bold">{error}</div>}
              <button type="submit" disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 disabled:opacity-50 shadow-xl shadow-indigo-500/20 transition-all">
                {loading ? 'Provisioning...' : 'Authenticate & Provision Profile'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
