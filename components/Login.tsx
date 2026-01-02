
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Session state change is handled in App.tsx
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <i className="fas fa-bolt text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">NEXUS<span className="text-indigo-500">.AI</span></h1>
          <p className="text-slate-400 font-medium">Connect to Institutional Intelligence</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Corporate Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nexus.ai"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 font-bold">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Authenticate Session'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Test Credentials</p>
            <p className="text-[10px] text-slate-600 mt-1">admin@nexus.ai / alex@nexus.ai (pass: password123)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
