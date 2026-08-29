import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, FileText, ArrowLeft, RefreshCw, Shield, AlertTriangle, User, Heart, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../../types';
import { generateNaturalSahabatResponse } from '../../utils/sahabatDialogue';

interface SahabatChatProps {
  onBack: () => void;
  onProceedToReport: (prefillDescription: string) => void;
}

export const SahabatChat: React.FC<SahabatChatProps> = ({ onBack, onProceedToReport }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: 'Hai! Aku Buddy, teman dekatmu di EMHA CARE yang siap mendengarkan ceritamu dengan hangat dan sabar. Di sini ruang aman dan rahasiamu. Ada yang lagi kamu rasakan, alami, atau ingin kamu ceritakan santai ke aku hari ini?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showReportOffer, setShowReportOffer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'Ada teman yang suka mengejek dan panggil nama jelek...',
    'Uang jajanku sering diminta paksa di lorong sekolah...',
    'Fotonya diedit dan disebarkan di grup WhatsApp kelas...',
    'Aku merasa dikucilkan dan dijauhi teman-teman...',
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    // After at least 2 user messages, display the friendly offer to convert to a report
    const userMessageCount = newMessages.filter(m => m.role === 'user').length;
    if (userMessageCount >= 2) {
      setShowReportOffer(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || generateNaturalSahabatResponse(newMessages),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('Failed to send message:', err);
      const fallbackReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: generateNaturalSahabatResponse(newMessages),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToReport = async () => {
    setIsSummarizing(true);
    try {
      const response = await fetch('/api/summarize-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });
      const data = await response.json();
      const summaryText = data.summary || messages.filter(m => m.role === 'user').map(m => m.text).join(' ');
      onProceedToReport(summaryText);
    } catch (err) {
      console.error('Failed to summarize chat:', err);
      const manualSummary = messages.filter(m => m.role === 'user').map(m => m.text).join(' ');
      onProceedToReport(manualSummary);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E9E4D9] shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white font-bold text-xs shadow-xs">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
              <span>Buddy • Curhat Sahabat</span>
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
            </h2>
            <p className="text-[10px] text-[#5C6B5E]">Teman Curhat & Ruang Aman Siswa</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'welcome-1',
                role: 'model',
                text: 'Hai! Aku Buddy, teman dekatmu di EMHA CARE yang siap mendengarkan ceritamu dengan hangat dan sabar. Di sini ruang aman dan rahasiamu. Ada yang lagi kamu rasakan, alami, atau ingin kamu ceritakan santai ke aku hari ini?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setShowReportOffer(false);
          }}
          className="p-1.5 rounded-lg text-[#8C8475] hover:text-[#1B4332] hover:bg-[#F5F2ED] transition-colors"
          title="Mulai Percakapan Baru"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-[#F3EFED] border border-[#E9E4D9] p-3.5 rounded-2xl text-[11px] text-[#1B4332] flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#2D6A4F]">Ruang Aman & Rahasia:</strong> Ceritakan apa pun yang kamu rasakan tanpa rasa takut atau dihakimi. Jika kamu ingin Guru BK membantu mendampingi di sekolah, ceritamu bisa diteruskan menjadi laporan kapan saja.
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#E9E4D9] shadow-sm flex flex-col h-[500px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FDFBF7]">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                )}
                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#2D6A4F] text-white rounded-tr-none'
                        : 'bg-white text-[#1B4332] border border-[#E9E4D9] rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <div className={`text-[10px] text-[#8C8475] px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
              <div className="w-7 h-7 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
              <div className="bg-white border border-[#E9E4D9] p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-[#5C6B5E] ml-1">Buddy sedang mendengarkan...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2.5 bg-white border-t border-[#E9E4D9] overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-[11px] bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#5C6B5E] px-3.5 py-1.5 rounded-full transition-colors border border-[#E9E4D9]"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Optional Action Banner to Convert to Report */}
        {showReportOffer && (
          <div className="px-4 py-3 bg-[#F3EFED] border-t border-[#E9E4D9] flex items-center justify-between gap-2">
            <div className="text-[11px] text-[#1B4332] font-medium">
              💡 Mau cerita ini diteruskan jadi laporan resmi ke Guru BK (Bu Siska)?
            </div>
            <button
              onClick={handleConvertToReport}
              disabled={isSummarizing}
              className="flex items-center gap-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isSummarizing ? (
                <span>Meringkas...</span>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Jadikan Laporan</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#E9E4D9] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Curhat atau ceritakan apa pun ke Buddy di sini..."
            className="flex-1 bg-[#FDFBF7] border border-[#E9E4D9] rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition-all text-[#1B4332]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Option Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-[#8C8475] text-[11px] text-center sm:text-left">
          Buddy didukung Gemini AI sebagai ruang curhat aman. Bimbingan nyata di sekolah didampingi oleh Guru BK.
        </p>

        <button
          onClick={() => onProceedToReport('')}
          className="text-[#2D6A4F] hover:text-[#1B4332] font-bold underline text-xs"
        >
          Lewati chat, langsung isi form laporan →
        </button>
      </div>
    </div>
  );
};
