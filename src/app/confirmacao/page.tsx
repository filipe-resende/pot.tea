"use client";

import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default function Proxima() {
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<"vai" | "nao" | "">("");

  const handleConfirm = (choice: "vai" | "nao") => {
    setStatus(choice);
    console.log({ nome, presenca: choice });
  };

  return (
    <div className="min-vh-100 d-flex py-4">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <section className={`text-center p-4 p-sm-5 ${cormorant.className}`}>
              <h1 className="mb-3" style={{ lineHeight: 1.2 }}>
                Você está convidado para o meu Chá de Casa Nova!
              </h1>
              <div className="mx-auto measure" style={{ fontSize: "clamp(14px, 1.4vw, 18px)", lineHeight: 1.6 }}>
                <p className="mb-3">
                  E nada melhor do que comemorar esse momento com um bom tropeiro mineiro
                  — afinal, tropeiro e casa nova combinam perfeitamente!
                </p>
                <p className="mb-3">
                  Vai ser um tempo incrível juntos, cheio de alegria, boas conversas e aquele
                  tempero mineiro que não pode faltar.
                </p>
                <p className="mb-3">
                  A lista de presentes estará disponível aqui mesmo.
                </p>
                <p className="mb-4">
                  Confirme sua presença e venha compartilhar esse dia especial comigo!
                  <br />
                  Você vem?
                </p>
              </div>

              <div className="mx-auto" style={{ maxWidth: 520 }}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="addon-nome">Nome</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite seu nome"
                    aria-label="Nome"
                    aria-describedby="addon-nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    type="button"
                    className={`btn ${status === "vai" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => handleConfirm("vai")}
                    disabled={!nome.trim()}
                  >
                    Vai
                  </button>
                  <button
                    type="button"
                    className={`btn ${status === "nao" ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => handleConfirm("nao")}
                    disabled={!nome.trim()}
                  >
                    Não vai
                  </button>
                </div>
                {status && (
                  <p className="mt-3 mb-0" role="status">
                    {status === "vai"
                      ? `Obrigado, ${nome}! Presença confirmada.`
                      : `Tudo bem, ${nome}. Fica para a próxima!`}
                  </p>
                )}

                <div className="mt-4">
                  <Link href="/presentes" className="link-secondary">
                    Ver sugestões de presentes →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 