"use client";
import React from "react";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <SignOutButton />
        </>
      ) : (
          <SignInButton />
      )}
    </>
  );
};

export default AuthButton;
