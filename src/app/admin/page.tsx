"use client";
import { useState, useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { Gift } from "@/lib/gifts";
import { Guest, getAttendingGuests, getConfirmedGuests } from "@/lib/guests";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gifts' | 'guests'>('gifts');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/gifts');
      const result = await response.json();
      
      if (result.success) {
        setGifts(result.data.gifts);
        setStatistics(result.data.statistics);
      } else {
        throw new Error(result.error);
      }
      
      // Carregar lista de convidados
      const guestsData = await getConfirmedGuests();
      setGuests(guestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados administrativos');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGift = async (giftId: string, giftName: string) => {
    if (!confirm(`Tem certeza que deseja remover "${giftName}" da lista de dados?`)) {
      return;
    }

    try {
      setActionLoading(giftId);
      const response = await fetch(`/api/admin/gifts?giftId=${giftId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        setGifts(gifts.filter(gift => gift.id !== giftId));
        alert('Presente removido com sucesso!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao remover presente:', error);
      alert('Erro ao remover presente');
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Tem certeza que deseja limpar TODOS os presentes dados? Esta ação não pode ser desfeita!')) {
      return;
    }

    try {
      setActionLoading('clear-all');
      const response = await fetch('/api/admin/gifts?action=clear-all', {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        setGifts([]);
        setStatistics({ totalGiven: 0, byCategory: {}, recentGifts: [] });
        alert('Todos os presentes foram removidos!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao limpar presentes:', error);
      alert('Erro ao limpar presentes');
    } finally {
      setActionLoading(null);
    }
  };

  const getGuestStatistics = () => {
    const confirmed = guests.filter(guest => guest.status === 'confirmed');
    const declined = guests.filter(guest => guest.status === 'declined');
    
    return {
      total: guests.length,
      confirmed: confirmed.length,
      declined: declined.length
    };
  };

  const handleClearGuests = async () => {
    if (!confirm('Tem certeza que deseja limpar TODA a lista de convidados? Esta ação não pode ser desfeita!')) {
      return;
    }

    try {
      setActionLoading('clear-guests');
      const response = await fetch('/api/admin/gifts?action=clear-guests', {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        setGuests([]);
        alert('Todos os convidados foram removidos!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao limpar convidados:', error);
      alert('Erro ao limpar convidados');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Carregando dados administrativos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-4" style={{
      background: 'linear-gradient(135deg, #faf8f3 0%, #f7f4ed 50%, #f3f0e7 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h1 className={`h3 mb-0 ${cormorant.className}`}>
                  🎁 Painel Administrativo
                </h1>
              </div>
              
              {/* Abas */}
              <div className="card-header bg-light border-bottom">
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'gifts' ? 'active' : ''}`}
                      onClick={() => setActiveTab('gifts')}
                      style={{
                        color: activeTab === 'gifts' ? '#a82a52' : '#6c757d',
                        borderColor: activeTab === 'gifts' ? '#a82a52' : 'transparent',
                        fontWeight: activeTab === 'gifts' ? '600' : '400'
                      }}
                    >
                      🎁 Presentes
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'guests' ? 'active' : ''}`}
                      onClick={() => setActiveTab('guests')}
                      style={{
                        color: activeTab === 'guests' ? '#a82a52' : '#6c757d',
                        borderColor: activeTab === 'guests' ? '#a82a52' : 'transparent',
                        fontWeight: activeTab === 'guests' ? '600' : '400'
                      }}
                    >
                      👥 Convidados
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="card-body">
                {/* Conteúdo da aba de Presentes */}
                {activeTab === 'gifts' && (
                  <>
                    {/* Estatísticas */}
                    {statistics && (
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-success text-white">
                        <div className="card-body text-center">
                          <h5 className="card-title">Total de Presentes</h5>
                          <h2 className="mb-0">{statistics.totalGiven}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">Por Categoria</h6>
                          <div className="row">
                            {Object.entries(statistics.byCategory).map(([category, count]) => (
                              <div key={category} className="col-6 col-md-3">
                                <div className="text-center">
                                  <strong>{count as number}</strong>
                                  <br />
                                  <small className="text-muted text-capitalize">{category}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="mb-4">
                  <button 
                    className="btn btn-outline-primary me-2"
                    onClick={loadData}
                  >
                    🔄 Atualizar
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={handleClearAll}
                    disabled={actionLoading === 'clear-all' || gifts.length === 0}
                  >
                    {actionLoading === 'clear-all' ? '⏳ Limpando...' : '🗑️ Limpar Todos'}
                  </button>
                </div>

                {/* Lista de Presentes */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Presente</th>
                        <th>Categoria</th>
                        <th>Dado por</th>
                        <th>Data</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gifts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center text-muted py-4">
                            Nenhum presente foi dado ainda
                          </td>
                        </tr>
                      ) : (
                        gifts.map((gift) => (
                          <tr key={gift.id}>
                            <td>
                              <strong>{gift.name}</strong>
                            </td>
                            <td>
                              <span className="badge bg-secondary text-capitalize">
                                {gift.category}
                              </span>
                            </td>
                            <td>{gift.givenBy || 'Anônimo'}</td>
                            <td>
                              {gift.givenAt ? 
                                (() => {
                                  // Handle both Firestore Timestamp objects and serialized timestamps
                                  let date: Date;
                                  if (typeof gift.givenAt === 'object' && 'toDate' in gift.givenAt) {
                                    // Firestore Timestamp object
                                    date = gift.givenAt.toDate();
                                  } else if (typeof gift.givenAt === 'object' && 'seconds' in gift.givenAt) {
                                    // Serialized timestamp from API
                                    date = new Date(gift.givenAt.seconds * 1000);
                                  } else {
                                    // Fallback for other date formats
                                    date = new Date(gift.givenAt as any);
                                  }
                                  return date.toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  });
                                })() : 
                                'N/A'
                              }
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveGift(gift.id!, gift.name)}
                                disabled={actionLoading === gift.id}
                              >
                                {actionLoading === gift.id ? '⏳' : '🗑️'} Remover
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                    {/* Botão de voltar */}
                    <div className="mt-4 text-center">
                      <a href="/presentes" className="btn btn-outline-secondary">
                        ← Voltar para Lista de Presentes
                      </a>
                    </div>
                  </>
                )}

                {/* Conteúdo da aba de Convidados */}
                {activeTab === 'guests' && (
                  <>
                    {/* Estatísticas dos Convidados */}
                    <div className="row mb-4">
                      <div className="col-md-4">
                        <div className="card bg-info text-white">
                          <div className="card-body text-center">
                            <h5 className="card-title">Total de Convidados</h5>
                            <h2 className="mb-0">{getGuestStatistics().total}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-success text-white">
                          <div className="card-body text-center">
                            <h5 className="card-title">Confirmaram</h5>
                            <h2 className="mb-0">{getGuestStatistics().confirmed}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-warning text-white">
                          <div className="card-body text-center">
                            <h5 className="card-title">Não Podem Ir</h5>
                            <h2 className="mb-0">{getGuestStatistics().declined}</h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="mb-4">
                      <button 
                        className="btn btn-outline-primary me-2"
                        onClick={loadData}
                      >
                        🔄 Atualizar
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={handleClearGuests}
                        disabled={actionLoading === 'clear-guests' || guests.length === 0}
                      >
                        {actionLoading === 'clear-guests' ? '⏳ Limpando...' : '🗑️ Limpar Convidados'}
                      </button>
                    </div>

                    {/* Lista de Convidados */}
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Data de Confirmação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guests.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="text-center text-muted py-4">
                                Nenhum convidado confirmou presença ainda
                              </td>
                            </tr>
                          ) : (
                            guests.map((guest) => (
                              <tr key={guest.id}>
                                <td>
                                  <strong>{guest.name}</strong>
                                </td>
                                <td>
                                  <span className={`badge ${guest.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}>
                                    {guest.status === 'confirmed' ? '✓ Confirmado' : '✗ Não pode ir'}
                                  </span>
                                </td>
                                <td>
                                  {guest.confirmedAt ? 
                                    (() => {
                                      // Handle both Firestore Timestamp objects and serialized timestamps
                                      let date: Date;
                                      if (typeof guest.confirmedAt === 'object' && 'toDate' in guest.confirmedAt) {
                                        // Firestore Timestamp object
                                        date = guest.confirmedAt.toDate();
                                      } else if (typeof guest.confirmedAt === 'object' && 'seconds' in guest.confirmedAt) {
                                        // Serialized timestamp from API
                                        date = new Date((guest.confirmedAt as any).seconds * 1000);
                                      } else {
                                        // Fallback for other date formats
                                        date = new Date(guest.confirmedAt as any);
                                      }
                                      return date.toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      });
                                    })() : 
                                    'N/A'
                                  }
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Botão de voltar */}
                    <div className="mt-4 text-center">
                      <a href="/presentes" className="btn btn-outline-secondary">
                        ← Voltar para Lista de Presentes
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
