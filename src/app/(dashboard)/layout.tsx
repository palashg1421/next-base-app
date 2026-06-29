'use client';

import NavBar from "@/components/nav-bar";

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="app-wrapper flex flex-col">
        <NavBar />
        <div className="bg-bg h-[calc(100vh-45px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;  