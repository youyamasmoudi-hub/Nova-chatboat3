                    {msg.role === "assistant" && (
                      <div style={{
                        largeur : "28px", hauteur : "28px", rayon de bordure : "50%",
                        arrière-plan : "dégradé linéaire (135°, #6366f1, #8b5cf6)",
                        affichage : « flex », alignement des éléments : « centre », justification du contenu : « centre »,
                        fontSize: "12px", marginRight: "10px", flexShrink: 0, marginTop: "2px",
                      }}>âœ¦</div>
                    )}
                    <div style={{
                      maxWidth: "75%",
                      marge intérieure : "12px 16px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      arrière-plan : msg.role === "utilisateur"
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "rgba(255,255,255,0.06)",
                      couleur : "#e2e8f0",
                      taille de police : "14px",
                      hauteur de ligne : "1,6",
                      border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                      whiteSpace : « pré-emballage »,
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chargement && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      largeur : "28px", hauteur : "28px", rayon de bordure : "50%",
                      arrière-plan : "dégradé linéaire (135°, #6366f1, #8b5cf6)",
                      affichage : « flex », alignement des éléments : « centre », justification du contenu : « centre », taille de police : « 12px »,
                    }}>âœ¦</div>
                    <div style={{
                      marge intérieure : "12px 16px",
                      arrière-plan : "rgba(255,255,255,0.06)",
                      borderRadius: "16px 16px 16px 4px",
                      bordure : "1px solide rgba(255,255,255,0.08)",
                      affichage : « flex », écart : « 6px », alignement des éléments : « centre »,
                    }}>
                      {[0, 1, 2].map(j => (
                        <div key={j} style={{
                          largeur : "6px", hauteur : "6px", rayon de bordure : "50%",
                          arrière-plan : « #6366f1 »,
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

          {/* Barre de saisie */}
          {commencé && (
            <div style={{
              marge intérieure : "16px 20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              affichage : « flex », écart : « 12px », alignement des éléments : « flex-end »,
              arrière-plan : "rgba(0,0,0,0.2)",
            }}>
              <zone de texte
                ref={inputRef}
                valeur={entrée}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.placeholder}
                lignes={1}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  bordure : "1px solide rgba(255,255,255,0.1)",
                  borderRadius: "10px", padding: "12px 16px",
                  couleur : « #e2e8f0 », taille de police : « 14px »,
                  fontFamily: "Georgia, serif", lineHeight: "1.5",
                  redimensionnement : « aucun », contour : « aucun »,
                  transition: "border-color 0.2s",
                  hauteur maximale : "120px",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              < bouton
                onClick={envoyerMessage}
                désactivé={chargement || !input.trim()}
                style={{
                  arrière-plan : input.trim() && !loading
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                  bordure : « aucune »,
                  couleur : input.trim() && !loading ? "#fff" : "#4a5568",
                  largeur : "44px", hauteur : "44px", rayon de bordure : "10px",
                  curseur : input.trim() && !loading ? "pointeur" : "non autorisé",
                  affichage : « flex », alignement des éléments : « centre », justification du contenu : « centre »,
                  fontSize: "18px", transition: "all 0.2s", flexShrink: 0,
                  boxShadow: input.trim() && !loading ? "0 0 20px rgba(99,102,241,0.4)" : "none",
                }}
              >
                un†'
              </button>
            </div>
          )}
        </div>

        <div style={{
          textAlign: "center", marginTop: "16px",
          Taille de police : « 11 px », couleur : « #334155 », famille de polices : « monospace », espacement des lettres : « 2 px »,
        }}>
          PROPULSÉ PAR CLAUDE · ANTHROPIC
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.6); transform: scale(1.05); }
        }
        @keyframes rebondir {
          0%, 100% { transform: translateY(0); opacité: 0.4; }
          50% { transform: translateY(-4px); opacité: 1; }
        }
        @keyframes fadeIn {
          de { opacité: 0; transformation: translateY(8px); }
          à { opacité: 1; transformation: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { largeur: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
