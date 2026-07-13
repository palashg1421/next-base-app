"use client";

import { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/services/socketService";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socket = getSocket();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("SocketProvider not found");
  }

  return socket;
};