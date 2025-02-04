"use client";
import React from "react";
import {
  Separator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "../ui";
import { CalendarGeneralIcon } from "./calendar-general-icon";
import { DropdownMenuLanguage } from "./dropdown-menu-language";
import Link from "next/link";
import {
  Dumbbell,
  Flower,
  NotebookPen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const items = [
  {
    title: "To do list",
    url: "/to-do-list",
    icon: NotebookPen,
  },
  {
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Periods",
    url: "/periods",
    icon: Flower,
  },
];

export const HeaderNavigation: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="flex items-center gap-2 px-4 justify-between w-full">
      <div className="flex items-center gap-2">
        <CalendarGeneralIcon />
        <Separator orientation="vertical" className=" h-4" />
      </div>
      <div>
        <SidebarContent className="flex flex-row items-center space-x-4 p-2 overflow-x-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-row">
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex flex-col items-center"
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "cursor-pointe transition-all duration-300 ease-in-out",
                        pathName.startsWith(item.url) &&
                          "outline outline-1 outline-white px-4 py-5 transition-all scale-110 duration-300 ease-in-out"
                      )}
                    >
                      <Link
                        href={item.url}
                        className="focus-visible:ring-2 focus-visible:outline-none flex items-center"
                      >
                        <item.icon />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
      <div className="flex items-center gap-2">
        <Separator orientation="vertical" className=" h-4" />
        <DropdownMenuLanguage className="flex" />
      </div>
    </div>
  );
};
