
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Nexus.AI. I can help you analyze rep performance, calculate deal scores, or provide coaching strategies based on current CX data. How can I help today?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsThinking(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(userMessage, history);
    
    setIsThinking(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-500/50 flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform"
        >
          <i className="fas fa-brain"></i>
        </button>
      ) : (
        <div className="w-[450px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center border border-indigo-400/30">
                <i className="fas fa-bolt"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">Nexus.AI Strategist</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-indigo-100 uppercase font-bold tracking-widest">Powered by Gemini 3 Pro</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-800'
                }`}>
                  {m.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>)}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 rounded-2xl bg-white border border-indigo-100 shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">Analyzing with deep thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Ask for performance analysis or coaching tips..."
                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 resize-none max-h-32"
                rows={1}
              />
              <button 
                onClick={handleSend}
                disabled={isThinking || !input.trim()}
                className="absolute right-2 top-1.5 w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center uppercase font-bold">Deep thinking mode enabled for complex queries</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
