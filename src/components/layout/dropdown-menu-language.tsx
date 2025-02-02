"use client";
import * as React from "react";
import { Earth } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from "@/components/ui";
import { FlagUa, FlagGb, FlagPl } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DropdownMenuLanguageProps {
  className?: string;
}

type Language = "Ukraine" | "Poland" | "England" | "Language";

export const DropdownMenuLanguage = ({
  className,
}: DropdownMenuLanguageProps): React.ReactElement => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("Language");
   const { i18n } = useTranslation();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className={cn(
              "flex items-center justify-center w-7 h-7 px-7 py-5 transition-all duration-300 ease-in-out",
              "data-[state=open]:scale-110 data-[state=open]:w-8  data-[state=open]:h-8 "
            )}
          >
            <Earth className="stroke-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[176px] mr-4">
          <DropdownMenuCheckboxItem
            checked={selectedLanguage === "Ukraine"}
            onCheckedChange={() => {
              setSelectedLanguage("Ukraine");
              i18n.changeLanguage("uk");
            }}
            className="flex gap-2"
          >
            <FlagUa />
            Ukraine
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedLanguage === "Poland"}
            onCheckedChange={() => {
              setSelectedLanguage("Poland");
              i18n.changeLanguage("pl");
            }}
            className="flex gap-2"
          >
            <FlagPl />
            Poland
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedLanguage === "England"}
            onCheckedChange={() => {
              setSelectedLanguage("England");
              i18n.changeLanguage("en");
            }}
            className="flex gap-2"
          >
            <FlagGb />
            England
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
