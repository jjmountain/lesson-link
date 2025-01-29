import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return <SignIn forceRedirectUrl={`${process.env.NEXT_PUBLIC_APP_URL}`} />;
}
