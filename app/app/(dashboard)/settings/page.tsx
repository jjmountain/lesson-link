import { ReactNode } from 'react';
import Form from '@/components/form';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { editUser } from '@/lib/actions';

export default async function SettingsPage() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">Settings</h1>
        <Form
          title="Name"
          description="Your name on this app."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: 'name',
            type: 'text',
            defaultValue: `${user.firstName!} ${user.lastName!}`,
            placeholder: 'Brendon Urie',
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: 'email',
            type: 'email',
            defaultValue: user.emailAddresses[0].emailAddress!,
            placeholder: 'panic@thedis.co',
          }}
          handleSubmit={editUser}
        />
      </div>
    </div>
  );
}
