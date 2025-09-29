"use client";
import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default function Presentes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productToConfirm, setProductToConfirm] = useState<string>("");

  const categories = [
    { id: "cozinha", name: "Cozinha" },
    { id: "sala", name: "Sala" },
    { id: "quarto", name: "Quarto" },
    { id: "banheiro", name: "Banheiro" },
    { id: "lavanderia", name: "Lavanderia" }
  ];

  const produtos = {
    cozinha: [
      { nome: "Garrafa Térmica", foto: "[Foto do produto]" },
      { nome: "Faqueiro", foto: "[Foto do produto]" },
      { nome: "Aparelho de Jantar", foto: "[Foto do produto]" },
      { nome: "Panela de Pressão", foto: "[Foto do produto]" },
      { nome: "Jogo Panela", foto: "[Foto do produto]" },
      { nome: "Frigideira", foto: "[Foto do produto]" },
      { nome: "Cooktop", foto: "[Foto do produto]" },
      { nome: "Air Fryer", foto: "[Foto do produto]" },
      { nome: "Chaleira Elétrica", foto: "[Foto do produto]" },
      { nome: "Mixer", foto: "[Foto do produto]" },
      { nome: "Jogo de Facas", foto: "[Foto do produto]" },
      { nome: "Geladeira", foto: "[Foto do produto]" },
      { nome: "Forno Elétrico", foto: "[Foto do produto]" },
      { nome: "Sanduicheira", foto: "[Foto do produto]" },
      { nome: "Liquidificador", foto: "[Foto do produto]" },
      { nome: "Frigobar", foto: "[Foto do produto]" },
      { nome: "2x Lixeira", foto: "[Foto do produto]" },
      { nome: "2x Faqueiro", foto: "[Foto do produto]" },
      { nome: "Kit Cumbucas de Porcelana", foto: "[Foto do produto]" },
      { nome: "Jogo Assadeiras de Vidro com Tampa", foto: "[Foto do produto]" }
    ],
    sala: [
      { nome: "Mesa de Centro", foto: "[Foto do produto]" }
    ],
    quarto: [
      { nome: "Edredon", foto: "[Foto do produto]" },
      { nome: "Ferro de Passar", foto: "[Foto do produto]" }
    ],
    banheiro: [
      { nome: "Cesto de Roupa", foto: "[Foto do produto]" },
      { nome: "Kit de Banheiro", foto: "[Foto do produto]" }
    ],
    lavanderia: [
      { nome: "Aspirador de Pó", foto: "[Foto do produto]" },
      { nome: "Varal de Chão", foto: "[Foto do produto]" },
      { nome: "Máquina de Lavar", foto: "[Foto do produto]" },
      { nome: "Escada", foto: "[Foto do produto]" },
      { nome: "Mop", foto: "[Foto do produto]" }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowDropdown(false);
  };


  const handleGiveGift = (productName: string) => {
    setProductToConfirm(productName);
    setShowModal(true);
  };

  const confirmGift = () => {
    alert(`Obrigado! Você confirmou que vai dar "${productToConfirm}" de presente!\n\nSua escolha foi registrada!`);
    setShowModal(false);
    setProductToConfirm("");
  };

  const cancelGift = () => {
    setShowModal(false);
    setProductToConfirm("");
  };

  return (
    <div className="min-vh-100 d-flex flex-column py-4">
      <main className="container flex-grow-1 d-flex flex-column">
        <div className="row justify-content-center flex-grow-1">
          <div className="col-12 col-md-10 col-lg-8 d-flex flex-column">
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
                  </button>
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
                </div>
              </div>

              <div className="mb-4">
                {selectedCategory ? (
                  produtos[selectedCategory as keyof typeof produtos]?.map((produto, index) => (
                    <div key={index}>
                      <div className="card mb-3">
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ 
                            height: "200px", 
                            backgroundColor: "#f8f9fa", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyItems: "center", 
                            justifyContent: "center", 
                            borderRadius: "8px" ,
                          }}>
                            <span style={{ color: "#6c757d" }}>{produto.foto}</span>
                          </div>
                          <h5 className="card-title">{produto.nome}</h5>
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleGiveGift(produto.nome)}
                            style={{
                              backgroundColor: '#a82a52',
                              borderColor: '#a82a52',
                              borderRadius: '8px',
                              fontWeight: '500'
                            }}
                          >
                            Presentear!
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
                                 backgroundColor: "#f8f9fa", 
                                 display: "flex", 
                                 alignItems: "center", 
                                 justifyItems: "center", 
                                 justifyContent: "center", 
                                 borderRadius: "8px" ,
                               }}>
                                 <span style={{ color: "#6c757d" }}>{produto.foto}</span>
                               </div>
                               <button 
                                 className="btn btn-success btn-sm"
                                 onClick={() => handleGiveGift(produto.nome)}
                                 style={{
                                   backgroundColor: '#a82a52',
                                   borderColor: '#a82a52',
                                   borderRadius: '8px',
                                   fontWeight: '500'
                                 }}
                               >
                                 Presentear!
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
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem' 
                  }}>
                    🏠✨
                  </div>
                  <p className={`${cormorant.className}`} style={{ 
                    fontSize: '1.1rem',
                    color: '#523d47',
                    lineHeight: '1.6',
                    marginBottom: '0'
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
                    Ficaremos muito felizes com sua escolha! 💕
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
                    style={{
                      backgroundColor: '#a82a52',
                      borderColor: '#a82a52',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '600'
                    }}
                  >
                     Sim, vou dar!
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