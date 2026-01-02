
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_ACCOUNTS } from '../constants';
import { Account, TimelineEvent } from '../types';
import { chatWithGemini } from '../services/gemini';
import { db } from '../services/api';

interface VoiceAutomationProps {
  onSaveCall?: (event: any) => void;
}

const VoiceAutomation: React.FC<VoiceAutomationProps> = ({ onSaveCall }) => {
  const [activeCall, setActiveCall] = useState<Account | null>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'completed' | 'analyzing'>('idle');
  const [transcription, setTranscription] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startCall = async (account: Account) => {
    setActiveCall(account);
    setCallStatus('connecting');
    setAiAnalysis(null);
    setRecordingUrl(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        try {
          const publicUrl = await db.storage.uploadRecording(blob, account.name);
          setRecordingUrl(publicUrl);
        } catch (err) {
          console.error("Storage error:", err);
        }
      };
      mediaRecorderRef.current.start();
    } catch (err) { console.warn(err); }

    setTimeout(() => {
      setCallStatus('active');
      setTranscription(["[AI] Hello, this is Nexus Capital..."]);
    }, 2000);
  };

  const saveToTimeline = async () => {
    if (!activeCall || !aiAnalysis || !onSaveCall) return;
    setSaving(true);
    
    const event = {
      account_id: activeCall.id,
      type: 'VOICE_FEEDBACK',
      title: `AI Feedback Call: ${activeCall.name}`,
      description: aiAnalysis.summary,
      status: aiAnalysis.sentiment,
      metadata: {
        sentiment: aiAnalysis.sentiment,
        scoreDelta: aiAnalysis.scoreDelta,
        concerns: aiAnalysis.concerns,
        audioUrl: recordingUrl,
        transcript: transcription
      }
    };

    try {
      await onSaveCall(event);
      setActiveCall(null);
      setCallStatus('idle');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Rendering logic remains similar but uses real recordingUrl and saves to Supabase
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold mb-4">Queue</h3>
             {MOCK_ACCOUNTS.filter(a => a.needsCheckup).map(acc => (
               <button key={acc.id} onClick={() => startCall(acc)} className="w-full text-left p-4 hover:bg-slate-50 rounded-xl border border-slate-100 mb-2">
                 <p className="font-bold text-sm">{acc.name}</p>
                 <p className="text-[10px] text-slate-400">NEEDS ATTENTION</p>
               </button>
             ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeCall ? (
            <div className="bg-slate-900 rounded-3xl h-[600px] flex flex-col p-8 text-white">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <h3 className="text-xl font-bold">{activeCall.name}</h3>
                {callStatus === 'active' && <span className="bg-rose-500 px-3 py-1 rounded-full text-[10px] animate-pulse">RECORDING...</span>}
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 font-mono text-sm opacity-80">
                {transcription.map((t, i) => <p key={i}>{t}</p>)}
              </div>

              {callStatus === 'active' && (
                <button 
                  onClick={() => {
                    mediaRecorderRef.current?.stop();
                    setCallStatus('completed');
                    setAiAnalysis({ sentiment: 'Positive', summary: 'Client confirmed satisfaction with tracking.', concerns: [], scoreDelta: 2 });
                  }}
                  className="bg-rose-600 py-4 rounded-2xl font-bold hover:bg-rose-700 transition-all"
                >
                  End Session & Process Analysis
                </button>
              )}

              {callStatus === 'completed' && aiAnalysis && (
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                   <h4 className="font-bold text-indigo-400">Synthesis Complete</h4>
                   <p className="text-sm italic">"{aiAnalysis.summary}"</p>
                   {recordingUrl && <audio src={recordingUrl} controls className="w-full h-8" />}
                   <button 
                    disabled={saving}
                    onClick={saveToTimeline}
                    className="w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                   >
                     {saving ? 'Persisting to Cloud...' : 'Commit to Institutional Timeline'}
                   </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl h-[600px] flex items-center justify-center text-slate-400">
               Select an account to trigger AI feedback loop
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAutomation;
