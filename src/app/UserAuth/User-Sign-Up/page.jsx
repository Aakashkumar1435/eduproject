// DONE
import React from 'react'
import AppLogo from '@/components/UserAuth/Signin/appLogo';
import SignUpForm from '@/components/UserAuth/SignUp/Form';

function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <AppLogo />
      <label className="bg-green-100 my-4 py-3 px-8 rounded-full text-green-700 text-sm text-center shadow-md">
        Get Ready for Preparation. You have to get good marks
      </label>

      <div className='mb-6'>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp;