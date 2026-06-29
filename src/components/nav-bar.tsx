"use client";

import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import FlyMenu from "./fly-menu";

const navLinks = [
  { label: "Home", href: "/home" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const settingsRef = React.useRef<HTMLLIElement | null>(null);

  return (
    <nav className="app-nav w-full h-11.25 flex items-center justify-between border-b border-border p-2 bg-primary sticky top-0 z-10">
      <span className="font-semibold text-lg">
        NEXT
      </span>

      <ul className="flex items-center gap-6">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                color: pathname === href ? "var(--app-secondary)" : "var(--app-text)",
                borderBottom: pathname === href ? "2px solid var(--app-secondary)" : "2px solid transparent",
              }}
              className="text-sm font-medium pb-1 transition-colors hover:opacity-80"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <li
          ref={settingsRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="cursor-pointer relative"
        >
          <Settings
            style={{
              transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          <FlyMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            triggerRef={settingsRef}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
