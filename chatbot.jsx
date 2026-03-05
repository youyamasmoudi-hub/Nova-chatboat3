import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a friendly, intelligent bilingual assistant who speaks both French and English fluently. 
Detect the language of each user message and always respond in the SAME language they used.
If they write in French, respond in French. If they write in English, respond in English.
Be warm, concise, and helpful. You can discuss any topic freely.`;

const translations = {
  fr: {
    title: "NOVA",
    subtitle: "Assistant IA bilingue",
    placeholder: "Écris en français ou en anglais...",
    send: "Envoyer",
    thinking: "En train de réfléchir...",
    welcome: "Bonjour ! Je suis Nova, ton assistant IA. Je parle français et anglais — écris-moi dans la langue de ton choix !",
    langToggle: "EN",
  },
  en: {
    title: "NOVA",
    subtitle: "Bilingual AI Assistant",
    placeholder: "Write in French or English...",
    send: "Send",
    thinking: "Thinking...",
    welcome: "Hello! I'm Nova, your AI assistant. I speak both French and English — write to me in whichever language you prefer!",
    langToggle: "FR",
  },
};

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("fr");
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startChat = () => {
    setStarted(true);
    setMessages([{ role: "assistant", content: translations[lang].welcome }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    if (!started) return;
    setMessages([{ role: "assistant", content: translations[newLang].welcome }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.map((c) => c.text || "").join("") || "…";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Une erreur s'est produite. / An error occurred." }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{
        position: "fixed", top: "-20%", left: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: "100%", maxWidth: "680px",
        display: "flex", flexDirection: "column", gap: "0",
        position: "relative", zIndex: 1,
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: "24px",
        }}>
          <div>
            <div style={{
              fontSize: "42px", fontWeight: "700", letterSpacing: "8px",
              color: "#fff", lineHeight: 1,
              textShadow: "0 0 40px rgba(99,102,241,0.5)",
            }}>
              {t.title}
            </div>
            <div style={{
              fontSize: "11px", letterSpacing: "4px", color: "#6366f1",
              textTransform: "uppercase", marginTop: "4px", fontFamily: "monospace",
            }}>
              {t.subtitle}
            </div>
          </div>
          <button onClick={toggleLang} style={{
            background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
            color: "#a5b4fc", padding: "8px 16px", borderRadius: "6px",
            cursor: "pointer", fontFamily: "monospace", fontSize: "12px",
            letterSpacing: "2px", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "rgba(99,102,241,0.3)"}
            onMouseLeave={e => e.target.style.background = "rgba(99,102,241,0.15)"}
          >
            → {t.langToggle}
          </button>
        </div>

        {/* Chat window */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
        }}>
          {/* Messages area */}
          <div style={{
            height: "420px",
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}>
            {!started ? (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "24px",
              }}>
                {/* Animated logo */}
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(236,72,153,0.2) 100%)",
                  border: "1px solid rgba(99,102,241,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "32px",
                  animation: "pulse 2s ease-in-out infinite",
                }}>
                  ✦
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#e2e8f0", fontSize: "18px", marginBottom: "8px" }}>
                    {lang === "fr" ? "Prêt à discuter ?" : "Ready to chat?"}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "13px", fontFamily: "monospace" }}>
                    FR · EN
                  </div>
                </div>
                <button onClick={startChat} style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", color: "#fff",
                  padding: "14px 36px", borderRadius: "100px",
                  cursor: "pointer", fontSize: "14px",
                  letterSpacing: "2px", fontFamily: "monospace",
                  textTransform: "uppercase",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                  {lang === "fr" ? "Commencer" : "Start"}
                </button>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    animation: "fadeIn 0.3s ease",
                  }}>
                    {msg.role === "assistant" && (
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", marginRight: "10px", flexShrink: 0, marginTop: "2px",
                      }}>✦</div>
                    )}
                    <div style={{
                      maxWidth: "75%",
                      padding: "12px 16px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "rgba(255,255,255,0.06)",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                      whiteSpace: "pre-wrap",
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
                    }}>✦</div>
                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "16px 16px 16px 4px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", gap: "6px", alignItems: "center",
                    }}>
                      {[0, 1, 2].map(j => (
                        <div key={j} style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: "#6366f1",
                          animation: `bounce 1s ease-in-out ${j * 0.2}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input bar */}
          {started && (
            <div style={{
              padding: "16px 20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: "12px", alignItems: "flex-end",
              background: "rgba(0,0,0,0.2)",
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.placeholder}
                rows={1}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px", padding: "12px 16px",
                  color: "#e2e8f0", fontSize: "14px",
                  fontFamily: "Georgia, serif", lineHeight: "1.5",
                  resize: "none", outline: "none",
                  transition: "border-color 0.2s",
                  maxHeight: "120px",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                  border: "none",
                  color: input.trim() && !loading ? "#fff" : "#4a5568",
                  width: "44px", height: "44px", borderRadius: "10px",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", transition: "all 0.2s", flexShrink: 0,
                  boxShadow: input.trim() && !loading ? "0 0 20px rgba(99,102,241,0.4)" : "none",
                }}
              >
                ↑
              </button>
            </div>
          )}
        </div>

        <div style={{
          textAlign: "center", marginTop: "16px",
          fontSize: "11px", color: "#334155", fontFamily: "monospace", letterSpacing: "2px",
        }}>
          POWERED BY CLAUDE · ANTHROPIC
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.6); transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
}
