'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSend, 
  disabled = false, 
  placeholder = "Message Gyanix..." 
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    
    onSend(input.trim());
    setInput('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-end bg-gray-800 rounded-2xl border border-gray-700 shadow-lg">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 px-4 py-3.5 pr-12 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-[200px] min-h-[56px] rounded-2xl"
          />
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="absolute right-2 bottom-2 p-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:hover:bg-gray-700 disabled:opacity-40 text-white rounded-xl transition-all duration-200 flex items-center justify-center"
          >
            {disabled ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-center text-gray-600 mt-2">
          Gyanix can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
}