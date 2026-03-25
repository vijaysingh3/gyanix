'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import Sidebar from './Sidebar';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponses = [
        `Namaste Vijay ji! Aapne kaha: "${content}"\n\nYeh ek demo response hai. Main abhi seekh raha hoon! 🤖`,
        `Interesting! "${content}" ke baare mein soch raha hoon...\n\nAbhi ke liye yeh dummy reply hai, real API jaldi aa raha hai! 🚀`,
        `Main Gyanix hoon, aapka Indian AI assistant!\n\nAapne poocha: "${content}"\n\nJawab: Iska jawaad Step 9 mein milega jab real API connect hoga! 😊`
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setActiveChat(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button (visible on small screens) */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg text-gray-400"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h2 className="text-lg font-semibold text-gray-200">
              {messages.length > 0 ? 'Chat' : 'New Chat'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button 
                onClick={handleNewChat}
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="New Chat"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
              Gyanix v1.0
            </div>
          </div>
        </header>

        {/* Message List */}
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          emptyStateComponent={
            <div className="h-full flex flex-col">
              <EmptyState onPromptClick={handleSendMessage} />
            </div>
          }
        />

        {/* Chat Input */}
        <ChatInput 
          onSend={handleSendMessage} 
          disabled={isLoading}
          placeholder="Message Gyanix..."
        />
      </div>
    </div>
  );
}