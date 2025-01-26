import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from '@clerk/nextjs'

export default async function Profile() {
  const user = await getUser();
  if (!user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        {/* <Image
          src={
            user.imageUrl ??
            `https://avatar.vercel.sh/${user.emailAddresses[0].emailAddress}`
          }
          width={40}
          height={40}
          alt={user.firstName ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        /> */}
        <span className="truncate text-sm font-medium">
          {user.firstName}
        </span>
      </Link>
      <SignOutButton />
    </div>
  );
}
