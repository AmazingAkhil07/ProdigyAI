
import React, { useState, useEffect, useRef } from 'react';
import { getStudyAdvice, chatWithAssistant } from '../services/geminiService';
import { Phase, UserProgress, Message } from '../types';
import { ROADMAP_DATA } from '../constants';

interface AIAssistantProps {
  currentPhase: Phase | undefined;
  progress: UserProgress;
  onUpdateHistory: (history: Message[]) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentPhase, progress, onUpdateHistory }) => {
  const [advice, setAdvice] = useState<string>("Analyzing your path...");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format AI response text for better readability
  const formatMessage = (text: string) => {
    return text
      // Remove markdown headers (####, ###, ##, #)
      .replace(/#{1,6}\s+/g, '')
      // Remove bold markers but keep the text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // Convert numbered lists to bullet points
      .replace(/^\s*(\d+)\.\s+/gm, '• ')
      // Convert dashes to bullet points
      .replace(/^\s*[-*]\s+/gm, '• ')
      // Add spacing after bullet points
      .replace(/•\s+/g, '• ')
      // Add double line breaks after periods (for paragraphs)
      .replace(/\.\s+(?=[A-Z])/g, '.\n\n')
      // Add line breaks before bullet points
      .replace(/•/g, '\n• ')
      // Clean up multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const renderFormattedText = (text: string) => {
    const formatted = formatMessage(text);
    return formatted.split('\n').map((line, idx) => {
      const isBullet = line.trim().startsWith('•');
      return (
        <div key={idx} className={isBullet ? 'ml-2 my-1' : 'my-2'}>
          {line.trim().startsWith('•') ? (
            <span className="flex items-start space-x-2">
              <span className="text-indigo-500 font-bold mt-0.5">•</span>
              <span className="flex-1">{line.replace('•', '').trim()}</span>
            </span>
          ) : line ? (
            <span>{line}</span>
          ) : null}
        </div>
      );
    });
  };

  useEffect(() => {
    if (isChatOpen) scrollToBottom();
  }, [progress.chatHistory, isChatOpen]);

  const fetchAdvice = async () => {
    if (!currentPhase) return;
    const nextTask = "Finish the roadmap";
    const totalTodos = currentPhase.modules.reduce((acc, m) => acc + m.todos.length, 0);
    const completedTodos = currentPhase.modules.reduce((acc, m) => 
      acc + m.todos.filter(t => progress.completedTodos.includes(t.id)).length, 0
    );

    const res = await getStudyAdvice(currentPhase.title, completedTodos, totalTodos, nextTask);
    setAdvice(res);
  };

  useEffect(() => {
    fetchAdvice();
  }, [currentPhase?.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: userInput };
    const updatedHistory = [...progress.chatHistory, userMsg];
    onUpdateHistory(updatedHistory);
    setUserInput('');
    setLoading(true);

    const responseText = await chatWithAssistant(
      userInput,
      progress.chatHistory,
      ROADMAP_DATA,
      progress.completedTodos
    );

    const modelMsg: Message = { role: 'model', text: responseText };
    onUpdateHistory([...updatedHistory, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Advice Header Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-rocket text-7xl rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <i className="fas fa-magic text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Strategy Coach</h3>
              <p className="text-[10px] uppercase tracking-widest text-indigo-100 opacity-80 font-bold">Live Insight</p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed italic">
            "{advice}"
          </p>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="mt-5 w-full bg-white text-indigo-700 hover:bg-indigo-50 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
          >
            <i className={`fas fa-${isChatOpen ? 'times' : 'comment-dots'}`} />
            <span>{isChatOpen ? 'Close Chat' : 'Ask Roadmap Doubts'}</span>
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg flex flex-col h-[400px] animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Coach Chat</h4>
            <span className="flex items-center space-x-1 text-[10px] text-emerald-500 font-bold uppercase">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Online</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {progress.chatHistory.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <i className="fas fa-comments text-3xl mb-2 text-slate-300" />
                <p className="text-xs">Ask me anything about your roadmap!</p>
              </div>
            )}
            {progress.chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.role === 'model' ? (
                    <div className="space-y-1 leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>
                  ) : (
                    <div className="leading-relaxed">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex space-x-2">
            <input 
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
