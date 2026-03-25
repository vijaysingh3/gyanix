import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind classes ko merge karne ka helper
 * Usage: cn("bg-red-500", "bg-blue-500") => "bg-blue-500" (jo baad mein aaya wo override karega)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Date ko readable format mein convert karo
 * Usage: formatDate(new Date()) => "Today, 2:30 PM"
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return d.toLocaleDateString([], { weekday: 'long' });
  } else {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

/**
 * Text ko truncate karo (lambi strings ke liye)
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Random ID generate karo
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Local storage se data save/load karne ke helpers
 */
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }
};