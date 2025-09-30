"use client";

import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { saveGuestConfirmation } from "@/lib/guests";
import { useUserName } from "@/lib/useUserName";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default function Proxima() {
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<"vai" | "nao" | "">("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { saveUserName } = useUserName();

  const handleConfirm = async (choice: "vai" | "nao") => {
    if (!nome.trim()) return;
    
    setLoading(true);
    try {
      // Salvar nome no localStorage para usar na página de presentes
      saveUserName(nome.trim());
      
      await saveGuestConfirmation(nome.trim(), choice === "vai" ? "confirmed" : "declined");
      setStatus(choice);
      setSaved(true);
    } catch (error) {
      console.error('Erro ao salvar confirmação:', error);
      alert('Erro ao salvar confirmação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center py-3 py-md-4" style={{
      background: 'linear-gradient(135deg, #faf8f3 0%, #f7f4ed 50%, #f3f0e7 100%)',
      position: 'relative'
    }}>
      <main className="container px-3 px-md-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8">
            {/* Container da folha com efeito de elevação */}
            <div style={{
              background: '#fdfbf7',
              borderRadius: '16px',
              boxShadow: `
                0 0 0 1px rgba(168, 42, 82, 0.03),
                0 2px 12px rgba(168, 42, 82, 0.05),
                0 4px 24px rgba(82, 61, 71, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.98)
              `,
              position: 'relative',
              overflow: 'hidden',
              marginTop: '20px',
              marginBottom: '20px',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <section className={`text-center p-3 p-md-4 p-lg-5 ${cormorant.className}`}>
              <h1 className="mb-3 mb-md-4" style={{ 
                lineHeight: 1.2,
                fontSize: "clamp(20px, 4vw, 28px)"
              }}>
                Você está convidado para o nosso chá de casa nova!
              </h1>
              <div className="mx-auto measure" style={{ 
                fontSize: "clamp(14px, 2.5vw, 18px)", 
                lineHeight: 1.6,
                maxWidth: "90%"
              }}>
                <p className="mb-3">
                  E nada melhor do que comemorar esse momento com um bom tropeiro mineiro
                  — afinal, tropeiro e casa nova combinam perfeitamente!
                </p>
                <p className="mb-4">
                  Confirme sua presença e venha compartilhar esse dia especial comigo!
                  <br />
                  Você vem?
                </p>
              </div>

              <div className="mx-auto" style={{ maxWidth: "100%", width: "100%" }}>
                <label className="form-label fw-bold mb-2" style={{
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  color: "#523d47"
                }}>
                  Digite seu nome
                </label>
                <div className="input-group mb-3 mb-md-4">
                  <span className="input-group-text" id="addon-nome" style={{
                    fontSize: "clamp(12px, 2vw, 14px)",
                    padding: "clamp(8px, 2vw, 12px)"
                  }}>Nome</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite seu nome"
                    aria-label="Nome"
                    aria-describedby="addon-nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 16px)",
                      padding: "clamp(8px, 2vw, 12px)"
                    }}
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2 gap-md-3 justify-content-center align-items-center">
                  <button
                    type="button"
                    className={`btn ${status === "vai" ? "btn-success" : "btn-outline-success"} w-100 w-sm-auto`}
                    onClick={() => handleConfirm("vai")}
                    disabled={!nome.trim() || loading}
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 16px)",
                      padding: "clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px)",
                      minWidth: "140px",
                      backgroundColor: status === "vai" ? "#a82a52" : "transparent",
                      borderColor: "#a82a52",
                      color: status === "vai" ? "white" : "#a82a52"
                    }}
                  >
                    {loading ? "Salvando..." : "Estarei lá!"}
                  </button>
                  <button
                    type="button"
                    className={`btn ${status === "nao" ? "btn-danger" : "btn-outline-danger"} w-100 w-sm-auto`}
                    onClick={() => handleConfirm("nao")}
                    disabled={!nome.trim() || loading}
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 16px)",
                      padding: "clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px)",
                      minWidth: "140px",
                      backgroundColor: status === "nao" ? "#a82a52" : "transparent",
                      borderColor: "#a82a52",
                      color: status === "nao" ? "white" : "#a82a52"
                    }}
                  >
                    {loading ? "Salvando..." : "Não poderei ir"}
                  </button>
                </div>
                {status && saved && (
                  <p className="mt-3 mb-0" role="status" style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: 1.5
                  }}>
                    {status === "vai"
                      ? `Obrigado, ${nome}! Presença confirmada e salva.`
                      : `Tudo bem, ${nome}. Fica para a próxima!`}
                  </p>
                )}

                <div className="mt-4 mt-md-5">
                  <p 
                    className={`mb-3 ${cormorant.className}`}
                    style={{
                      fontSize: "clamp(12px, 2vw, 14px)",
                      color: "#523d47",
                      fontStyle: "italic",
                      opacity: 0.8
                    }}
                  >
                    A lista de presentes estará disponível aqui mesmo.
                  </p>
                  <Link href="/presentes" style={{
                    fontSize: "clamp(16px, 3vw, 20px)",
                    textDecoration: "underline",
                    textDecorationColor: "#a82a52",
                    textUnderlineOffset: "2px",
                    color: "#a82a52",
                    fontWeight: "600",
                    textDecorationThickness: "2px"
                  }}>
                    Ver sugestões de presentes →
                  </Link>
                </div>
              </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 