ai-chat-platform/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/
│   │   └── 📁 chat/
│   │       └── route.ts             # [PENDING - Step 9] Indian API proxy
│   ├── layout.tsx                   # ✅ [DONE - Step 1] Root layout with dark mode
│   ├── page.tsx                     # ✅ [DONE - Step 2] Main page with EmptyState
│   └── globals.css                  # ✅ [DONE - Step 1] Styles + scrollbar
│
├── 📁 components/
│   ├── 📁 chat/                     # Chat specific components
│   │   ├── EmptyState.tsx           # ✅ [DONE - Step 2] Welcome screen
│   │   ├── ChatInput.tsx            # 🔄 [NEXT - Step 3] Message input box
│   │   ├── MessageBubble.tsx        # ⏳ [Step 4] User/AI message UI
│   │   ├── MessageList.tsx          # ⏳ [Step 5] Messages container
│   │   └── ChatContainer.tsx        # ⏳ [Step 6] Main chat wrapper logic
│   └── 📁 ui/                       # Reusable UI components
│       └── (shadcn components yahan ayenge)
│
├── 📁 lib/
│   └── utils.ts                     # ⏳ [Step 7] cn() helper function
│
├── 📁 types/
│   └── chat.ts                      # ⏳ [Step 8] TypeScript interfaces
│
├── 📁 public/                       # Static assets
│   └── (favicon, logos, etc.)
│
├── ⚙️ ROOT CONFIG FILES (Project ke bahar)
├── tailwind.config.ts               # ✅ [DONE - Step 1] Tailwind + Gyanix colors
├── next.config.js                   # ⚡ [VERCEL DEPLOY READY]
├── tsconfig.json                    # [AUTO-GENERATED]
├── package.json                     # [AUTO-GENERATED]
└── .env.local                       # ⚠️ [LOCAL ONLY - Git ignore]