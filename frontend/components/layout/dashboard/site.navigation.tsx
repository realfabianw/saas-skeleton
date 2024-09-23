import {
  OrganizationList,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeModeToggle } from "../theme-mode-toggle";
import Link from "next/link";

export default function SiteNavigation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex border-b p-2 items-center gap-2">
        <Link href="/">
          <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
            SaaS🩻
          </div>
        </Link>

        <OrganizationSwitcher />

        <div className="grow"></div>

        <ThemeModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex-col">{children}</div>
    </div>
  );
}
