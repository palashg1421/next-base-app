'use client'

import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";

import ErrorFallback from "@/components/error-fallback";

import { useAuth } from "@/hooks/useAuth";

/** Import map dynamically to prevents it rendering on the server. */
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
}
);

const Page = () => {
  const { loading, user } = useAuth();

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
