'use client';

import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string;
}

export default function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 px-4 py-6 ${isUser ? 'bg-gray-800/50' : 'bg-gray-900'} border-b border-gray-800/50`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
            <User className="w-5 h-5 text-gray-300" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className={`font-semibold text-sm ${isUser ? 'text-gray-200' : 'text-green-400'}`}>
            {isUser ? 'You' : 'Gyanix'}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-600">{timestamp}</span>
          )}
        </div>

        {/* Message Text */}
        <div className="text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>

        {/* Actions (Only for AI messages) */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded hover:bg-gray-800"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}'use client';

import { User, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string;
  isStreaming?: boolean; // नया prop
}

export default function MessageBubble({ 
  content, 
  role, 
  timestamp,
  isStreaming = false 
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';
  
  // AI messages के लिए typing effect
  const { displayedText, isComplete, skip } = useTypingEffect(
    content, 
    15, 
    isStreaming && !isUser
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={cn(
        "flex gap-4 px-4 py-6 border-b border-gray-800/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
        isUser ? 'bg-gray-800/30' : 'bg-gray-900'
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center border border-gray-600 shadow-lg">
            <User className="w-5 h-5 text-gray-300" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className={cn(
            "font-semibold text-sm",
            isUser ? 'text-gray-200' : 'text-green-400'
          )}>
            {isUser ? 'You' : 'Gyanix'}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-600">{timestamp}</span>
          )}
        </div>

        {/* Message Text with Typing Effect */}
        <div 
          className="text-gray-100 leading-relaxed whitespace-pre-wrap break-words cursor-default"
          onClick={() => !isComplete && skip()} // Click to skip animation
        >
          {isUser ? content : displayedText}
          {!isUser && !isComplete && (
            <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
          )}
        </div>

        {/* Actions */}
        {!isUser && isComplete && (
          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1.5 rounded-md hover:bg-gray-800/80"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}