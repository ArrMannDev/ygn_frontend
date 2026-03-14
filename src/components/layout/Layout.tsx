import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmokeCursor } from "../ui/SmokeCursor";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans cursor-none">
      <SmokeCursor />
      <Navbar />
      <main className="grow pt-20">{children}</main>
      <Footer />
    </div>
  );
};
