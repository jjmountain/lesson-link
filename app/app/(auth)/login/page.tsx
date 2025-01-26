import Image from "next/image";
// import LoginButton from "./login-button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Suspense } from "react";
import { ReactNode } from "react";


export default function LoginPage({ children }: { children: ReactNode }) {
  return (
    <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}

</>
  );
}
