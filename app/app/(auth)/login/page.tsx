import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
