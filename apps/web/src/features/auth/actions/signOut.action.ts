import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  cookies().delete('pb_auth');
  redirect('/');
}
