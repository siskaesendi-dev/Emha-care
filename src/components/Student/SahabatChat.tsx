import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, FileText, ArrowLeft, RefreshCw, Shield, AlertTriangle, User, Heart, MessageSquare, PhoneCall, CheckCircle2, ThumbsUp } from 'lucide-react';
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
      text: 'Hai! Aku Buddy, teman dekatmu di EMHA CARE. Di sini ruang aman dan rahasia buat kamu curhat apa saja. Gimana kabarmu hari ini? Ada yang lagi kamu rasakan atau mau kamu ceritakan santai ke Aku?',
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

  const initialQuickPrompts = [
    'Halo Buddy, apa kabar?',
    'Ada teman yang suka mengejek aku di kelas...',
    'Tadi uang jajanku diminta paksa...',
    'Aku belum mau cerita dulu...',
    'Hari ini seru banget di madrasah!'
  ];

  const ongoingQuickActions = [
    'Ceritaku sudah selesai, minta analisis Buddy',
    'Aku belum mau cerita dulu',
    'Apa saran Buddy buat masalahku?',
    'Terima kasih banyak Buddy, sudah cukup'
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

  // Helper to render formatted chat messages with deep analysis highlights
  const renderMessageContent = (text: string, isUser: boolean) => {
    if (isUser) {
      return <p className="whitespace-pre-wrap">{text}</p>;
    }

    const hasDeepAnalysis = text.includes('Yang Kamu Alami') || text.includes('Yang Kamu Rasakan') || text.includes('Rekomendasi Konsultasi ke Guru BK') || text.includes('1. Yang Kamu Alami');

    // Split text by lines to render structured paragraphs and bold headings
    const paragraphs = text.split('\n');

    return (
      <div className="space-y-2.5">
        {hasDeepAnalysis && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7F3EF] text-[#2D6A4F] text-[11px] font-bold border border-[#2D6A4F]/20 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Analisis & Refleksi Sahabat Buddy</span>
          </div>
        )}

        <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-[#1B4332]">
          {paragraphs.map((para, pIdx) => {
            const trimmed = para.trim();
            if (!trimmed) return null;

            // Highlight analysis sections
            if (trimmed.startsWith('🔍') || trimmed.startsWith('💛') || trimmed.startsWith('🤝') || trimmed.startsWith('**1.') || trimmed.startsWith('**2.') || trimmed.startsWith('**3.')) {
              return (
                <div key={pIdx} className="font-bold text-[#1B4332] pt-1 text-xs sm:text-sm flex items-center gap-1.5">
                  <span>{trimmed.replace(/\*\*/g, '')}</span>
                </div>
              );
            }

            return (
              <p key={pIdx} className="whitespace-pre-wrap">
                {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
              </p>
            );
          })}
        </div>

        {/* If deep analysis is present, display quick interactive resolution actions directly in the card */}
        {hasDeepAnalysis && (
          <div className="mt-3 pt-3 border-t border-[#E9E4D9] flex flex-wrap items-center gap-2">
            <button
              onClick={handleConvertToReport}
              disabled={isSummarizing}
              className="inline-flex items-center gap-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isSummarizing ? 'Meringkas...' : 'Jadikan Laporan ke Guru BK'}</span>
            </button>

            <a
              href="https://wa.me/6282329180233"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#1B4332] px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#E9E4D9] transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>WhatsApp Guru BK</span>
            </a>

            <button
              onClick={() => handleSend('Terima kasih banyak Buddy, aku merasa lebih lega sekarang.')}
              className="inline-flex items-center gap-1.5 bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#5C6B5E] px-3 py-1.5 rounded-xl text-xs font-medium border border-[#E9E4D9] transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Ucapkan Terima Kasih</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const userMessagesCount = messages.filter(m => m.role === 'user').length;

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

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white font-bold text-xs shadow-xs">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
              <span>Buddy (Sahabat EMHA CARE)</span>
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
            </h2>
            <p className="text-[10px] text-[#5C6B5E]">Teman Dekat, Pendengar Hangat & Ruang Aman</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'welcome-1',
                role: 'model',
                text: 'Hai! Aku Buddy, teman dekatmu di EMHA CARE. Di sini ruang aman dan rahasia buat kamu curhat apa saja. Gimana kabarmu hari ini? Ada yang lagi kamu rasakan atau mau kamu ceritakan santai ke Aku?',
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
          <strong className="text-[#2D6A4F]">Ruang Aman & Rahasia:</strong> Ceritakan apa pun yang kamu rasakan tanpa rasa takut atau dihakimi. Buddy di sini untuk mendengarkan, menemani, dan menguatkan hatimu.
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#E9E4D9] shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FDFBF7]">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[90%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
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
                    {renderMessageContent(m.text, isUser)}
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
                <span className="text-xs text-[#5C6B5E] ml-1">Buddy sedang merespon hangat...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {userMessagesCount === 0 && (
          <div className="px-4 py-2.5 bg-white border-t border-[#E9E4D9] overflow-x-auto flex gap-2 no-scrollbar">
            {initialQuickPrompts.map((prompt, idx) => (
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

        {/* Ongoing Interaction Chips when already chatting */}
        {userMessagesCount > 0 && (
          <div className="px-4 py-2 bg-white border-t border-[#E9E4D9] overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] font-bold text-[#8C8475] uppercase tracking-wider shrink-0">Opsi Cepat:</span>
            {ongoingQuickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action)}
                className="whitespace-nowrap text-[11px] bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#5C6B5E] px-3 py-1 rounded-full transition-colors border border-[#E9E4D9] font-medium"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Optional Action Banner to Convert to Report */}
        {showReportOffer && (
          <div className="px-4 py-3 bg-[#F3EFED] border-t border-[#E9E4D9] flex items-center justify-between gap-2">
            <div className="text-[11px] text-[#1B4332] font-medium">
              💡 Mau cerita ini diteruskan dengan lembut ke Guru BK untuk bantuan nyata?
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
                  <span>Jadikan Laporan ke BK</span>
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
          Buddy hadir sebagai teman curhat & pendengar hangat. Pendampingan nyata di madrasah dilakukan oleh Guru BK (Ibu Siska).
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

