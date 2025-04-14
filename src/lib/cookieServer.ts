import { cookies } from 'next/headers';

export function getCookieServer() {
  const cookieStore = cookies(); 
  const token = cookieStore.get('session')?.value;

  return token || null;
}
