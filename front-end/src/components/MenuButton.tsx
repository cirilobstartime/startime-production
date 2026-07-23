"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-[55px] h-[55px] bg-primary hover:bg-primary/90 border border-secondary/20 rounded-xl flex flex-col items-center justify-center gap-[6px] shadow-xl transition-transform duration-300 hover:scale-105 group active:scale-95"
    >
      <span className="w-6 h-[2px] bg-secondary rounded-full transition-all group-hover:w-7"></span>
      <span className="w-6 h-[2px] bg-secondary rounded-full transition-all group-hover:w-4"></span>
    </Button>
  );
};

export default MenuButton;
