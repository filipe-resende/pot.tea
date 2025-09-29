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
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="text-center p-4 p-sm-5 bg-transparent">
              <h1
                className={`${ebGaramond.className} mb-5 text-uppercase`}
                style={{
                  lineHeight: 1.1,
                  color: "#523d47",
                  letterSpacing: "0.12em",
                  fontSize: "clamp(18px, 2.4vw, 28px)",
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
                  fontSize: "clamp(48px, 7vw, 92px)",
                }}
              >
                Casa
              </h1>
              <h1
                className={`${greatVibes.className} mb-4`}
                style={{
                  lineHeight: 1.05,
                  color: "#a82a52",
                  letterSpacing: "-0.01em",
                  fontSize: "clamp(48px, 7vw, 92px)",
                }}
              >
                Nova
              </h1>

              <div className="my-4">
                <div
                  className="mx-auto"
                  style={{
                    width: "clamp(140px, 30vw, 220px)",
                    aspectRatio: "1 / 1",
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image src="/joaodebarro.png" alt="João-de-barro" fill style={{ objectFit: "cover" }} />
                </div>
              </div>

              <div className={`row text-center justify-content-center align-items-end g-2 my-4 ${cormorant.className}`}>
                <div className="col-4">
                  <div
                    className="text-uppercase"
                    style={{
                      fontSize: "clamp(11px, 1.6vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    Sábado as 
                  </div>
                  <span className={crimson.className} style={{
                      fontSize: "clamp(11px, 1.6vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>20h</span>
                </div>
                <div className="col-4">
                  <div
                    className={`fw-semibold ${crimson.className}`}
                    style={{
                      color: "#523d47",
                      fontSize: "clamp(22px, 4.6vw, 40px)",
                      lineHeight: 1,
                      letterSpacing: "0.06em",
                      fontWeight: 700,
                    }}
                  >
                    <span className={crimson.className}>11</span>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="text-uppercase"
                    style={{
                      fontSize: "clamp(11px, 1.6vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    nov de <br/> <span className={crimson.className} style={{
                      fontSize: "clamp(11px, 1.6vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>2025</span>
                  </div>
                </div>
              </div>

              <div className="my-4" aria-hidden>
                <hr className="border-2 opacity-100" />
              </div>

              <p
                className={`mb-4 ${cormorant.className}`}
                style={{
                  fontSize: "clamp(12px, 1.4vw, 16px)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.35,
                  fontWeight: 600,
                }}
              >
                Rua: Ipê Amarelo, <span className={crimson.className} style={{
                      fontSize: "clamp(11px, 1.6vw, 14px)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}>157</span> - Recanto Verde - Ibirité - MG
              </p>

              <div className="d-flex justify-content-center">
                <Link href="/confirmacao" className="btn btn-outline-secondary px-4 py-2">
                  Confime sua presença →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
