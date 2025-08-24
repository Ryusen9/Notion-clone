"use client";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between px-10 py-3">
      {user && (
        <h1 className="text-2xl font-semibold">
          {user.firstName}
          {`'s`} Space
        </h1>
      )} 
      {/* Breadcrumbs */}

      <div>
        <SignedOut>
            <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton></UserButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
