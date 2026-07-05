'use client'

import React from "react";

import Otp from "@/components/otp";

import {useAuth} from "@/hooks/useAuth";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/error-fallback";

const Page = () => {
  const {loading, user} = useAuth();
  const [otp, setOtp] = React.useState<string>("");

  if(loading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      <section className="p-4">
        <h1 className='mb-2'>OTP Module</h1>
        <div className='mb-2'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Otp
              characters={4}
              setOtp={setOtp}
            />
          </ErrorBoundary>
        </div>
        <p>{otp}</p>
      </section>
    </>
  )
}

export default Page
