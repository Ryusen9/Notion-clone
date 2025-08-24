"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="">
      {user && (
        <h1>
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
