import React from 'react'
import AppLogo from '@/components/UserAuth/SignIn/appLogo';
import ResetPasswordForm from '@/components/UserAuth/Reset-Password/Form';
function ResetPassword() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <AppLogo />
      <label className="bg-green-100 my-4 py-3 px-8 rounded-full text-green-700 text-sm text-center shadow-md">
        Forgot password? Don't worry Just reset it.
      </label>

      <ResetPasswordForm />
    </div>
  )
}

export default ResetPassword;