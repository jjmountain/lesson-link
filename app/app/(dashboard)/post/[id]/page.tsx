import { getUser } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import Editor from '@/components/editor';
import db from '@/lib/db';

export default async function PostPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const data = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, decodeURIComponent(params.id)),
    with: {
      site: {
        columns: {
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== user.id) {
    notFound();
  }

  return <Editor post={data} />;
}
