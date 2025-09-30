import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Guest {
  id?: string;
  name: string;
  status: 'confirmed' | 'declined';
  confirmedAt: Timestamp;
}

// Salvar confirmação de presença
export async function saveGuestConfirmation(name: string, status: 'confirmed' | 'declined') {
  try {
    const guestData: Omit<Guest, 'id'> = {
      name: name.trim(),
      status,
      confirmedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'guests'), guestData);
    console.log('Confirmação salva com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar confirmação:', error);
    throw error;
  }
}

// Buscar todos os convidados confirmados
export async function getConfirmedGuests(): Promise<Guest[]> {
  try {
    const q = query(
      collection(db, 'guests'), 
      orderBy('confirmedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const guests: Guest[] = [];
    querySnapshot.forEach((doc) => {
      guests.push({
        id: doc.id,
        ...doc.data()
      } as Guest);
    });
    
    return guests;
  } catch (error) {
    console.error('Erro ao buscar convidados:', error);
    throw error;
  }
}

// Buscar apenas convidados que confirmaram presença
export async function getAttendingGuests(): Promise<Guest[]> {
  try {
    const allGuests = await getConfirmedGuests();
    return allGuests.filter(guest => guest.status === 'confirmed');
  } catch (error) {
    console.error('Erro ao buscar convidados confirmados:', error);
    throw error;
  }
}
