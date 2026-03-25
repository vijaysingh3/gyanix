'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

// ---- Types ----
type Tab = 'chat' | 'tts' | 'stt' | 'translate'
type Message = { role: 'user' | 'assistant'; content: string }

const LANGUAGES = [
  { code: 'hi-IN', name: 'हिंदी' },
  { code: 'en-IN', name: 'English' },
  { code: 'bn-IN', name: 'বাংলা' },
  { code: 'ta-IN', name: 'தமிழ்' },
  { code: 'te-IN', name: 'తెలుగు' },
  { code: 'mr-IN', name: 'मराठी' },
  { code: 'gu-IN', name: 'ગુજરાતી' },
  { code: 'kn-IN', name: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'മലയാളം' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ' },
]

const TTS_SPEAKERS = ['meera', 'pavithra', 'maitreyi', 'arvind', 'amol', 'amartya']

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')

  // --- Chat state ---
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'नमस्ते! मैं Sarvam AI हूँ। आप मुझसे हिंदी या किसी भी भारतीय भाषा में बात कर सकते हैं! 🙏' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // --- TTS state ---
  const [ttsText, setTtsText] = useState('')
  const [ttsLang, setTtsLang] = useState('hi-IN')
  const [ttsSpeaker, setTtsSpeaker] = useState('meera')
  const [ttsLoading, setTtsLoading] = useState(false)
  const [ttsAudio, setTtsAudio] = useState<string | null>(null)

  // --- STT state ---
  const [isRecording, setIsRecording] = useState(false)
  const [sttLang, setSttLang] = useState('hi-IN')
  const [transcript, setTranscript] = useState('')
  const [sttLoading, setSttLoading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // --- Translate state ---
  const [transText, setTransText] = useState('')
  const [transFrom, setTransFrom] = useState('hi-IN')
  const [transTo, setTransTo] = useState('en-IN')
  const [transResult, setTransResult] = useState('')
  const [transLoading, setTransLoading] = useState(false)

  // auto scroll chat
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // ---- Chat Submit ----
  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return
    const userMsg: Message = { role: 'user', content: chatInput }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setChatInput('')
    setChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'कुछ गड़बड़ हुई। फिर कोशिश करें।'
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Server error. Please try again.' }])
    }
    setChatLoading(false)
  }

  // ---- TTS Submit ----
  async function generateSpeech() {
    if (!ttsText.trim() || ttsLoading) return
    setTtsLoading(true)
    setTtsAudio(null)
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsText, language: ttsLang, speaker: ttsSpeaker }),
      })
      const data = await res.json()
      if (data.audio) setTtsAudio(data.audio)
    } catch { /* silent */ }
    setTtsLoading(false)
  }

  // ---- STT Recording ----
  async function toggleRecording() {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunksRef.current = []
      mr.ondataavailable = (e) => chunksRef.current.push(e.data)
      mr.onstop = async () => {
        setSttLoading(true)
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const fd = new FormData()
        fd.append('file', blob, 'audio.webm')
        fd.append('language', sttLang)
        try {
          const res = await fetch('/api/stt', { method: 'POST', body: fd })
          const data = await res.json()
          setTranscript(data.transcript || 'कुछ सुनाई नहीं दिया।')
        } catch { setTranscript('⚠️ Error processing audio.') }
        setSttLoading(false)
        stream.getTracks().forEach(t => t.stop())
      }
      mr.start()
      mediaRecorderRef.current = mr
      setIsRecording(true)
    } catch { alert('Microphone permission denied') }
  }

  // ---- Translate Submit ----
  async function translateText() {
    if (!transText.trim() || transLoading) return
    setTransLoading(true)
    setTransResult('')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transText, source_language: transFrom, target_language: transTo }),
      })
      const data = await res.json()
      setTransResult(data.translated || 'Translation failed.')
    } catch { setTransResult('⚠️ Error.') }
    setTransLoading(false)
  }

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'chat',      icon: '💬', label: 'Chat' },
    { id: 'tts',       icon: '🔊', label: 'Text → Voice' },
    { id: 'stt',       icon: '🎤', label: 'Voice → Text' },
    { id: 'translate', icon: '🌐', label: 'Translate' },
  ]

  return (
    <main className={styles.main}>
      {/* ---- Hero Header ---- */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoArea}>
            <span className={styles.logoIcon}>🪔</span>
            <div>
              <h1 className={styles.logoTitle}>सर्वम् AI</h1>
              <p className={styles.logoSub}>भारत की आवाज़ — India's AI Platform</p>
            </div>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Free Credits Active
          </div>
        </div>
        {/* Decorative mandala line */}
        <div className={styles.mandalaLine}>
          {'❋ '.repeat(40)}
        </div>
      </header>

      {/* ---- Tab Bar ---- */}
      <div className={styles.tabBar}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ---- Content Area ---- */}
      <div className={styles.content}>

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className={styles.chatContainer}>
            <div className={styles.chatMessages}>
              {messages.map((m, i) => (
                <div key={i} className={`${styles.msgBubble} ${m.role === 'user' ? styles.msgUser : styles.msgBot}`}>
                  {m.role === 'assistant' && <span className={styles.botAvatar}>🪔</span>}
                  <p>{m.content}</p>
                </div>
              ))}
              {chatLoading && (
                <div className={`${styles.msgBubble} ${styles.msgBot}`}>
                  <span className={styles.botAvatar}>🪔</span>
                  <div className={styles.typingDots}>
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className={styles.chatInputRow}>
              <textarea
                className="input-field"
                rows={2}
                placeholder="हिंदी या English में लिखें..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat() } }}
              />
              <button className="btn-primary" onClick={sendChat} disabled={chatLoading}>
                भेजें ↗
              </button>
            </div>
          </div>
        )}

        {/* TTS TAB */}
        {activeTab === 'tts' && (
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>🔊 Text to Speech</h2>
            <p className={styles.panelDesc}>Text likho — Sarvam AI bolega!</p>

            <div className={styles.selectRow}>
              <div className={styles.selectGroup}>
                <label>भाषा / Language</label>
                <select className={styles.select} value={ttsLang} onChange={e => setTtsLang(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
              <div className={styles.selectGroup}>
                <label>आवाज़ / Speaker</label>
                <select className={styles.select} value={ttsSpeaker} onChange={e => setTtsSpeaker(e.target.value)}>
                  {TTS_SPEAKERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <textarea
              className="input-field"
              rows={5}
              placeholder="यहाँ अपना text लिखें..."
              value={ttsText}
              onChange={e => setTtsText(e.target.value)}
            />
            <button className="btn-primary" onClick={generateSpeech} disabled={ttsLoading} style={{ marginTop: 12 }}>
              {ttsLoading ? '⏳ Generating...' : '🔊 Generate Speech'}
            </button>

            {ttsAudio && (
              <div className={styles.audioPlayer}>
                <p className={styles.audioLabel}>✅ Audio Ready:</p>
                <audio controls src={`data:audio/wav;base64,${ttsAudio}`} style={{ width: '100%' }} />
              </div>
            )}
          </div>
        )}

        {/* STT TAB */}
        {activeTab === 'stt' && (
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>🎤 Speech to Text</h2>
            <p className={styles.panelDesc}>Bolo — Sarvam AI likhega!</p>

            <div className={styles.selectGroup} style={{ marginBottom: 24 }}>
              <label>भाषा / Language</label>
              <select className={styles.select} value={sttLang} onChange={e => setSttLang(e.target.value)}>
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>

            <div className={styles.micArea}>
              <button
                className={`${styles.micBtn} ${isRecording ? styles.micActive : ''}`}
                onClick={toggleRecording}
              >
                {isRecording ? '⏹️' : '🎙️'}
              </button>
              <p className={styles.micLabel}>
                {isRecording ? '🔴 Recording... (click to stop)' : 'Click to start recording'}
              </p>
            </div>

            {sttLoading && <p className={styles.loadingText}>⏳ Processing audio...</p>}

            {transcript && (
              <div className={styles.transcriptBox}>
                <p className={styles.transcriptLabel}>📝 Transcript:</p>
                <p className={styles.transcriptText}>{transcript}</p>
                <button
                  className={styles.copyBtn}
                  onClick={() => navigator.clipboard.writeText(transcript)}
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        )}

        {/* TRANSLATE TAB */}
        {activeTab === 'translate' && (
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>🌐 Translate</h2>
            <p className={styles.panelDesc}>10 Indian languages support!</p>

            <div className={styles.selectRow}>
              <div className={styles.selectGroup}>
                <label>From</label>
                <select className={styles.select} value={transFrom} onChange={e => setTransFrom(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
              <button className={styles.swapBtn} onClick={() => { setTransFrom(transTo); setTransTo(transFrom) }}>
                ⇄
              </button>
              <div className={styles.selectGroup}>
                <label>To</label>
                <select className={styles.select} value={transTo} onChange={e => setTransTo(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
            </div>

            <textarea
              className="input-field"
              rows={4}
              placeholder="यहाँ text लिखें जो translate करना है..."
              value={transText}
              onChange={e => setTransText(e.target.value)}
            />
            <button className="btn-primary" onClick={translateText} disabled={transLoading} style={{ marginTop: 12 }}>
              {transLoading ? '⏳ Translating...' : '🌐 Translate'}
            </button>

            {transResult && (
              <div className={styles.transcriptBox}>
                <p className={styles.transcriptLabel}>✅ Translated:</p>
                <p className={styles.transcriptText}>{transResult}</p>
                <button
                  className={styles.copyBtn}
                  onClick={() => navigator.clipboard.writeText(transResult)}
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Footer ---- */}
      <footer className={styles.footer}>
        <p>🇮🇳 Powered by <strong>Sarvam AI</strong> — Made with ❤️ for Bharat</p>
      </footer>
    </main>
  )
}
