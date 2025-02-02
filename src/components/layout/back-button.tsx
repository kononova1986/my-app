"use client";
import React from "react";
import { SquareArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui";

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button
      variant="link"
      tooltip="Back"
      className="flex items-left justify-center w-7 h-7 p-1 hover:bg-primary"
      onClick={handleBackClick}
    >
      <SquareArrowLeft color="white" />
    </Button>
  );
};
