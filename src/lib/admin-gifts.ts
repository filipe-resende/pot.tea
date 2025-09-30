import { adminDb } from './firebase-admin';
import { Gift } from './gifts';
import { Timestamp } from 'firebase-admin/firestore';

// Funções administrativas para gerenciar presentes

// Obter todos os presentes dados (versão admin)
export async function getAllGivenGifts(): Promise<Gift[]> {
  try {
    const giftsRef = adminDb.collection('gifts');
    const querySnapshot = await giftsRef.orderBy('givenAt', 'desc').get();
    
    const gifts: Gift[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Convert Firestore Timestamps to serializable format
      const serializedData = {
        ...data,
        givenAt: data.givenAt ? {
          seconds: data.givenAt.seconds,
          nanoseconds: data.givenAt.nanoseconds
        } : null,
        createdAt: data.createdAt ? {
          seconds: data.createdAt.seconds,
          nanoseconds: data.createdAt.nanoseconds
        } : null
      };
      
      gifts.push({
        id: doc.id,
        ...serializedData
      } as Gift);
    });
    
    return gifts;
  } catch (error) {
    console.error('Erro ao buscar todos os presentes dados:', error);
    throw error;
  }
}

// Remover um presente específico da lista de dados
export async function removeGiftFromGiven(giftId: string): Promise<void> {
  try {
    await adminDb.collection('gifts').doc(giftId).delete();
    console.log(`Presente ${giftId} removido da lista de dados`);
  } catch (error) {
    console.error('Erro ao remover presente da lista:', error);
    throw error;
  }
}

// Limpar todos os presentes dados (função de reset)
export async function clearAllGivenGifts(): Promise<void> {
  try {
    const giftsRef = adminDb.collection('gifts');
    const querySnapshot = await giftsRef.get();
    
    const batch = adminDb.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Todos os presentes foram removidos da lista de dados');
  } catch (error) {
    console.error('Erro ao limpar todos os presentes:', error);
    throw error;
  }
}

// Obter estatísticas dos presentes
export async function getGiftStatistics(): Promise<{
  totalGiven: number;
  byCategory: Record<string, number>;
  recentGifts: Gift[];
}> {
  try {
    const gifts = await getAllGivenGifts();
    
    const byCategory: Record<string, number> = {};
    gifts.forEach(gift => {
      byCategory[gift.category] = (byCategory[gift.category] || 0) + 1;
    });
    
    return {
      totalGiven: gifts.length,
      byCategory,
      recentGifts: gifts.slice(0, 5) // Últimos 5 presentes
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas dos presentes:', error);
    throw error;
  }
}

// Adicionar presente manualmente (função admin)
export async function addGiftManually(
  name: string, 
  category: string, 
  givenBy?: string
): Promise<string> {
  try {
    const giftData = {
      name,
      category,
      givenBy: givenBy || 'Admin',
      givenAt: Timestamp.now(),
      createdAt: Timestamp.now()
    };

    const docRef = await adminDb.collection('gifts').add(giftData);
    console.log(`Presente ${name} adicionado manualmente com ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar presente manualmente:', error);
    throw error;
  }
}

// Limpar todos os convidados (função admin)
export async function clearAllGuests(): Promise<void> {
  try {
    const guestsRef = adminDb.collection('guests');
    const querySnapshot = await guestsRef.get();
    
    const batch = adminDb.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Todos os convidados foram removidos');
  } catch (error) {
    console.error('Erro ao limpar todos os convidados:', error);
    throw error;
  }
}
