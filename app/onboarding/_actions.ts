'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import db from '@/lib/db';
import { users } from '@/lib/schema';
import { createSite } from '@/lib/actions';
import { eq } from 'drizzle-orm';

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: 'No Logged In User' };
  }

  const client = await clerkClient();

  let slug = '';

  try {
    const rawSlug = formData.get('slug') as string;

    // Check for invalid characters before sanitizing
    if (/[^a-zA-Z0-9-]/.test(rawSlug)) {
      return {
        error: 'Subdomain can only contain letters, numbers, and hyphens.',
      };
    }

    slug = rawSlug
      .toLowerCase()
      .replace(/-+/g, '-') // replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // remove leading/trailing hyphens

    const user = await db.select().from(users).where(eq(users.slug, slug));

    if (user.length > 0) {
      return { error: 'That subdomain is already taken.' };
    }
  } catch (err) {
    return { error: 'An error occurred, please try again later.' };
  }

  try {
    const site = await createSite({
      name: formData.get('applicationName') as string,
      description: (formData.get('description') as string) ?? undefined,
      subdomain: slug,
      userId: userId,
    });

    // check for error key otherwise proceed
    if ('error' in site) {
      return { error: site.error };
    }

    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' };
  }
};
