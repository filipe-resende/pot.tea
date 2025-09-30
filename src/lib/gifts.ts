import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Gift {
  id?: string;
  name: string;
  category: string;
  givenBy?: string;
  givenAt?: Timestamp | { seconds: number; nanoseconds: number };
  createdAt: Timestamp | { seconds: number; nanoseconds: number };
}

// Adicionar um presente como dado
export async function markGiftAsGiven(giftName: string, category: string, givenBy?: string) {
  try {
    const giftData: Omit<Gift, 'id'> = {
      name: giftName,
      category: category,
      givenBy: givenBy || 'Anônimo',
      givenAt: Timestamp.now(),
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'gifts'), giftData);
    console.log('Presente marcado como dado com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao marcar presente como dado:', error);
    throw error;
  }
}

// Buscar todos os presentes já dados
export async function getGivenGifts(): Promise<Gift[]> {
  try {
    const q = query(collection(db, 'gifts'), orderBy('givenAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const gifts: Gift[] = [];
    querySnapshot.forEach((doc) => {
      gifts.push({
        id: doc.id,
        ...doc.data()
      } as Gift);
    });
    
    return gifts;
  } catch (error) {
    console.error('Erro ao buscar presentes dados:', error);
    throw error;
  }
}

// Verificar se um presente específico já foi dado
export async function isGiftAlreadyGiven(giftName: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'gifts'), 
      where('name', '==', giftName)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar se presente já foi dado:', error);
    return false;
  }
}

// Remover um presente da lista de dados (caso necessário)
export async function removeGiftFromGiven(giftId: string) {
  try {
    await deleteDoc(doc(db, 'gifts', giftId));
    console.log('Presente removido da lista de dados');
  } catch (error) {
    console.error('Erro ao remover presente da lista:', error);
    throw error;
  }
}
