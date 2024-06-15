import {
  OrganizationList,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeCustomizer } from "./theme-customizer.component";

export default function SiteNavigation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex border-b p-2 items-center">
        <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
          SaaS🩻
        </div>
        <OrganizationSwitcher />

        <div className="grow"></div>

        <ThemeCustomizer />
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
