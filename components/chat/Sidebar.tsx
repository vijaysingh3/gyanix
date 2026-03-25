'use client';

import { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Settings, 
  User, 
  X,
  Menu,
  Sparkles
} from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  chats?: Chat[];
  onDeleteChat?: (id: string) => void;
  onSelectChat?: (id: string) => void;
}

// Dummy data for demo
const dummyChats: Chat[] = [
  { id: '1', title: 'Python programming help', timestamp: 'Today', isActive: true },
  { id: '2', title: 'React hooks explanation', timestamp: 'Today' },
  { id: '3', title: 'Hindi translation request', timestamp: 'Yesterday' },
  { id: '4', title: 'Project planning ideas', timestamp: 'Yesterday' },
  { id: '5', title: 'Machine learning basics', timestamp: '2 days ago' },
];

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  onNewChat,
  chats = dummyChats,
  onDeleteChat,
  onSelectChat
}: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'}
        ${!isOpen && 'lg:w-0 lg:overflow-hidden lg:border-none'}
      `}>
        {/* Header */}
        <div className="p-3 border-b border-gray-800">
          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors group"
          >
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-sm font-medium text-gray-200">New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2">
              Recent Chats
            </h3>
          </div>
          
          <div className="space-y-0.5 px-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat?.(chat.id)}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
                className={`
                  group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer
                  transition-colors relative
                  ${chat.isActive ? 'bg-gray-800/80' : 'hover:bg-gray-800/50'}
                `}
              >
                <MessageSquare className={`
                  w-4 h-4 shrink-0
                  ${chat.isActive ? 'text-green-400' : 'text-gray-500'}
                `} />
                
                <div className="flex-1 min-w-0">
                  <p className={`
                    text-sm truncate
                    ${chat.isActive ? 'text-gray-200' : 'text-gray-400'}
                  `}>
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {chat.timestamp}
                  </p>
                </div>

                {/* Delete Button - Show on hover */}
                {hoveredChat === chat.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat?.(chat.id);
                    }}
                    className="p-1.5 hover:bg-gray-700 rounded-md text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 space-y-1">
          {/* Settings */}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors group">
            <Settings className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
            <span className="text-sm text-gray-400 group-hover:text-gray-200">Settings</span>
          </button>
          
          {/* Profile */}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-300">Vijay Ji</p>
              <p className="text-xs text-gray-600">Pro User</p>
            </div>
          </button>
        </div>

        {/* Close Button (Mobile only) */}
        <button
          onClick={onToggle}
          className="absolute top-3 right-3 p-2 lg:hidden text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </aside>

      {/* Toggle Button (Mobile) */}
      <button
        onClick={onToggle}
        className={`
          fixed top-3 left-3 z-30 p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm
          border border-gray-700 text-gray-400 hover:text-white lg:hidden
          transition-all duration-300
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}