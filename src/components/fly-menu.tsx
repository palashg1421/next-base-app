"use client";

import React from "react";
import { LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type FlyMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

const FlyMenu = (props: FlyMenuProps) => {
  const { isOpen, onClose, triggerRef } = props;
  const router = useRouter();
  
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  
  const { theme, setTheme } = useTheme();
  
  React.useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (triggerRef?.current?.contains(targetNode)) return;
      if (!menuRef.current) return;
      if (menuRef.current.contains(targetNode)) return;
      onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const doLogout = async () => {
    try {
      const resp = await axios.post("/api/auth/logout");
      if(resp.data.error === 0) {
        toast.success(resp.data.message);
        router.push("/login");
      }
    } catch(error: any) {
      console.log(error);
    }
  }

  return (
    <div
      ref={menuRef}
      className="app-fly-menu absolute top-10 right-0 w-45 rounded-md border border-border bg-primary shadow-lg z-50 p-1"
    >
      <button
        type="button"
        className="fly-nav w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer"
      >
        <User size={16} />
        <span>Profile</span>
      </button>
      <button
        type="button"
        className="fly-nav w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )}
        <span>Theme</span>
      </button>
      <hr className="border border-border my-1" />
      <button
        type="button"
        className="fly-nav w-full flex items-center gap-2 px-3 py-2 rounded-sm text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer"
        onClick={doLogout}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default FlyMenu;
