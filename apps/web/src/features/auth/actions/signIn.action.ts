'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { routes } from '../../../shared/constant/routes';

export async function signInAction({ email, password }: { email: string; password: string }) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

  try {
    const { token, record: model } = await pb
      .collection(process.env.NEXT_PUBLIC_PB_USER_COLLECTION ?? '')
      .authWithPassword(email, password);

    const cookie = JSON.stringify({ token, model });

    cookies().set('pb_auth', cookie, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });

    redirect(routes.dashboard);
  } catch (e) {
    console.error(e);
  }
}
