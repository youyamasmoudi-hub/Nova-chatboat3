{msg.role === "assistant" && (
  <div style={{
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    marginRight: "10px",
    flexShrink: 0,
    marginTop: "2px",
  }}>♦</div>
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
