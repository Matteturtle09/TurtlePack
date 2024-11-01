import React from 'react';
import { signIn, providerMap } from '../../../../../auth';
import { Button } from '@/components/ui/button';
import DynamicIcon from '@/components/ui/dynamicIcon';
import { capitalizeFirstLetter } from '@/lib/utils';
import { AuthError } from 'next-auth';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

const SignIn = async () => {
  return (
    <BackgroundBeamsWithCollision className="h-full min-h-screen">
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="rounded-lg bg-slate-50 bg-opacity-10 p-6 backdrop-blur-sm backdrop-filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mb-4 h-16 w-full"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
          </svg>
          <h1 className="mb-6 text-center text-2xl font-bold">Welcome Back</h1>
          <div className="mt-4 space-y-4">
            {Object.values(providerMap)?.map((provider) => (
              <form
                key={provider.id}
                action={async () => {
                  'use server';
                  try {
                    await signIn(provider.id, {
                      redirectTo: process.env.NEXT_PUBLIC_URL,
                    });
                  } catch (error) {
                    if (error instanceof AuthError) {
                    }
                    throw error;
                  }
                }}
              >
                <Button
                  key={provider.id}
                  className="w-full"
                  variant="outline"
                  type="submit"
                >
                  <DynamicIcon
                    name={`Fa${capitalizeFirstLetter(provider.name)}`}
                  />
                  Continue with {provider.name}
                </Button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default SignIn;
