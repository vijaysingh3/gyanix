'use client';

import { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  emptyStateComponent: React.ReactNode;
}

export default function MessageList({ messages, isLoading, emptyStateComponent }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        {emptyStateComponent}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollRef}>
      <div className="pb-4">
        {messages.map((message) => (
          <div key={message.id} className="group">
            <MessageBubble
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
            />
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-4 px-4 py-6 bg-gray-900 border-b border-gray-800/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-sm text-green-400 mb-2 block">Gyanix</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-sm text-gray-500 ml-2">Typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}