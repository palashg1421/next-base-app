'use client'

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";

import ErrorFallback from "@/components/error-fallback";
import Otp from "@/components/otp";

import {useAuth} from "@/hooks/useAuth";

/** Import map dynamically to prevents it rendering on the server. */
const Map = dynamic( () => import("@/components/map/Map"), {
    ssr: false,
  }
);

const Page = () => {
  const {loading, user} = useAuth();
  const [otp, setOtp] = React.useState<string>("");
  const [markers, setMarkers] = React.useState([
    {id: 1, name: 'Leanne Graham', lat: -37.3159, lng: 81.1496, data: []},
    {id: 2, name: 'Ervin Howell', lat: -43.9509, lng: -34.4618, data: []},
    {id: 3, name: 'Leanne Graham', lat: -68.6102, lng: -47.0653, data: []},
  ]);

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

      <section className="p-4">
        <h1 className='mb-2'>Map Module</h1>
        <div className='w-full h-125'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Map markers={markers} />
          </ErrorBoundary>
        </div>
      </section>
    </>
  )
}

export default Page
