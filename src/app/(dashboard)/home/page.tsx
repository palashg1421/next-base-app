'use client'

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Otp from "@/components/otp";

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
          <Otp
            characters={4}
            setOtp={setOtp}
          />
        </div>
        <p>{otp}</p>
      </section>
    </>
  )
}

export default Page
