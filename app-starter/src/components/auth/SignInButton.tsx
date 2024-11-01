'use client';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const SignInButton = () => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_URL}api/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_URL}`}
    >
      <Button>Sign In</Button>
    </Link>
  );
};

export default SignInButton;
