import Image from "next/image";
import Link from "next/link";
import { Great_Vibes, EB_Garamond } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Crimson_Pro } from "next/font/google";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });
const crimson = Crimson_Pro({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-3 py-md-5" style={{
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
              <div className="text-center p-3 p-md-4 p-lg-5">
              <p
                className={`${cormorant.className} mb-2 mb-md-3`}
                style={{
                  fontSize: "clamp(12px, 2.5vw, 18px)",
                  color: "#523d47",
                  letterSpacing: "0.05em",
                  fontWeight: "500"
                }}
              >
                Filipe e Elis convidam...
              </p>
              <h1
                className={`${ebGaramond.className} mb-3 mb-md-5 text-uppercase`}
                style={{
                  lineHeight: 1.1,
                  color: "#523d47",
                  letterSpacing: "0.12em",
                  fontSize: "clamp(16px, 3vw, 28px)",
                }}
              >
                CHÁ DE
              </h1>
              <h1
                className={`${greatVibes.className} mb-1`}
                style={{
                  lineHeight: 1.05,
                  color: "#a82a52",
                  letterSpacing: "-0.01em",
                  fontSize: "clamp(36px, 8vw, 92px)",
                }}
              >
                Casa
              </h1>
              <h1
                className={`${greatVibes.className} mb-3 mb-md-4`}
                style={{
                  lineHeight: 1.05,
                  color: "#a82a52",
                  letterSpacing: "-0.01em",
                  fontSize: "clamp(36px, 8vw, 92px)",
                }}
              >
                Nova
              </h1>

              <div className="my-3 my-md-4">
                <div
                  className="mx-auto"
                  style={{
                    width: "clamp(120px, 25vw, 220px)",
                    aspectRatio: "1 / 1",
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image src="/joaodebarro.png" alt="João-de-barro" fill style={{ objectFit: "cover" }} />
                </div>
              </div>

              <div className={`row text-center justify-content-center align-items-end g-1 g-md-2 my-3 my-md-4 ${cormorant.className}`}>
                <div className="col-4">
                  <div
                    className="text-uppercase"
                    style={{
                      fontSize: "clamp(10px, 2vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    Sábado as 
                  </div>
                  <span className={crimson.className} style={{
                      fontSize: "clamp(10px, 2vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>19h</span>
                </div>
                <div className="col-4">
                  <div
                    className={`fw-semibold ${crimson.className}`}
                    style={{
                      color: "#523d47",
                      fontSize: "clamp(18px, 5vw, 40px)",
                      lineHeight: 1,
                      letterSpacing: "0.06em",
                      fontWeight: 700,
                    }}
                  >
                    <span className={crimson.className} style={{
                  color: "#523d47",
                }}>11</span>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="text-uppercase"
                    style={{
                      fontSize: "clamp(10px, 2vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    nov de <br/> <span className={crimson.className} style={{
                      fontSize: "clamp(10px, 2vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>2025</span>
                  </div>
                </div>
              </div>

              <div className="my-3 my-md-4" aria-hidden>
                <hr className="border-2 opacity-100" />
              </div>

              <p
                className={`mb-3 mb-md-4 ${cormorant.className}`}
                style={{
                  fontSize: "clamp(11px, 2vw, 16px)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.35,
                  fontWeight: 600,
                }}
              >
                Rua: Ipê Amarelo, <span className={crimson.className} style={{
                      fontSize: "clamp(10px, 2vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>157</span> - Recanto Verde - Ibirité - MG
              </p>

              <div className="d-flex justify-content-center">
                <Link href="/confirmacao" className="btn btn-outline-secondary px-3 px-md-4 py-2" style={{
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  fontWeight: "500"
                }}>
                  Confime sua presença →
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
