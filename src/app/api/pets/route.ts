import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const pets = db.getUserPets(session.userId);
    return NextResponse.json({ success: true, data: pets });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { name, species, color } = await request.json();

    if (!name || !species || !color) {
      return NextResponse.json(
        { success: false, error: 'Name, species, and color are required' },
        { status: 400 }
      );
    }

    const pet = db.createPet(session.userId, name, species, color);
    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
