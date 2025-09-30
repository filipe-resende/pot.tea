import { NextRequest, NextResponse } from 'next/server';
import { getAllGivenGifts, removeGiftFromGiven, clearAllGivenGifts, getGiftStatistics, addGiftManually, clearAllGuests } from '@/lib/admin-gifts';

export async function GET() {
  try {
    const gifts = await getAllGivenGifts();
    const statistics = await getGiftStatistics();
    
    return NextResponse.json({
      success: true,
      data: {
        gifts,
        statistics
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados administrativos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const giftId = searchParams.get('giftId');
    const action = searchParams.get('action');

    if (action === 'clear-all') {
      await clearAllGivenGifts();
      return NextResponse.json({
        success: true,
        message: 'Todos os presentes foram removidos'
      });
    }

    if (action === 'clear-guests') {
      await clearAllGuests();
      return NextResponse.json({
        success: true,
        message: 'Todos os convidados foram removidos'
      });
    }

    if (giftId) {
      await removeGiftFromGiven(giftId);
      return NextResponse.json({
        success: true,
        message: 'Presente removido com sucesso'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Parâmetros inválidos' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro ao executar ação administrativa:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao executar ação' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, givenBy } = body;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: 'Nome e categoria são obrigatórios' },
        { status: 400 }
      );
    }

    const giftId = await addGiftManually(name, category, givenBy);
    
    return NextResponse.json({
      success: true,
      message: 'Presente adicionado com sucesso',
      data: { giftId }
    });
  } catch (error) {
    console.error('Erro ao adicionar presente:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao adicionar presente' },
      { status: 500 }
    );
  }
}
