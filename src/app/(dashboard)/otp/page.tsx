'use client';

import React from "react";

import Otp from "@/components/otp";

const Page = () => {
  const [otp, setOtp] = React.useState('');

  return (
    <>
      <div className="page otp-page p-2">
        <Otp characters={4} setOtp={setOtp} doAutoFocus={true} />
        {otp}
      </div>
    </>
  )
}

export default Page;
