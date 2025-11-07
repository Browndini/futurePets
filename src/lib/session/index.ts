import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from './config';
import { SessionData } from '@/types';

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return null;
  }
  return {
    userId: session.userId,
    username: session.username,
  };
}
