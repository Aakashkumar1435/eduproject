import React from 'react'
import AppLogo from '@/components/UserAuth/Signin/appLogo';
import SignInForm from '@/components/UserAuth/Signin/Form';

function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <AppLogo />
      <label className="bg-green-100 my-4 py-3 px-8 rounded-full text-green-700 text-sm text-center shadow-md">
        Get Ready for Preparation. You have to get good marks
      </label>
      <div>
        <SignInForm className="mt-8 w-full max-w-md" />
      </div>
    </div>
  );
}

export default SignIn;
