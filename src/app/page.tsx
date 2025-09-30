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
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Elementos decorativos de fundo */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(168, 42, 82, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(82, 61, 71, 0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(168, 42, 82, 0.02) 0%, transparent 60%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(82, 61, 71, 0.03) 0%, transparent 60%)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse'
      }}></div>
      
      {/* CSS para animação */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes particle {
            0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(20px) rotate(360deg); opacity: 0; }
          }
          
          .particle {
            animation: particle 8s linear infinite;
          }
        `
      }} />
      
      {/* Partículas flutuantes sutis */}
      <div className="particle" style={{
        position: 'absolute',
        top: '80%',
        left: '20%',
        width: '4px',
        height: '4px',
        background: 'rgba(168, 42, 82, 0.1)',
        borderRadius: '50%',
        animationDelay: '0s'
      }}></div>
      
      <div className="particle" style={{
        position: 'absolute',
        top: '70%',
        right: '25%',
        width: '3px',
        height: '3px',
        background: 'rgba(82, 61, 71, 0.08)',
        borderRadius: '50%',
        animationDelay: '2s'
      }}></div>
      
      <div className="particle" style={{
        position: 'absolute',
        top: '90%',
        left: '60%',
        width: '2px',
        height: '2px',
        background: 'rgba(168, 42, 82, 0.06)',
        borderRadius: '50%',
        animationDelay: '4s'
      }}></div>
      <main className="container px-3 px-md-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8">
            {/* Container da folha com efeito de elevação */}
            <div style={{
              background: 'linear-gradient(145deg, #fdfbf7 0%, #faf8f3 100%)',
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
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default'
            }}>
              {/* Elementos decorativos sutis no container */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(circle, rgba(168, 42, 82, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.6
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle, rgba(82, 61, 71, 0.04) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.5
              }}></div>
              
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                width: '30px',
                height: '30px',
                background: 'radial-gradient(circle, rgba(168, 42, 82, 0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.4
              }}></div>
              
              {/* Linha decorativa sutil */}
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(168, 42, 82, 0.1) 50%, transparent 100%)',
                opacity: 0.3
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(82, 61, 71, 0.08) 50%, transparent 100%)',
                opacity: 0.2
              }}></div>

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
                    boxShadow: `
                      0 8px 32px rgba(168, 42, 82, 0.15),
                      0 4px 16px rgba(82, 61, 71, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    border: '3px solid rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <Image src="/joaodebarro.png" alt="João-de-barro" fill style={{ objectFit: "cover" }} />
                  
                  {/* Overlay sutil para suavizar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }}></div>
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
                
                {/* Coração esquerdo */}
                <div className="col-1 d-flex justify-content-center align-items-center">
                  <span style={{ 
                    fontSize: "clamp(12px, 2vw, 18px)", 
                    color: "#a82a52",
                    fontFamily: "cursive",
                    textShadow: "0 2px 4px rgba(168, 42, 82, 0.3)",
                    transform: "rotate(-5deg)"
                  }}>
                    ♥
                  </span>
                </div>
                
                <div className="col-2">
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
                
                {/* Coração direito */}
                <div className="col-1 d-flex justify-content-center align-items-center">
                  <span style={{ 
                    fontSize: "clamp(12px, 2vw, 18px)", 
                    color: "#a82a52",
                    fontFamily: "cursive",
                    textShadow: "0 2px 4px rgba(168, 42, 82, 0.3)",
                    transform: "rotate(-5deg)"
                  }}>
                    ♥
                  </span>
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
                    OUTUBRO de <br/> <span className={crimson.className} style={{
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
