'use client';

import { Sparkles, MessageSquare, Code, Lightbulb, Image, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const examplePrompts = [
  {
    icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
    title: "Explain quantum computing",
    subtitle: "in simple terms"
  },
  {
    icon: <Code className="w-5 h-5 text-blue-500" />,
    title: "How do I make an HTTP request",
    subtitle: "in Javascript?"
  },
  {
    icon: <BookOpen className="w-5 h-5 text-green-500" />,
    title: "Translate this to Hindi",
    subtitle: "Hello, how are you?"
  },
  {
    icon: <Image className="w-5 h-5 text-purple-500" />,
    title: "Help me write a poem",
    subtitle: "about nature and technology"
  }
];

export default function EmptyState({ onPromptClick }: { onPromptClick?: (prompt: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 overflow-y-auto animate-fade-in-up">
      {/* Logo with glow animation */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 animate-pulse-glow rounded-xl p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">
            Gyanix
          </h1>
        </div>
        <p className="text-gray-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Your Indian AI Companion
        </p>
      </div>

      {/* Example Prompts with stagger animation */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {examplePrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick?.(`${prompt.title} ${prompt.subtitle}`)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border border-gray-700/50 bg-gray-800/30",
              "hover:bg-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-green-500/10",
              "transition-all duration-300 ease-out text-left group",
              "animate-fade-in-up hover:-translate-y-1"
            )}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="p-2 rounded-lg bg-gray-700/30 group-hover:bg-gray-700/50 transition-colors group-hover:scale-110 transform duration-300">
              {prompt.icon}
            </div>
            <div>
              <h3 className="text-gray-200 font-medium mb-1 group-hover:text-green-400 transition-colors">
                {prompt.title}
              </h3>
              <p className="text-gray-500 text-sm">{prompt.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <div className="mt-12 flex items-center gap-2 text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <MessageSquare className="w-4 h-4" />
        <span>Start a conversation by typing below or selecting a prompt</span>
      </div>
    </div>
  );
}