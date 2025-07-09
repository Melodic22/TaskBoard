"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link 
        href="/" 
        className="text-2xl font-bold hover:opacity-80 transition-opacity"
      >
        Task Board
      </Link>
      
      <Link href="/developer-settings">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Developer Settings</span>
        </Button>
      </Link>
    </header>
  );
} 