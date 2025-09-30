"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { markGiftAsGiven, getGivenGifts, isGiftAlreadyGiven, Gift } from "@/lib/gifts";
import { useUserName } from "@/lib/useUserName";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default function Presentes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productToConfirm, setProductToConfirm] = useState<string>("");
  const [givenGifts, setGivenGifts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [categoryToConfirm, setCategoryToConfirm] = useState<string>("");
  const { userName } = useUserName();

  const categories = [
    { id: "cozinha", name: "Cozinha" },
    { id: "quarto", name: "Quarto" },
    { id: "lavanderia", name: "Lavanderia" }
  ];

  const produtos = {
    cozinha: [
      { nome: "Garrafa Térmica", foto: "/img/garrafa-termica.jpg" },
      { nome: "Faqueiro", foto: "/img/faqueiro.jpg" },
      { nome: "Aparelho de Jantar", foto: "/img/aparelho-jantar.jpg" },
      { nome: "Panela de Pressão", foto: "/img/panela-pressão.jpg" },
      { nome: "Jogo Panela", foto: "/img/jogo-panela.jpg" },
      { nome: "Kit Frigideira", foto: "/img/kit-frigideira-anteaderente.jpg" },
      { nome: "Cooktop", foto: "/img/cooktop.jpg" },
      { nome: "Air Fryer", foto: "/img/air-fryer.jpg" },
      { nome: "Chaleira Elétrica", foto: "/img/chaleira-eletrica.jpg" },
      { nome: "Mixer", foto: "/img/mixer.jpg" },
      { nome: "Jogo de Facas", foto: "/img/jogo-facas.jpg" },
      { nome: "Forno Elétrico", foto: "/img/kit-Bowl-Inox .jpg" },
      { nome: "Sanduicheira", foto: "/img/sanduicheira.jpg" },
      { nome: "Liquidificador", foto: "/img/liquidificador.jpg" },
      { nome: "Frigobar", foto: "/img/frigobar.png" },
      { nome: "Lixeira", foto: "/img/lixeira-inox.jpg" },
      { nome: "Lixeira", foto: "/img/lixeira-inox.jpg" },
      { nome: "Kit Cumbucas de Porcelana", foto: "/img/kit-cumbucas-ceramica.jpg" },
      { nome: "Jogo Assadeiras de Vidro com Tampa", foto: "/img/kit-assadeiras-vidro-com tampa.jpg" }
    ],
    quarto: [
      { nome: "Edredon de Casal", foto: "/img/edredom-casal.jpg" },
      { nome: "Ferro de Passar", foto: "/img/ferro-passar.jpg" },
      { nome: "Persiana Romana Blackout Branca", foto: "/img/cortina-rolo blackout-branca.jpg" }
    ],
    lavanderia: [
      { nome: "Aspirador de Pó", foto: "/img/aspirador.jpg" },
      { nome: "Varal de Chão", foto: "/img/varal-chão.jpg" },
      { nome: "Escada", foto: "/img/escada.jpg" },
      { nome: "Cesto de Roupa", foto: "/img/cesto-roupa.jpg" },
      { nome: "Persiana Romana Translúcida Branca", foto: "/img/cortina-rolo blackout-branca.jpg" },
      { nome: "Passadeira de Roupas a Vapor", foto: "/img/ferro-passar.jpg" },
      { nome: "Mop", foto: "/img/mop.jpg" }
    ]
  };

  // Carregar presentes já dados ao montar o componente
  useEffect(() => {
    loadGivenGifts();
  }, []);

  const loadGivenGifts = async () => {
    try {
      const gifts = await getGivenGifts();
      const giftNames = new Set(gifts.map(gift => gift.name));
      setGivenGifts(giftNames);
    } catch (error) {
      console.error('Erro ao carregar presentes dados:', error);
    }
  };


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowDropdown(false);
  };


  const handleGiveGift = (productName: string, category: string) => {
    if (givenGifts.has(productName)) {
      alert("Este presente já foi dado por alguém!");
      return;
    }
    setProductToConfirm(productName);
    setCategoryToConfirm(category);
    setShowModal(true);
  };

  const confirmGift = async () => {
    if (!productToConfirm || !categoryToConfirm) return;
    
    setLoading(true);
    try {
      // Usar o nome salvo ou "Anônimo" como fallback
      const giverName = userName || "Anônimo";
      
      await markGiftAsGiven(productToConfirm, categoryToConfirm, giverName);
      
      // Atualizar a lista local de presentes dados
      setGivenGifts(prev => new Set([...prev, productToConfirm]));
      
      alert(`Obrigado, ${giverName}! Você confirmou que vai dar "${productToConfirm}" de presente!\n\nSua escolha foi registrada!`);
      setShowModal(false);
      setProductToConfirm("");
      setCategoryToConfirm("");
    } catch (error) {
      console.error('Erro ao confirmar presente:', error);
      alert('Erro ao registrar o presente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const cancelGift = () => {
    setShowModal(false);
    setProductToConfirm("");
    setCategoryToConfirm("");
  };

  return (
    <div className="min-vh-100 d-flex flex-column py-4" style={{
      background: 'linear-gradient(135deg, #faf8f3 0%, #f7f4ed 50%, #f3f0e7 100%)',
      position: 'relative'
    }}>
      <main className="container flex-grow-1 d-flex flex-column">
        <div className="row justify-content-center flex-grow-1">
          <div className="col-12 col-md-10 col-lg-8 d-flex flex-column">
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
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
              marginBottom: '20px',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <section className={`text-center p-4 p-sm-5 ${cormorant.className} flex-grow-1 d-flex flex-column`}>
              <h1 className="mb-4" style={{ lineHeight: 1.2 }}>
                Lista de Presentes
              </h1>
              
              <div className="mx-auto measure" style={{ fontSize: "clamp(14px, 1.4vw, 18px)", lineHeight: 1.6 }}>
                <p className="mb-4">
                  Aqui estão algumas sugestões de presentes para nossa casa nova:
                </p>
              </div>

              <div className="mb-4">
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    type="button" 
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Selecione uma categoria"}
                    {showDropdown && (
                      <div className="dropdown-menu show" style={{ 
                        position: "absolute", 
                        top: "100%", 
                        left: "0", 
                        zIndex: 1000,
                        width: "100%",
                        minWidth: "100%"
                      }}>
                        {categories.map((category) => (
                          <div key={category.id}>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleCategorySelect(category.id)}
                            >
                              {category.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                {selectedCategory ? (
                  produtos[selectedCategory as keyof typeof produtos]?.map((produto, index) => (
                    <div key={index}>
                      <div className="card mb-3">
                        <div className="card-body text-center">
                          <h5 className="card-title">{produto.nome}</h5>

                          <div className="mb-3" style={{ 
                            height: "200px", 
                            backgroundColor: "#ffffff", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "1px solid #e9ecef",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                          }}>
                            <Image
                              src={produto.foto}
                              alt={produto.nome}
                              width={300}
                              height={200}
                              style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%"
                              }}
                            />
                          </div>
                          <button 
                            className={`btn ${givenGifts.has(produto.nome) ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleGiveGift(produto.nome, selectedCategory)}
                            disabled={givenGifts.has(produto.nome) || loading}
                            style={{
                              fontSize: "clamp(12px, 2vw, 14px)",
                              fontWeight: "500",
                              borderColor: givenGifts.has(produto.nome) ? "#28a745" : "#a82a52",
                              color: givenGifts.has(produto.nome) ? "white" : "#a82a52",
                              backgroundColor: givenGifts.has(produto.nome) ? "#28a745" : "transparent",
                              borderRadius: "6px",
                              padding: "clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px)",
                              transition: "all 0.3s ease",
                              opacity: givenGifts.has(produto.nome) ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                              if (!givenGifts.has(produto.nome) && !loading) {
                                e.currentTarget.style.backgroundColor = "#a82a52";
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 3px 10px rgba(168, 42, 82, 0.2)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!givenGifts.has(produto.nome) && !loading) {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#a82a52";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                              }
                            }}
                          >
                            {givenGifts.has(produto.nome) ? "✓ Já foi dado!" : "Presentear!"}
                          </button>
                        </div>
                      </div>
                      {index < produtos[selectedCategory as keyof typeof produtos].length - 1 && (
                        <hr className="my-3" />
                      )}
                    </div>
                  ))
                ) : (
                  // Mostra todos os produtos de todas as categorias
                  Object.entries(produtos).map(([categoriaId, produtosCategoria]) => (
                    <div key={categoriaId}>
                      <h4 className="mb-3 mt-4" style={{ color: "#523d47", textTransform: "capitalize" }}>
                        {categories.find(c => c.id === categoriaId)?.name}
                      </h4>
                      {produtosCategoria.map((produto, index) => (
                        <div key={index}>
                           <div className="card mb-3">
                             <div className="card-body text-center">
                             <h5 className="card-title">{produto.nome}</h5>

                               <div className="mb-3" style={{ 
                                 height: "200px", 
                                 backgroundColor: "#ffffff", 
                                 display: "flex", 
                                 alignItems: "center", 
                                 justifyContent: "center", 
                                 borderRadius: "12px",
                                 overflow: "hidden",
                                 border: "1px solid #e9ecef",
                                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                               }}>
                                 <Image
                                   src={produto.foto}
                                   alt={produto.nome}
                                   width={300}
                                   height={200}
                                   style={{
                                     objectFit: "contain",
                                     width: "100%",
                                     height: "100%"
                                   }}
                                 />
                               </div>
                               <button 
                                 className={`btn ${givenGifts.has(produto.nome) ? 'btn-success' : 'btn-outline-primary'}`}
                                 onClick={() => handleGiveGift(produto.nome, categoriaId)}
                                 disabled={givenGifts.has(produto.nome) || loading}
                                 style={{
                                   fontSize: "clamp(12px, 2vw, 14px)",
                                   fontWeight: "500",
                                   borderColor: givenGifts.has(produto.nome) ? "#28a745" : "#a82a52",
                                   color: givenGifts.has(produto.nome) ? "white" : "#a82a52",
                                   backgroundColor: givenGifts.has(produto.nome) ? "#28a745" : "transparent",
                                   borderRadius: "6px",
                                   padding: "clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px)",
                                   transition: "all 0.3s ease",
                                   opacity: givenGifts.has(produto.nome) ? 0.7 : 1
                                 }}
                                 onMouseEnter={(e) => {
                                   if (!givenGifts.has(produto.nome) && !loading) {
                                     e.currentTarget.style.backgroundColor = "#a82a52";
                                     e.currentTarget.style.color = "white";
                                     e.currentTarget.style.transform = "translateY(-1px)";
                                     e.currentTarget.style.boxShadow = "0 3px 10px rgba(168, 42, 82, 0.2)";
                                   }
                                 }}
                                 onMouseLeave={(e) => {
                                   if (!givenGifts.has(produto.nome) && !loading) {
                                     e.currentTarget.style.backgroundColor = "transparent";
                                     e.currentTarget.style.color = "#a82a52";
                                     e.currentTarget.style.transform = "translateY(0)";
                                     e.currentTarget.style.boxShadow = "none";
                                   }
                                 }}
                               >
                                 {givenGifts.has(produto.nome) ? "✓ Já foi dado!" : "Presentear!"}
                               </button>
                             </div>
                           </div>
                          {index < produtosCategoria.length - 1 && (
                            <hr className="my-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-auto d-flex justify-content-center">
                <Link href="/confirmacao" className="btn btn-outline-secondary px-4 py-2">
                  ← Voltar para confirmação
                </Link>
              </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Confirmação com estilos personalizados */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ 
              backgroundColor: '#fdfbf7', 
              border: '2px solid #a82a52',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(168, 42, 82, 0.2)'
            }}>
              <div className="modal-header" style={{ 
                borderBottom: '2px solid #a82a52',
                backgroundColor: 'transparent'
              }}>
                <h5 className={`modal-title ${cormorant.className}`} style={{ 
                  color: '#a82a52',
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>
                  Confirmar Presente
                </h5>
              </div>
              <div className="modal-body" style={{ padding: '2rem' }}>
                <div className="text-center">
                  <p className={`${cormorant.className}`} style={{ 
                    fontSize: '1.1rem',
                    color: '#523d47',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    Que lindo! Você quer dar <strong style={{ color: '#a82a52' }}>&ldquo;{productToConfirm}&rdquo;</strong> de presente para nossa casa nova?
                  </p>
                  
                  <p className={`${cormorant.className}`} style={{ 
                    fontSize: '0.9rem',
                    color: '#523d47',
                    fontStyle: 'italic',
                    marginTop: '1rem',
                    marginBottom: '0'
                  }}>
                    Ficaremos muito felizes com sua escolha!
                  </p>
                </div>
              </div>
              <div className="modal-footer" style={{ 
                borderTop: '2px solid #a82a52',
                backgroundColor: 'transparent',
                padding: '1.5rem 2rem'
              }}>
                <div className="d-flex gap-3 w-100 justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={cancelGift}
                    style={{
                      borderColor: '#523d47',
                      color: '#523d47',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    Talvez depois
                  </button>
                  <button 
                    type="button"
                    className="btn px-4 py-2"
                    onClick={confirmGift}
                    disabled={loading}
                    style={{
                      backgroundColor: loading ? '#6c757d' : '#a82a52',
                      borderColor: loading ? '#6c757d' : '#a82a52',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '600',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? 'Registrando...' : 'Sim, vou dar!'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}