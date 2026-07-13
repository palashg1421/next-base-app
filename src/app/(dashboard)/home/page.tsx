'use client'

import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/error-fallback";

import { useAuth } from "@/hooks/useAuth";

import { useSocket } from "@/providers/SocketProvider";

/** Import map dynamically to prevents it rendering on the server. */
// import dynamic from "next/dynamic";
// const Map = dynamic(() => import("@/components/map/Map"), {
//   ssr: false,
// });

const Page = () => {

  const socket = useSocket();
  const { loading, user } = useAuth();

  /** Socket handler */
  React.useEffect(() => {
    const handleSocketaResponse = (data: any) => {
      console.log(data);
    }
    socket.on('message', handleSocketaResponse);
    return () => {
      socket.off('message', handleSocketaResponse);
    };
  }, [socket]);


  if (loading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        HOME PAGE...
      </ErrorBoundary>
    </>
  )
}

export default Page
